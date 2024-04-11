import { Card, Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import CreationInfo from 'src/view/shared/view/CreationInfo';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import ProgramRequirementTemplateViewItem from 'src/view/programRequirementTemplate/view/ProgramRequirementTemplateViewItem';
import Spinner from 'src/view/shared/Spinner';
import TextViewItem from 'src/view/shared/view/TextViewItem';

function ProgramControlTemplateView(props) {
  const renderView = () => {
    const { record } = props;

    return (
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
                  'entities.programControlTemplate.fields.description',
                )}
                value={record.description}
                multiline={true}
              />
            </Grid>
            <Grid item xs={12}>
              <ProgramRequirementTemplateViewItem
                label={i18n(
                  'entities.programControlTemplate.fields.requirementTemplates',
                )}
                value={record.requirementTemplates}
              />
            </Grid>
            <Grid item xs={12}>
              <CreationInfo record={record} />
            </Grid>
          </Grid>
        </MDBox>
      </Card>
    );
  };

  const { record, loading } = props;

  if (loading || !record) {
    return <Spinner />;
  }

  return renderView();
}

export default ProgramControlTemplateView;
