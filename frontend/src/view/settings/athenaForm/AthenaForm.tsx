import { Card, Grid } from '@mui/material';
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
import AthenaLayout from 'src/view/settings/athenaForm/AthenaLayout';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';
import Spinner from 'src/view/shared/Spinner';

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
    { max: 4000, min: 1 },
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

const AthenaForm = (props) => {
  const {
    onDownloadExcelTemplate,
    onStatus,
    onSubmit,
    onUploadAndTrain,
    record,
    initLoading,
    saveLoading,
    submitLoading,
  } = props;

  const [initialValues] = useState(() => {
    const values = record || {};

    return {
      apiBearerToken: values.apiBearerToken ?? '',
      attachments: values.attachments ?? [],
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

  const doSubmit = (values) => {
    onSubmit && onSubmit(values);
  };

  const doUploadAndTrain = (values) => {
    onUploadAndTrain && onUploadAndTrain(values);
  };

  const renderAthenaLayout = () => (
    <AthenaLayout
      onDownloadExcelTemplate={onDownloadExcelTemplate}
      onStatus={form.handleSubmit(doStatus)}
      onSubmit={form.handleSubmit(doSubmit)}
      onUploadAndTrain={form.handleSubmit(doUploadAndTrain)}
      record={record}
      saveLoading={saveLoading}
      submitLoading={submitLoading}
    />
  );

  return (
    <FormWrapper>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(doSubmit)}>
          <MDBox p={1.6} >
            {
              renderAthenaLayout()
            }
          </MDBox>
        </form>
      </FormProvider>
    </FormWrapper>
  );
};

AthenaForm.defaultProps = {
  record: null,
};

AthenaForm.propTypes = {
  onDownloadExcelTemplate: PropTypes.func,
  onStatus: PropTypes.func,
  onSubmit: PropTypes.func,
  onUploadAndTrain: PropTypes.func,
  record: PropTypes.any,
  initLoading: PropTypes.bool,
  saveLoading: PropTypes.bool,
  submitLoading: PropTypes.bool,
};

export default AthenaForm;
