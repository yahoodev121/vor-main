import Error400 from '../errors/Error400';
import MongooseRepository from '../database/repositories/mongooseRepository';
import { IServiceOptions } from './IServiceOptions';
import QuestionnaireTemplateRepository from '../database/repositories/questionnaireTemplateRepository';

export default class QuestionnaireTemplateService {
  options: IServiceOptions;

  constructor(options) {
    this.options = options;
  }

  static async resetQuestionnaireAnswers(entity) {
    if (!entity) {
      return;
    }
    if (!entity.sections) {
      entity.sections = [];
    }
    if (!entity.questions) {
      entity.questions = {};
    }
    for (const section of entity.sections) {
      delete section.answers;
      delete section.answer;
      delete section.additionalInformation;
      delete section.attachments;
      await this.resetQuestionnaireAnswers(
        entity.questions && entity.questions[section.key],
      );
    }
  }

  static async assignRelatedData(data, session) {
    if (
      data.questionnaire &&
      typeof data.questionnaire === 'string'
    ) {
      data.questionnaire = JSON.parse(data.questionnaire);
    }
    data.totalQuestions =
      data.questionnaire?.sections?.reduce(
        (totalQuestions, section) =>
          totalQuestions + section.questions,
        0,
      ) || 0;
    await QuestionnaireTemplateService.resetQuestionnaireAnswers(
      data.questionnaire,
    );
  }

  async create(data) {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    try {
      await QuestionnaireTemplateService.assignRelatedData(
        data,
        session,
      );

      const record =
        await QuestionnaireTemplateRepository.create(data, {
          ...this.options,
          session,
        });

      await MongooseRepository.commitTransaction(session);

      return record;
    } catch (error) {
      await MongooseRepository.abortTransaction(session);

      MongooseRepository.handleUniqueFieldError(
        error,
        this.options.language,
        'questionnaireTemplate',
      );

      throw error;
    }
  }

  async update(id, data) {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    try {
      await QuestionnaireTemplateService.assignRelatedData(
        data,
        session,
      );

      const record =
        await QuestionnaireTemplateRepository.update(
          id,
          data,
          {
            ...this.options,
            session,
          },
        );

      await MongooseRepository.commitTransaction(session);

      return record;
    } catch (error) {
      await MongooseRepository.abortTransaction(session);

      MongooseRepository.handleUniqueFieldError(
        error,
        this.options.language,
        'questionnaireTemplate',
      );

      throw error;
    }
  }

  async destroyAll(ids) {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    try {
      for (const id of ids) {
        await QuestionnaireTemplateRepository.destroy(id, {
          ...this.options,
          session,
        });
      }

      await MongooseRepository.commitTransaction(session);
    } catch (error) {
      await MongooseRepository.abortTransaction(session);
      throw error;
    }
  }

  async findById(id) {
    return QuestionnaireTemplateRepository.findById(
      id,
      this.options,
    );
  }

  async findAllAutocomplete(search, limit) {
    return QuestionnaireTemplateRepository.findAllAutocomplete(
      search,
      limit,
      this.options,
    );
  }

  async findAndCountAll(args) {
    return QuestionnaireTemplateRepository.findAndCountAll(
      args,
      this.options,
    );
  }

  async import(data, importHash) {
    if (!importHash) {
      throw new Error400(
        this.options.language,
        'importer.errors.importHashRequired',
      );
    }

    if (await this._isImportHashExistent(importHash)) {
      throw new Error400(
        this.options.language,
        'importer.errors.importHashExistent',
      );
    }

    const dataToCreate = {
      ...data,
      importHash,
    };

    return this.create(dataToCreate);
  }

  async _isImportHashExistent(importHash) {
    const count =
      await QuestionnaireTemplateRepository.count(
        {
          importHash,
        },
        this.options,
      );

    return count > 0;
  }
}
