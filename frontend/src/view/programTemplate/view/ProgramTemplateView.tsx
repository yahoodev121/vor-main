import { Card, Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import CreationInfo from 'src/view/shared/view/CreationInfo';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import ProgramRequirementTemplateViewTable from 'src/view/programRequirementTemplate/view/ProgramRequirementTemplateViewTable';
import Spinner from 'src/view/shared/Spinner';
import TextViewItem from 'src/view/shared/view/TextViewItem';

function ProgramTemplateView(props) {
  const renderView = () => {
    const { record } = props;

    return (
      <Grid container spacing={1.6}>
        <Grid item xs={12}>
          <Card>
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
                      'entities.programTemplate.fields.description',
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
        <Grid item xs={12}>
          <Card>
            <ProgramRequirementTemplateViewTable
              value={record.requirementTemplates}
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

export default ProgramTemplateView;
