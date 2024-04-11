import { Card, Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import CreationInfo from 'src/view/shared/view/CreationInfo';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import ProductCategoryViewItem from 'src/view/productCategory/view/ProductCategoryViewItem';
import ProgramRequirementTemplateViewItem from 'src/view/programRequirementTemplate/view/ProgramRequirementTemplateViewItem';
import Spinner from 'src/view/shared/Spinner';
import TextViewItem from 'src/view/shared/view/TextViewItem';

function ProgramRequirementGuidanceTemplateView(props) {
  const renderView = () => {
    const { record } = props;

    return (
      <Grid container spacing={1.6}>
        <Grid item md={6} xs={12}>
          <Card sx={{ height: '100%' }}>
            <MDBox position="relative" p={2.4} topBorder>
              <Grid spacing={1.6} container>
                <Grid item xs={12}>
                  <MDTypography variant="h3">
                    {record.name}
                  </MDTypography>
                </Grid>
                <Grid item xs={12}>
                  <TextViewItem
                    label={i18n(
                      'entities.programRequirementGuidanceTemplate.fields.description',
                    )}
                    value={record.description}
                    multiline={true}
                  />
                </Grid>
                <Grid item xs={12}>
                  <CreationInfo record={record} />
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
                        <ProgramRequirementTemplateViewItem
                          hiddenLabel={true}
                          label={i18n(
                            'entities.programRequirementGuidanceTemplate.fields.requirementTemplates',
                          )}
                          value={
                            record.requirementTemplates
                          }
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
                        <ProductCategoryViewItem
                          hiddenLabel={true}
                          label={i18n(
                            'entities.programRequirementGuidanceTemplate.fields.productCategories',
                          )}
                          value={record.productCategories}
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
  };

  const { record, loading } = props;

  if (loading || !record) {
    return <Spinner />;
  }

  return renderView();
}

export default ProgramRequirementGuidanceTemplateView;
