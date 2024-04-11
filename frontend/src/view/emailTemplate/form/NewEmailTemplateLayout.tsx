import { Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import GradientTitle from 'src/view/shared/components/GradientTitle';
import HtmlEditorFormItem from 'src/view/shared/form/items/HtmlEditorFormItem';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import MDBox from 'src/mui/components/MDBox';

function NewQuestionnaireTemplateLayout(props) {
  const { title, initialValues, hiddenImpossibleFields } =
    props;

  return (
    <MDBox px={0.8}>
      <Grid spacing={1.6} container>
        <Grid item xs={12}>
          <GradientTitle>
            {title ??
              i18n('entities.emailTemplate.new.title')}
          </GradientTitle>
        </Grid>
        <Grid item xs={12}>
          <InputFormItem
            name="name"
            label={i18n(
              'entities.emailTemplate.fields.name',
            )}
            variant="standard"
            required
            autoFocus
          />
        </Grid>
        <Grid item xs={12}>
          <InputFormItem
            name="fromEmailAddress"
            label={i18n(
              'entities.emailTemplate.fields.fromEmailAddress',
            )}
            variant="standard"
            required
          />
        </Grid>
        <Grid item xs={12}>
          <InputFormItem
            name="subject"
            label={i18n(
              'entities.emailTemplate.fields.subject',
            )}
            variant="standard"
            required
          />
        </Grid>
        <Grid item xs={12}>
          <HtmlEditorFormItem
            name="body"
            label={i18n(
              'entities.emailTemplate.fields.body',
            )}
            required
          />
        </Grid>
      </Grid>
    </MDBox>
  );
}

export default NewQuestionnaireTemplateLayout;
