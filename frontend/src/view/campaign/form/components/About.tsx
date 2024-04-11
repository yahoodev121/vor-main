import { Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import { newQuestionnaireEntity } from 'src/view/Questionnaire/common';
import { useDispatch } from 'react-redux';
import { useFormContext } from 'react-hook-form';
import { useState } from 'react';
import BorderedCardButton from 'src/view/shared/components/BorderedCardButton';
import CodeIcon from '@mui/icons-material/Code';
import DatePickerFormItem from 'src/view/shared/form/items/DatePickerFormItem';
import formActions from 'src/modules/form/formActions';
import Grid2 from '@mui/material/Unstable_Grid2';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import StepContent from 'src/view/shared/components/StepContent';
import TextAreaFormItem from 'src/view/shared/form/items/TextAreaFormItem';

const About = ({ visible = false }) => {
  const dispatch = useDispatch();
  const { getValues, setValue, register } =
    useFormContext();
  const existingQuestionnaire = getValues(
    'existingQuestionnaire',
  );
  const type = getValues('type');
  const audience = getValues('audience');
  const [refresh, setRefresh] = useState(false);
  const onSelectQuestionnaireType = (isExisting = true) => {
    register('existingQuestionnaire');
    setValue('existingQuestionnaire', isExisting, {
      shouldValidate: false,
      shouldDirty: true,
    });
    register('questionnaireId');
    setValue('questionnaireId', null, {
      shouldValidate: false,
      shouldDirty: true,
    });
    register('questionnaire');
    setValue('questionnaire', newQuestionnaireEntity(), {
      shouldValidate: false,
      shouldDirty: true,
    });
    dispatch(formActions.doRefresh());
    setRefresh(!refresh);
  };
  return (
    <StepContent
      title={i18n('entities.campaign.sections.about')}
      visible={visible}
    >
      <Grid spacing={1.6} container>
        <Grid
          item
          md={type === 'Questionnaire' ? 6 : 12}
          xs={12}
        >
          <InputFormItem
            name="name"
            label={i18n('entities.campaign.fields.name')}
            variant="standard"
            required
            autoFocus
          />
        </Grid>
        {type === 'Questionnaire' && (
          <Grid item md={6} xs={12}>
            <DatePickerFormItem
              name="dueDate"
              label={i18n(
                'entities.campaign.fields.dueDate',
              )}
              variant="standard"
              required
            />
          </Grid>
        )}
        <Grid item xs={12}>
          <TextAreaFormItem
            name="description"
            label={i18n(
              'entities.campaign.fields.description',
            )}
            variant="standard"
          />
        </Grid>
        {type === 'Questionnaire' && (
          <Grid item xs={12}>
            <MDBox py={1.3}>
              <MDTypography variant="h5">
                {i18n(
                  `entities.campaign.placeholders.select${audience}Questionnaire`,
                )}
              </MDTypography>
            </MDBox>
            <MDBox>
              <Grid2 container spacing={1.6}>
                <Grid2 md={3} mdOffset={3} xs={6}>
                  <BorderedCardButton
                    content={<CodeIcon fontSize="large" />}
                    title={i18n(
                      'entities.campaign.labels.newQuestionnaire',
                    )}
                    onClick={() =>
                      onSelectQuestionnaireType(false)
                    }
                    selected={!existingQuestionnaire}
                  />
                </Grid2>
                <Grid2 md={3} xs={6}>
                  <BorderedCardButton
                    content={
                      <QuestionAnswerIcon fontSize="large" />
                    }
                    title={i18n(
                      'entities.campaign.labels.existingQuestionnaire',
                    )}
                    onClick={() =>
                      onSelectQuestionnaireType()
                    }
                    selected={!!existingQuestionnaire}
                  />
                </Grid2>
              </Grid2>
            </MDBox>
          </Grid>
        )}
      </Grid>
    </StepContent>
  );
};

export default About;
