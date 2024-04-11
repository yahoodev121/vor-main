import { Card, Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import ProgramRequirementTemplateAutocompleteFormItem from 'src/view/programRequirementTemplate/autocomplete/ProgramRequirementTemplateAutocompleteFormItem';
import TextAreaFormItem from 'src/view/shared/form/items/TextAreaFormItem';

function EditProgramTemplateLayout(props) {
  const { initialValues } = props;
  return (
    <Grid container spacing={1.6}>
      <Grid item xs={12}>
        <Card>
          <MDBox p={2.4} topBorder>
            <Grid spacing={1.6} container>
              <Grid item xs={12}>
                <MDBox
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <MDTypography variant="h5">
                    {i18n('entities.programTemplate.info')}
                  </MDTypography>
                </MDBox>
              </Grid>
              <Grid item xs={12}>
                <InputFormItem
                  name="name"
                  label={i18n(
                    'entities.programTemplate.fields.name',
                  )}
                  variant="standard"
                  required={true}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextAreaFormItem
                  name="description"
                  label={i18n(
                    'entities.programTemplate.fields.description',
                  )}
                  variant="standard"
                  required={false}
                />
              </Grid>
            </Grid>
          </MDBox>
        </Card>
      </Grid>
      {/*<Grid item xs={12}>
        <Card>
          <MDBox p={2.4} topBorder>
            <Grid spacing={1.6} container>
              <Grid item xs={12}>
                <MDBox
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <MDTypography variant="h5">
                    {i18n(
                      'entities.programTemplate.fields.requirementTemplates',
                    )}
                  </MDTypography>
                </MDBox>
              </Grid>
              <Grid item xs={12}>
                <ProgramRequirementTemplateAutocompleteFormItem
                  name="requirementTemplates"
                  label={i18n(
                    'entities.programTemplate.fields.requirementTemplates',
                  )}
                  variant="standard"
                  mode="multiple"
                  showCreate={true}
                />
              </Grid>
            </Grid>
          </MDBox>
        </Card>
                  </Grid>*/}
    </Grid>
  );
}

export default EditProgramTemplateLayout;
