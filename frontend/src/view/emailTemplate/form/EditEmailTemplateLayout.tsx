import { Card, Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import HtmlEditorFormItem from 'src/view/shared/form/items/HtmlEditorFormItem';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import MDBox from 'src/mui/components/MDBox';

function EditQuestionnaireTemplateLayout(props) {
  return (
    <Card>
      <MDBox p={2.4} topBorder>
        <Grid spacing={1.6} container>
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
    </Card>
  );
}

export default EditQuestionnaireTemplateLayout;
