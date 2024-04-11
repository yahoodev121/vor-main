import { Configuration, OpenAIApi } from 'openai';
import { i18n } from '../i18n';
import { IServiceOptions } from './IServiceOptions';
import Error400 from '../errors/Error400';
import FileRepository from '../database/repositories/fileRepository';
import FileStorage from './file/fileStorage';
import fs from 'fs';
import XLSX from 'xlsx';
import VorAISettingRepository from '../database/repositories/vorAISettingRepository';
import { encoding_for_model } from 'tiktoken';
import QALibraryRepository from '../database/repositories/qaLibraryRepository';
import { max } from 'lodash';
import mammoth from 'mammoth'; // Import mammoth library

const delimiter = '\n\n###\n\n';

export default class VORAIService {
  options: IServiceOptions;

  constructor(options) {
    this.options = options;
  }

  private processError(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(
        error.response.status,
        error.response.data,
      );
      throw new Error400(
        this.options.language,
        'errors.custom',
        error.response.data.error.message,
      );
    } else {
      console.error(error.message);
      throw new Error400(
        this.options.language,
        'errors.custom',
        error.message,
      );
    }
  }

  static async getOpenAI(apiKey) {
    const configuration = new Configuration({
      apiKey,
    });
    return new OpenAIApi(configuration);
  }

  _limitTokens(prompt, limit = 2048) {
    return (
      prompt?.trim().split(/[ ]+/).filter(Boolean).length >=
      limit
    );
  }

  _convertTrainingDataSet4ChatGPT(rows) {
    let posStart = 0;
    let posEnd = 2;

    const result: string[][] = [];

    do {
      const subRows = rows.slice(posStart, posEnd);

      const prompt = subRows
        .map(([question, answer], idx, arr) =>
          [
            question?.trim(),
            idx + 1 < arr.length && answer?.trim(),
          ]
            .filter(Boolean)
            .join(delimiter),
        )
        .join(delimiter);

      const completion = subRows.pop()?.pop();

      if (this._limitTokens(prompt)) {
        posStart++;
        continue;
      }

      result.push([prompt, completion]);

      posEnd++;
    } while (posEnd < rows.length);

    return result;
  }

  async _convertExcelFileToWorkbook(url) {
    return XLSX.read(fs.readFileSync(url), {
      type: 'array',
      cellDates: true,
    });
  }

  async _convertExcelFileToQuestionAnswersArr(url) {
    return XLSX.utils.sheet_to_json(fs.readFileSync(url));
  }

  async _convertFileToJSONL(upload) {
    const localURL =
      FileStorage.internalUrl &&
      FileStorage.internalUrl(upload.privateUrl);
    const excelFileExtRE = /\.xlsx?$/i;
    if (excelFileExtRE.test(upload.name)) {
      const workbook =
        await this._convertExcelFileToWorkbook(localURL);

      const rows: string[][] = XLSX.utils.sheet_to_json(
        workbook.Sheets[workbook.SheetNames[0]],
        {
          header: 1,
          blankrows: false,
          range: 1,
        },
      );

      const convertedFileURL = localURL.replace(
        excelFileExtRE,
        '.jsonl',
      );

      if (fs.existsSync(convertedFileURL)) {
        fs.unlinkSync(convertedFileURL);
      }

      fs.writeFileSync(
        convertedFileURL,
        rows
          .map(([question, answer]) =>
            JSON.stringify({
              prompt: `${question?.trim()}${delimiter}`,
              completion: ` ${answer?.trim()}`,
            }),
          )
          .join('\n'),
      );

      return convertedFileURL;
    }
    return localURL;
  }

  async _convertFileToString(upload) {
    const localURL =
      FileStorage.internalUrl &&
      FileStorage.internalUrl(upload.privateUrl);
    const excelFileExtRE = /\.xlsx?$/i;
    if (excelFileExtRE.test(upload.name)) {
      const workbook =
        await this._convertExcelFileToWorkbook(localURL);

      const rows: string[][] = XLSX.utils.sheet_to_json(
        workbook.Sheets[workbook.SheetNames[0]],
        {
          header: 1,
          blankrows: false,
          range: 1,
        },
      );

      return rows
        .map(
          ([question, answer]) =>
            `${question}${delimiter}${answer}`,
        )
        .join(delimiter);
    }
    return '';
  }

  async _getUploads(attachments) {
    const fileIds = await FileRepository.filterIdsInTenant(
      attachments,
      this.options,
    );

    return await FileRepository.findByIds(
      fileIds,
      this.options,
      true,
    );
  }

  async _makePrompt(attachments, prompt) {
    const uploads = await this._getUploads(attachments);
    const prompts = await Promise.all(
      (uploads || []).map(
        this._convertFileToString.bind(this),
      ),
    );
    prompts.push(
      `Using the above data answer the following questions. Answer them in the following format
      
      Question -  {{the question that is being answered}}
      Answer -    {{the answer of the question}}
      `,
    );
    prompts.push(prompt);
    prompts.push('');
    return prompts.join(delimiter);
  }

  async files({ apiKey, files }) {
    const openAI = await VORAIService.getOpenAI(apiKey);
    try {
      const result: string[] = [];

      const uploads = await this._getUploads(files);

      const fnUpload = async (localURL) => {
        const stream = fs.createReadStream(localURL);
        const response: any = await openAI.createFile(
          stream as any,
          'fine-tune',
        );
        return response?.data?.id;
      };

      if (uploads && uploads.length) {
        for (const upload of uploads) {
          const localURL = await this._convertFileToJSONL(
            upload,
          );
          if (!localURL) {
            continue;
          }
          result.push(await fnUpload(localURL));
        }
      }

      return result;
    } catch (error) {
      this.processError(error);
    }
  }

  async fineTunes({ apiKey, trainingFiles, model }) {
    const openAI = await VORAIService.getOpenAI(apiKey);
    try {
      const fineTunes: string[] = [];

      for (const training_file of trainingFiles) {
        const response: any = await openAI.createFineTune({
          training_file,
          model,
        });

        fineTunes.push(response?.data?.id);
      }

      return fineTunes;
    } catch (error) {
      this.processError(error);
    }
  }

  async status({ apiKey }) {
    const openAI = await VORAIService.getOpenAI(apiKey);
    try {
      const response: any = await openAI.listFineTunes();

      const pendingFTs =
        response?.data?.data?.filter(
          ({ status: ftStatus }) => ftStatus === 'pending',
        ) || [];

      return pendingFTs.length
        ? i18n(
            this.options.language,
            'entities.vorAI.messages.fineTuneStatus.remain',
            pendingFTs.length,
          )
        : i18n(
            this.options.language,
            'entities.vorAI.messages.fineTuneStatus.complete',
          );
    } catch (error) {
      this.processError(error);
    }
  }

  async deleteAllFiles(apiKey) {
    const openAI = await VORAIService.getOpenAI(apiKey);
    try {
      const response: any = await openAI.listFiles();

      const files = response?.data?.data || [];

      for (const file of files) {
        await openAI.deleteFile(file.id);
      }
    } catch (error) {
      this.processError(error);
    }
  }

  async deleteAllFileTuneModels(apiKey) {
    const openAI = await VORAIService.getOpenAI(apiKey);
    try {
      const response: any = await openAI.listModels();

      const fineTunedModels =
        response?.data?.data?.filter(
          ({ parent }) => !!parent,
        ) || [];

      for (const model of fineTunedModels) {
        await openAI.deleteModel(model.id);
      }
    } catch (error) {
      this.processError(error);
    }
  }

  async lastFineTuneModel({ apiKey, model }) {
    const openAI = await VORAIService.getOpenAI(apiKey);
    try {
      const response: any = await openAI.listModels();

      const baseModels = {
        'text-davinci-003': 'davinci',
        'text-curie-001': 'curie',
        'text-babbage-001': 'babbage',
        'text-ada-001': 'ada',
      };

      const parentRE = new RegExp(
        `^${baseModels[model]}:`,
        'i',
      );

      const succeedFTs =
        response?.data?.data?.filter(({ parent }) =>
          parentRE.test(parent),
        ) || [];

      if (succeedFTs.length === 0) {
        return model;
      }

      succeedFTs.sort((a, b) =>
        a.created > b.created ? 1 : -1,
      );

      return succeedFTs.pop().id ?? model;
    } catch (error) {
      this.processError(error);
    }
  }

  async createQaPrompt(prompt, formattedQuestionAnswers) {
    try {
      let prompts: string[] = [];
      prompts.push(formattedQuestionAnswers);
      prompts.push(
        `Using the above data answer the following questions. Answer them in the following format
      
      Question -  {{the question that is being answered}}
      Answer -    {{the answer of the question}}
      `,
      );
      prompts.push(prompt);
      prompts.push('');
      return prompts.join(delimiter);
    } catch (error) {
      this.processError(error);
    }
  }

  async completions({
    apiBearerToken: apiKey,
    engine: model,
    frequencyPenalty: frequency_penalty,
    maxTokens: max_tokens,
    presencePenalty: presence_penalty,
    prompt: promptText,
    stopSequence,
    temperature,
    topP: top_p,
  }) {
    const openAI = await VORAIService.getOpenAI(apiKey);

    const trainingQuestions =
      (await QALibraryRepository.findAndCountAll(
        { filter: {aiKnowledgebase: true} },
        this.options,
      )).rows || [];

    const doUseFineTune =
      !trainingQuestions || !trainingQuestions.length;
    try {
      let formattedQuestionAnswers = '';

      // Iterate through the array and build the formatted string
      trainingQuestions.forEach((qa, index: number) => {
        formattedQuestionAnswers += `Question ${
          index + 1
        }:\n${qa.question}\nAnswer ${index + 1}:\n${
          qa.answer
        }\n\n`;
      });

      const prompt = doUseFineTune
        ? `${promptText?.trim()}${delimiter}`
        : await this.createQaPrompt(
            promptText,
            formattedQuestionAnswers,
          );

      const res: any = await openAI.createChatCompletion({
        frequency_penalty,
        max_tokens: 4000,
        model,
        presence_penalty,
        // @ts-ignore
        messages: [
          {
            role: 'system',
            content:
              prompt != null
                ? prompt
                : 'You are a helpful assistant.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        stop: stopSequence?.split(/[ ]*,[ ]*/) || [
          delimiter,
        ],
        temperature: 0,
        top_p,
      });

      return res?.data?.choices[0]?.message.content;
    } catch (error) {
      this.processError(error);
    }
  }

  async submitExtractions({
    apiBearerToken: apiKey,
    attachments,
    engine: model,
    frequencyPenalty: frequency_penalty,
    maxTokens: max_tokens,
    presencePenalty: presence_penalty,
    prompt,
    promptFileText,
    stopSequence,
    topP: top_p,
  }) {
    const openAI = await VORAIService.getOpenAI(apiKey);

    const prompts = [
      'In the text below, extract all the questions and list them in a array. Donot provide any additional information.',
      promptFileText,
    ];

    const enc = encoding_for_model('gpt-4');

    let messages = [
      {
        role: 'system',
        content:
          prompt != null
            ? prompt
            : 'You are a helpful assistant.',
      },
      {
        role: 'user',
        content: `${prompts.join(' ')}`,
      },
    ];

    const token_count =
      enc.encode_ordinary(promptFileText).length;

    let response = '';

    try {
      // If token count is greater than max count, split the promptFile text into questions, then send multiple requests to the backend.
      if (token_count > max_tokens) {
        let questions = promptFileText.split(/\n+/);

        function listToMatrix(
          list: any[],
          columns: number,
        ) {
          var matrix = [];
          for (var i = 0; i < list.length; i += columns) {
            // @ts-ignore
            matrix.push(list.slice(i, i + columns));
          }
          return matrix;
        }

        let divisions = token_count / max_tokens;

        // ex - if there are 500 tokens in the questions and max token limit is 100, then with this the api will be called 5-6 times depending on what the value is. All the questions will still be parsed.
        let no_of_api_calls = questions.length / divisions;

        console.log(no_of_api_calls, 'no_of_api_calls');
        console.log(token_count, 'token count');
        console.log(max_tokens, 'max tokens');

        questions = listToMatrix(
          questions,
          no_of_api_calls,
        );

        for (let i = 0; i < questions.length; i++) {
          let payload = [
            'In the text below, extract all the questions and list them in a array. Donot provide any additional information.',
            ...questions[i],
          ];

          console.log(payload);

          let res: any = await openAI.createChatCompletion({
            frequency_penalty,
            max_tokens: 4000,

            model: 'gpt-4',
            presence_penalty,
            // @ts-ignore
            messages: [
              {
                role: 'system',
                content:
                  prompt != null
                    ? prompt
                    : 'You are a helpful assistant.',
              },
              {
                role: 'user',
                content: `${payload.join(' ')}`,
              },
            ],
            stop: stopSequence?.split(/[ ]*,[ ]*/) || [
              delimiter,
            ],
            temperature: 0,
            top_p,
          });

          response =
            response +
            res?.data?.choices[0]?.message.content;
        }
      }

      const res: any = await openAI.createChatCompletion({
        frequency_penalty,
        max_tokens: 4000,

        model: 'gpt-4',
        presence_penalty,
        // @ts-ignore
        messages,
        stop: stopSequence?.split(/[ ]*,[ ]*/) || [
          delimiter,
        ],
        temperature: 0,
        top_p,
      });

      response = res?.data?.choices[0]?.message.content;

      return response;
    } catch (error) {
      // console.log(error);
      this.processError(error);
    }
  }

  async completionsOnConfigurator({ question }) {
    const settings = await VorAISettingRepository.find(
      this.options,
    );

    if (!settings) {
      throw new Error400(
        this.options.language,
        'errors.custom',
      );
    }

    const {
      apiBearerToken: apiKey,
      engine: model,
      frequencyPenalty: frequency_penalty,
      maxTokens: max_tokens,
      presencePenalty: presence_penalty,
      prompt,
      stopSequence,
      temperature,
      topP: top_p,
      attachments,
    } = settings;

    const openAI = await VORAIService.getOpenAI(apiKey);
    const doUseFineTune =
      !attachments || !attachments.length;
    try {
      // await this.deleteAllFileTuneModels(apiKey);
      // await this.deleteAllFiles(apiKey);
      const response: any = await openAI.createCompletion({
        frequency_penalty,
        max_tokens,
        model: doUseFineTune
          ? await this.lastFineTuneModel({
              apiKey,
              model,
            })
          : model,
        presence_penalty,
        prompt: doUseFineTune
          ? `${prompt?.trim()}${delimiter}${question}`
          : await this._makePrompt(
              attachments,
              `${prompt?.trim()}${delimiter}${question}`,
            ),
        stop: stopSequence?.split(/[ ]*,[ ]*/) || [
          delimiter,
        ],
        temperature,
        top_p,
      });

      return response?.data?.choices[0]?.text?.trim();
    } catch (error) {
      this.processError(error);
    }
  }
}
