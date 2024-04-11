import { Card, Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import { useDispatch } from 'react-redux';
import { useForm, FormProvider, useFormContext } from 'react-hook-form';
import { useState, useEffect, useRef } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import formActions from 'src/modules/form/formActions';
import FormWrapper from 'src/view/shared/styles/FormWrapper';
import MDBox from 'src/mui/components/MDBox';
import MDButton from 'src/mui/components/MDButton';
import PropTypes from 'prop-types';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';
import TextAreaFormItem from 'src/view/shared/form/items/TextAreaFormItem';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import CloseIcon from '@mui/icons-material/Close';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import Message from 'src/view/shared/message';
import MDTypography from 'src/mui/components/MDTypography';

const schema = yup.object().shape({
  question: yupFormSchemas.string(
    i18n('settings.fields.question'),
    {
      required: true,
      max: 10000,
    },
  ),
});

const AIConfiguratorForm = (props) => {
  const {
    isConfigured,
    onSubmit,
    responseFromAPIService,
    loading,
  } = props;

  const dispatch = useDispatch();
  const { sidenavColor } = selectMuiSettings();
  const [questionsLength, setQuestionsLength] = useState(() => {
    if (responseFromAPIService) {
      return responseFromAPIService.length;
    } else return 0;
  });

  const [initialValues] = useState(() => {
    return {
      question: responseFromAPIService || '',
    };
  });

  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    defaultValues: initialValues as any,
  });

  const doSubmit = (values) => {
    if (!isConfigured) {
      Message.error(i18n('settings.athena.isNotConfigured'));
      return;
    }
    onSubmit && onSubmit(values);
  };

  const doChange = (value) => {
    setQuestionsLength(value.length);
  };

  useEffect(() => {
    if (responseFromAPIService) {
      form.setValue('question', responseFromAPIService, {
        shouldDirty: true,
        shouldValidate: false,
      });
      setQuestionsLength(responseFromAPIService.length);
      dispatch(formActions.doRefresh());
    }
  }, [responseFromAPIService]);

  return (
    <FormWrapper>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(doSubmit)}>
          <Grid spacing={0} container>
            <Grid xs={12} item>
              <TextAreaFormItem
                autoFocus={true}
                label={questionsLength ? " " : i18n('settings.fields.question')}
                name="question"
                rows={30}
                variant="standard"
                onChange={doChange}
              />
              <MDBox
                display='flex'
                justifyContent='right'
              >
                <MDTypography>
                  {questionsLength}
                </MDTypography>
              </MDBox>
            </Grid>
            <Grid xs={12} item>
              <MDBox display="flex" justifyContent="flex-end" gap={0.8}>
                <MDButton
                  variant="outlined"
                  color={sidenavColor}
                  onClick={() => props.onCancel()}
                  type="button"
                  startIcon={<CloseIcon />}
                  size="small"
                >
                  {i18n('common.cancel')}
                </MDButton>
                <MDButton
                  color={sidenavColor}
                  disabled={loading}
                  onClick={form.handleSubmit(doSubmit)}
                  variant="gradient"
                  startIcon={<QuestionAnswerIcon />}
                >
                  {i18n('common.submit')}
                </MDButton>
              </MDBox>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </FormWrapper>
  );
};

AIConfiguratorForm.defaultProps = {
  responseFromAPIService: null,
};

AIConfiguratorForm.propTypes = {
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
  responseFromAPIService: PropTypes.string,
  loading: PropTypes.bool,
  isConfigured: PropTypes.bool,
};

export default AIConfiguratorForm;
