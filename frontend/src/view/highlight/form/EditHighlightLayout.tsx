import { Grid, Card } from '@mui/material';
import { i18n } from 'src/i18n';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import DatePickerFormItem from 'src/view/shared/form/items/DatePickerFormItem';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import TextAreaFormItem from 'src/view/shared/form/items/TextAreaFormItem';
import TagAutocompleteFormItem from 'src/view/tag/autocomplete/TagAutocompleteFormItem';

function EditHighlightLayout(props) {
  const { initialValues } = props;
  return (
    <Grid container spacing={1.6}>
      <Grid lg={8} xs={12} item>
        <Card sx={{ height: '100%' }}>
          <MDBox px={2.4} py={2.4} topBorder>
            <Grid spacing={1.6} container>
              <Grid item xs={12}>
                <MDTypography variant="h5">
                  {i18n('entities.highlight.info')}
                </MDTypography>
              </Grid>
              <Grid item xs={12}>
                <InputFormItem
                  name="title"
                  label={i18n(
                    'entities.highlight.fields.title',
                  )}
                  variant="standard"
                  required={true}
                  autoFocus={true}
                />
              </Grid>
              <Grid item xs={12}>
                <InputFormItem
                  name="source"
                  label={i18n(
                    'entities.highlight.fields.source',
                  )}
                  variant="standard"
                  required={true}
                />
              </Grid>
              <Grid item xs={12}>
                <TextAreaFormItem
                  name="description"
                  label={i18n(
                    'entities.highlight.fields.description',
                  )}
                  variant="standard"
                  required={true}
                />
              </Grid>
            </Grid>
          </MDBox>
        </Card>
      </Grid>
      <Grid lg={4} xs={12} item>
        <Card>
          <MDBox p={2.4} topBorder>
            <Grid spacing={1.6} container>
              <Grid xs={12} item>
                <MDTypography variant="h5">
                  {i18n('entities.highlight.fields.tags')}
                </MDTypography>
              </Grid>
              <Grid xs={12} item>
                <Grid item xs={12}>
                  <TagAutocompleteFormItem name="tags" />
                </Grid>
              </Grid>
            </Grid>
          </MDBox>
        </Card>
      </Grid>
    </Grid>
  );
}

export default EditHighlightLayout;
