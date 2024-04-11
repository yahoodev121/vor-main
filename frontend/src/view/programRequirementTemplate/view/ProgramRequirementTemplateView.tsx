import { Card, Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import CreationInfo from 'src/view/shared/view/CreationInfo';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import ProgramControlTemplateViewTable from 'src/view/programControlTemplate/view/ProgramControlTemplateViewTable';
import ProgramRequirementGuidanceTemplateViewItem from 'src/view/programRequirementGuidanceTemplate/view/ProgramRequirementGuidanceTemplateViewItem';
import ProgramTemplateViewItem from 'src/view/programTemplate/view/ProgramTemplateViewItem';
import Spinner from 'src/view/shared/Spinner';
import TextViewItem from 'src/view/shared/view/TextViewItem';

function ProgramRequirementTemplateView(props) {
  const renderView = () => {
    const { record } = props;

    return (
      <Grid container spacing={1.6}>
        <Grid item xs={12}>
          <Card>
            <MDBox position="relative" p={2.4} topBorder>
              <MDTypography
                position="absolute"
                top={0}
                right={0}
                p={1.6}
                textAlign="right"
                variant="button"
                color="text"
                fontWeight="bold"
              >{`# ${record.requirementID}`}</MDTypography>
              <Grid spacing={1.6} container>
                <Grid item xs={12}>
                  <MDTypography variant="h3">
                    {record.name}
                  </MDTypography>
                </Grid>
                <Grid item xs={12}>
                  <TextViewItem
                    label={i18n(
                      'entities.programRequirementTemplate.fields.description',
                    )}
                    value={record.description}
                    multiline={true}
                    rows={10}
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <ProgramTemplateViewItem
                    label={i18n(
                      'entities.programRequirementTemplate.fields.programTemplates',
                    )}
                    value={record.programTemplates}
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <ProgramRequirementGuidanceTemplateViewItem
                    label={i18n(
                      'entities.programRequirementTemplate.fields.guidanceTemplates',
                    )}
                    value={record.guidanceTemplates}
                  />
                </Grid>
                <Grid item xs={12}>
                  <CreationInfo record={record} />
                </Grid>
              </Grid>
            </MDBox>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <ProgramControlTemplateViewTable
              value={record.controlTemplates}
            />
          </Card>
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

export default ProgramRequirementTemplateView;
