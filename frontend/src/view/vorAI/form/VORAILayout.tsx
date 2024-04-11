import {
  Box,
  Grid,
  Typography,
} from '@mui/material';
import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useFormContext } from 'react-hook-form';
import { useState } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import GradientTitle from 'src/view/shared/components/GradientTitle';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import MDBox from 'src/mui/components/MDBox';
import MDButton from 'src/mui/components/MDButton';
import PropTypes from 'prop-types';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import SelectFormItem from 'src/view/shared/form/items/SelectFormItem';
import SliderFormItem from 'src/view/shared/form/items/SliderFormItem';
import TextAreaFormItem from 'src/view/shared/form/items/TextAreaFormItem';
import TextViewItem from 'src/view/shared/view/TextViewItem';
import vorAIEnumerators from 'src/modules/vorAI/vorAIEnumerators';
import VORAIService from 'src/modules/vorAI/vorAIService';
import FilesFormItem from 'src/view/shared/form/items/FilesFormItem';
import Storage from 'src/security/storage';
import ConfirmModal from 'src/view/shared/modals/ConfirmModal';
import QALibraryService from 'src/modules/qaLibrary/qaLibraryService';

export type QuestionAnswer = {
  id: number;
  question: String;
  answer: String;
};

const VORAILayout = ({
  onDownloadExcelTemplate,
  onStatus,
  onSubmit,
  onUploadAndTrain,
  onSubmitExtraction,
  record,
  responseFromAPIService,
  submitLoading,
}) => {
  const { sidenavColor } = selectMuiSettings();
  const [promptFileText, setPromptFileText] = useState('');
  const [promptFileName, setPromptFileName] = useState('');
  const [confirmAction, setConfirmAction] = useState(false);

  const { register, setValue, getValues } =
    useFormContext();

  function countLinesAndWords(inputString: string): {
    lines: number;
    words: number;
  } {
    // Split the input string into lines
    const lines = inputString.split('\n');

    // Count the number of lines
    const lineCount = lines.length;

    // Split each line into words and count the total number of words
    const wordCount = lines.reduce((totalWords, line) => {
      const wordsInLine = line
        .split(/\s+/)
        .filter((word) => word.length > 0); // Split by spaces and remove empty words
      return totalWords + wordsInLine.length;
    }, 0);

    return { lines: lineCount, words: wordCount };
  }

  const { lines, words } =
    countLinesAndWords(promptFileText);

  const generateDocument = async () => {
    try {
      const res = await VORAIService.generateAnswers(promptFileName, responseFromAPIService);

      // Create a temporary URL for the blob
      const url = window.URL.createObjectURL(
        new Blob([res]),
      );

      // Create a link element to trigger the download
      const a = document.createElement('a');
      a.href = url;
      a.download = `${promptFileName}`;

      // Trigger the click event on the link
      a.click();

      // Release the object URL to free up resources
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
    }
  };

  const uploadFileAndGetText = async (files) => {
    if (files && files.length > 0) {
      const res = await VORAIService.getTextFromWord(files[0].privateUrl);
      setPromptFileText(res);
      register('promptFileText');
      setValue('promptFileText', res);
      setPromptFileName(files[0].name);
    } else {
      setPromptFileText('');
      setValue('promptFileText', '');
      setPromptFileName('');
    }
  };

  const doAnswerQuestions = async () => {
    const response = await QALibraryService.list(
      { aiKnowledgebase: true },
      null,
      null,
      null,
    );
    if (response.count === 0) {
      setConfirmAction(true);
    } else {
      onSubmit();
    }
  }

  return (
    <MDBox px={0.8}>
      <Grid spacing={1.6} container>
        <Grid xs={12} item>
          <GradientTitle>
            {i18n('entities.vorAI.title')}
          </GradientTitle>
        </Grid>
        <Grid xs={12} md={6} item>
          <FilesFormItem
            name="files"
            onChange={(files) => uploadFileAndGetText(files)}
            storage={Storage.values.prompt}
            max={1}
            columns={1}
            noTag={true}
          />
          <Grid xs={0} md={6} item />
        </Grid>
        <Grid xs={12} item>
          <Grid
            flexDirection="row-reverse"
            alignItems="stretch"
            spacing={1.6}
            container
          >
            <Grid lg={3} xs={12} item>
              <Grid spacing={1.6} container>
                <Grid xs={12} item>
                  <InputFormItem
                    label={i18n(
                      'entities.vorAI.fields.apiBearerToken',
                    )}
                    name="apiBearerToken"
                    required={true}
                    variant="standard"
                  />
                </Grid>
                <Grid xs={12} item>
                  <SelectFormItem
                    label={i18n(
                      'entities.vorAI.fields.engine',
                    )}
                    name="engine"
                    options={vorAIEnumerators.models.map(
                      (value) => ({
                        value,
                        label: i18n(
                          `entities.vorAI.enumerators.models.${value}`,
                        ),
                      }),
                    )}
                    required={true}
                    variant="standard"
                  />
                </Grid>
                <Grid xs={12} item>
                  <SliderFormItem
                    label={i18n(
                      'entities.vorAI.fields.temperature',
                    )}
                    name="temperature"
                    max={1}
                    min={0}
                    step={0.1}
                  />
                  <SliderFormItem
                    label={i18n(
                      'entities.vorAI.fields.maxTokens',
                    )}
                    name="maxTokens"
                    max={8191}
                    min={1}
                  />
                  <InputFormItem
                    label={i18n(
                      'entities.vorAI.fields.stopSequence',
                    )}
                    name="stopSequence"
                    variant="standard"
                  />
                </Grid>
                <Grid xs={12} item>
                  <SliderFormItem
                    label={i18n(
                      'entities.vorAI.fields.topP',
                    )}
                    name="topP"
                    max={1}
                    min={0}
                    step={0.1}
                  />
                  <SliderFormItem
                    label={i18n(
                      'entities.vorAI.fields.frequencyPenalty',
                    )}
                    name="frequencyPenalty"
                    max={+2.0}
                    min={0}
                    step={0.1}
                  />
                  <SliderFormItem
                    label={i18n(
                      'entities.vorAI.fields.presencePenalty',
                    )}
                    name="presencePenalty"
                    max={+2.0}
                    min={0}
                    step={0.1}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid lg={9} xs={12} item>
              <TextAreaFormItem
                autoFocus={true}
                label={i18n('entities.vorAI.fields.prompt')}
                name="prompt"
                rows={8}
                variant="standard"
              />
              {promptFileText && (
                <>
                  <Grid xs={12} lg={12}>
                    <Typography
                      variant="h4"
                      fontWeight="bold"
                    >
                      Plain Text
                    </Typography>
                    <Box
                      sx={{
                        height: '400px',
                        overflow: 'auto',
                        border: '1px solid gray',
                        padding: '1rem',
                      }}
                    >
                      {promptFileText}
                    </Box>
                    <Box
                      sx={{ display: 'flex', gap: '1rem' }}
                    >
                      <Box>Lines - {lines}</Box>
                      <Box>Words - {words}</Box>
                    </Box>
                  </Grid>
                </>
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid xs={12} item>
          <MDBox display="flex" gap={0.8}>
            {promptFileText !== '' && (
              <MDButton
                color={sidenavColor}
                disabled={submitLoading}
                onClick={onSubmitExtraction}
                variant="outlined"
                startIcon={<CloudUploadIcon />}
              >
                {i18n(
                  'entities.vorAI.buttons.submitExtraction',
                )}
              </MDButton>
            )}
            <MDButton
              color={sidenavColor}
              disabled={submitLoading}
              onClick={() => doAnswerQuestions()}
              variant="gradient"
              startIcon={<QuestionAnswerIcon />}
            >
              {i18n('entities.vorAI.buttons.answerQuestions')}
            </MDButton>
            {responseFromAPIService !== '' && (
              <MDButton
                color={sidenavColor}
                disabled={submitLoading}
                onClick={generateDocument}
                variant="outlined"
                startIcon={<CloudUploadIcon />}
              >
                {i18n(
                  'entities.vorAI.buttons.generateDocument',
                )}
              </MDButton>
            )}
          </MDBox>
        </Grid>
        <Grid xs={12} item>
          <TextViewItem
            label={i18n(
              'entities.vorAI.fields.responseFromAPIService',
            )}
            value={responseFromAPIService}
            multiline={true}
          />
        </Grid>
      </Grid>
      {confirmAction && (
        <ConfirmModal
          title={i18n('common.doYouContinue')}
          content={i18n('entities.vorAI.modal.noQALibrary')}
          okText={i18n('common.continue')}
          cancelText={i18n('common.cancel')}
          onConfirm={() => {
            setConfirmAction(false);
            onSubmit();
          }}
          onClose={() => setConfirmAction(false)}
        />
      )}
    </MDBox>
  );
};

VORAILayout.defaultProps = {
  record: null,
};

VORAILayout.propTypes = {
  onDownloadExcelTemplate: PropTypes.func,
  onStatus: PropTypes.func,
  onSubmit: PropTypes.func,
  onUploadAndTrain: PropTypes.func,
  onSubmitExtraction: PropTypes.func,
  record: PropTypes.any,
  responseFromAPIService: PropTypes.string,
  submitLoading: PropTypes.bool,
};

export default VORAILayout;
