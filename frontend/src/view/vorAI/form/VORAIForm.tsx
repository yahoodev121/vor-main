import { Card } from '@mui/material';
import { i18n } from 'src/i18n';
import { useDispatch } from 'react-redux';
import { useForm, FormProvider } from 'react-hook-form';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import formActions from 'src/modules/form/formActions';
import FormWrapper from 'src/view/shared/styles/FormWrapper';
import MDBox from 'src/mui/components/MDBox';
import PropTypes from 'prop-types';
import VORAILayout from 'src/view/vorAI/form/VORAILayout';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';

const schema = yup.object().shape({
  apiBearerToken: yupFormSchemas.string(
    i18n('entities.vorAI.fields.apiBearerToken'),
    {
      required: true,
      max: 200,
      min: 1,
    },
  ),
  attachments: yupFormSchemas.files(
    i18n('entities.vorAI.fields.attachment'),
    {},
  ),
  promptFiles: yupFormSchemas.files(
    i18n('entities.vorAI.fields.promptFiles'),
    {},
  ),
  promptFileText: yupFormSchemas.string(
    i18n('entities.vorAI.fields.promptFileText'),
    {},
  ),
  engine: yupFormSchemas.string(
    i18n('entities.vorAI.fields.engine'),
    { required: true },
  ),
  frequencyPenalty: yupFormSchemas.decimal(
    i18n('entities.vorAI.fields.frequencyPenalty'),
    { max: 2, min: 0 },
  ),
  maxTokens: yupFormSchemas.integer(
    i18n('entities.vorAI.fields.maxTokens'),
    { max: 8191, min: 1 },
  ),
  presencePenalty: yupFormSchemas.decimal(
    i18n('entities.vorAI.fields.presencePenalty'),
    { max: 2, min: 0 },
  ),
  prompt: yupFormSchemas.string(
    i18n('entities.vorAI.fields.prompt'),
    {},
  ),
  stopSequence: yupFormSchemas.string(
    i18n('entities.vorAI.fields.stopSequence'),
    {},
  ),
  temperature: yupFormSchemas.decimal(
    i18n('entities.vorAI.fields.temperature'),
    { max: 1, min: 0 },
  ),
  topP: yupFormSchemas.decimal(
    i18n('entities.vorAI.fields.topP'),
    { max: 1, min: 0 },
  ),
});

const VORAIForm = (props) => {
  const {
    modal,
    onDownloadExcelTemplate,
    onStatus,
    onSubmit,
    onUploadAndTrain,
    onSubmitExtraction,
    record,
    responseFromAPIService,
    submitLoading,
  } = props;

  const dispatch = useDispatch();

  const [initialValues] = useState(() => {
    const values = record || {};
    return {
      apiBearerToken: values.apiBearerToken ?? '',
      attachment: values.attachment ?? [],
      engine: values.engine ?? 'text-ada-001',
      frequencyPenalty: values.frequencyPenalty ?? 0,
      maxTokens: values.maxTokens ?? 100,
      presencePenalty: values.presencePenalty ?? 0,
      prompt: values.prompt ?? '',
      stopSequence: values.stopSequence ?? '',
      temperature: values.temperature ?? 0,
      topP: values.topP ?? 1,
    };
  });

  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    defaultValues: initialValues as any,
  });

  const doStatus = (values) => {
    onStatus && onStatus(values);
  };

  const doUploadAndTrain = (values) => {
    onUploadAndTrain && onUploadAndTrain(values);
  };

  const doReset = () => {
    Object.keys(initialValues).forEach((key) => {
      form.setValue(key, initialValues[key]);
    });
    dispatch(formActions.doRefresh());
  };

  const doSubmitExtraction = (values) => {
    onSubmitExtraction && onSubmitExtraction(values);
  };

  const VorAiLayout = (
    <VORAILayout
      onDownloadExcelTemplate={onDownloadExcelTemplate}
      onStatus={form.handleSubmit(doStatus)}
      onSubmit={() => {
        form.handleSubmit((values) => {
          onSubmit(values);
        })()
      }}
      onUploadAndTrain={form.handleSubmit(doUploadAndTrain)}
      onSubmitExtraction={form.handleSubmit(
        doSubmitExtraction,
      )}
      record={record}
      responseFromAPIService={responseFromAPIService}
      submitLoading={submitLoading}
    />
  );

  return (
    <FormWrapper>
      <FormProvider {...form}>
        <form>
          {modal ? (
            VorAiLayout
          ) : (
            <Card>
              <MDBox p={1.6}>{VorAiLayout}</MDBox>
            </Card>
          )}
        </form>
      </FormProvider>
    </FormWrapper>
  );
};

VORAIForm.defaultProps = {
  modal: false,
  record: null,
  responseFromAPIService: null,
};

VORAIForm.propTypes = {
  modal: PropTypes.bool,
  onDownloadExcelTemplate: PropTypes.func,
  onStatus: PropTypes.func,
  onSubmit: PropTypes.func,
  onUploadAndTrain: PropTypes.func,
  onSubmitExtraction: PropTypes.func,
  record: PropTypes.any,
  responseFromAPIService: PropTypes.string,
  submitLoading: PropTypes.bool,
};

export default VORAIForm;
