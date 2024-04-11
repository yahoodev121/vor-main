import { FormProvider, useForm } from 'react-hook-form';
import { Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CreationInfo from 'src/view/shared/view/CreationInfo';
import FormWrapper from 'src/view/shared/styles/FormWrapper';
import Questionnaire from 'src/view/Questionnaire';
import Spinner from 'src/view/shared/Spinner';
import TextViewItem from 'src/view/shared/view/TextViewItem';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';

const schema = yup.object().shape({
  name: yupFormSchemas.string(
    i18n('entities.questionnaireTemplate.fields.name'),
    {
      required: true,
      min: 1,
      max: 100,
    },
  ),
  questionnaire: yupFormSchemas.generic(
    i18n(
      'entities.questionnaireTemplate.fields.questionnaire',
    ),
  ),
});

function QuestionnaireTemplateView(props) {
  const renderView = () => {
    const { record } = props;
    const [initialValues] = useState(() => {
      return {
        name: record.name,
        questionnaire: record.questionnaire,
      };
    });

    const form = useForm({
      resolver: yupResolver(schema),
      mode: 'onSubmit',
      defaultValues: initialValues as any,
    });

    return (
      <FormWrapper>
        <FormProvider {...form}>
          <form>
            <Grid spacing={1.6} container>
              <Grid xs={3} item>
                <TextViewItem
                  label={i18n(
                    'entities.questionnaireTemplate.fields.name',
                  )}
                  value={record.name}
                />
              </Grid>
              <Grid xs={12} item>
                <Questionnaire
                  name="questionnaire"
                  preview={true}
                  visibleExportButton={false}
                  visibleImportButton={false}
                />
              </Grid>
              <Grid xs={12} item>
                <CreationInfo {...props} />
              </Grid>
            </Grid>
          </form>
        </FormProvider>
      </FormWrapper>
    );
  };

  const { record, loading } = props;

  if (loading || !record) {
    return <Spinner />;
  }

  return renderView();
}

export default QuestionnaireTemplateView;
