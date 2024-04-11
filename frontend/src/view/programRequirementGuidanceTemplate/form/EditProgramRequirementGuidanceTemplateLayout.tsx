import { Card, Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import ProductCategoryAutocompleteFormItem from 'src/view/productCategory/autocomplete/ProductCategoryAutocompleteFormItem';
import ProgramRequirementTemplateAutocompleteFormItem from 'src/view/programRequirementTemplate/autocomplete/ProgramRequirementTemplateAutocompleteFormItem';
import TextAreaFormItem from 'src/view/shared/form/items/TextAreaFormItem';

function EditProgramRequirementGuidanceTemplate(props) {
  const { initialValues } = props;
  return (
    <Grid container spacing={1.6}>
      <Grid item md={6} xs={12}>
        <Card sx={{ height: '100%' }}>
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
                      'entities.programRequirementGuidanceTemplate.info',
                    )}
                  </MDTypography>
                </MDBox>
              </Grid>
              <Grid item xs={12}>
                <InputFormItem
                  name="name"
                  label={i18n(
                    'entities.programRequirementGuidanceTemplate.fields.name',
                  )}
                  variant="standard"
                  required={true}
                  autoFocus={true}
                />
              </Grid>
              <Grid item xs={12}>
                <TextAreaFormItem
                  name="description"
                  label={i18n(
                    'entities.programRequirementGuidanceTemplate.fields.description',
                  )}
                  variant="standard"
                  required={true}
                  rows={6}
                />
              </Grid>
            </Grid>
          </MDBox>
        </Card>
      </Grid>
      <Grid item md={6} xs={12}>
        <MDBox position="relative" height="100%">
          <Grid height="100%" container>
            <Grid item xs={12} pb={1.6}>
              <Card sx={{ height: '100%' }}>
                <MDBox p={2.4} topBorder>
                  <Grid container spacing={1.6}>
                    <Grid item xs={12}>
                      <MDTypography variant="h5">
                        {i18n(
                          'entities.programRequirementGuidanceTemplate.fields.requirementTemplates',
                        )}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12}>
                      <ProgramRequirementTemplateAutocompleteFormItem
                        name="requirementTemplates"
                        label={i18n(
                          'entities.programRequirementGuidanceTemplate.fields.requirementTemplates',
                        )}
                        mode="multiple"
                        required={false}
                        showCreate={true}
                        variant="standard"
                      />
                    </Grid>
                  </Grid>
                </MDBox>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card sx={{ height: '100%' }}>
                <MDBox p={2.4} topBorder>
                  <Grid container spacing={1.6}>
                    <Grid item xs={12}>
                      <MDTypography variant="h5">
                        {i18n(
                          'entities.programRequirementGuidanceTemplate.fields.productCategories',
                        )}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12}>
                      <ProductCategoryAutocompleteFormItem
                        name="productCategories"
                        label={i18n(
                          'entities.programRequirementGuidanceTemplate.fields.productCategories',
                        )}
                        mode="multiple"
                        required={false}
                        showCreate={true}
                        variant="standard"
                      />
                    </Grid>
                  </Grid>
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
      </Grid>
    </Grid>
  );
}

export default EditProgramRequirementGuidanceTemplate;
