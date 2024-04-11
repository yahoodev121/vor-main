import { Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import StepContent from 'src/view/shared/components/StepContent';
import TextAreaFormItem from 'src/view/shared/form/items/TextAreaFormItem';

const About = ({ visible = false }) => {
  return (
    <StepContent
      title={i18n('entities.program.wizard.sections.about')}
      visible={visible}
    >
      <Grid spacing={1.6} container>
        <Grid item xs={12}>
          <InputFormItem
            name="name"
            label={i18n('entities.program.fields.name')}
            variant="standard"
            required={true}
            autoFocus={true}
          />
        </Grid>
        <Grid item xs={12}>
          <TextAreaFormItem
            name="description"
            label={i18n(
              'entities.program.fields.description',
            )}
            variant="standard"
            required={false}
            rows={10}
          />
        </Grid>
      </Grid>
    </StepContent>
  );
};

export default About;
