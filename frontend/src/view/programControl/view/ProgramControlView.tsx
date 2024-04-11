import { Card, Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import CreationInfo from 'src/view/shared/view/CreationInfo';
import FilesViewItem from 'src/view/shared/view/FilesViewItem';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import NoteViewItem from 'src/view/note/view/NoteViewItem';
import ProgramControlService from 'src/modules/programControl/programControlService';
import ProgramRequirementViewItem from 'src/view/programRequirement/view/ProgramRequirementViewItem';
import Spinner from 'src/view/shared/Spinner';
import TagAutocompleteForm from 'src/view/tag/autocomplete/TagAutocompleteForm';
import TaskViewTable from 'src/view/programControl/view/TaskViewTable';
import TextViewItem from 'src/view/shared/view/TextViewItem';

function ProgramControlView(props) {
  const renderView = () => {
    const { record } = props;

    return (
      <Grid container spacing={1.6}>
        <Grid item md={8} xs={12}>
          <Card sx={{ height: '100%' }}>
            <MDBox position="relative" p={2.4} topBorder>
              <Grid spacing={1.6} container>
                <Grid item xs={12}>
                  <MDTypography variant="h5">
                    {record.name}
                  </MDTypography>
                </Grid>
                <Grid item xs={12}>
                  <TextViewItem
                    label={i18n(
                      'entities.programControl.fields.description',
                    )}
                    value={record.description}
                    multiline={true}
                  />
                </Grid>
                <Grid item xs={12}>
                  <ProgramRequirementViewItem
                    label={i18n(
                      'entities.programControl.fields.requirements',
                    )}
                    value={record.requirements}
                  />
                </Grid>
                <Grid item xs={12}>
                  <CreationInfo record={record} />
                </Grid>
              </Grid>
            </MDBox>
          </Card>
        </Grid>
        <Grid item md={4} xs={12}>
          <Grid height="100%" container>
            <Grid item xs={12} pb={1.6}>
              <Card sx={{ height: '100%' }}>
                <MDBox p={2.4} topBorder>
                  <Grid container spacing={1.6}>
                    <Grid item xs={12}>
                      <MDTypography variant="h5">
                        {i18n(
                          'entities.programControl.fields.tags',
                        )}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12}>
                      <TagAutocompleteForm
                        name="tags"
                        id={record.id}
                        handleService={
                          ProgramControlService.tags
                        }
                        tags={record.tags}
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
                          'entities.programControl.fields.notes',
                        )}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12}>
                      <NoteViewItem
                        label={i18n(
                          'entities.programControl.fields.notes',
                        )}
                        value={record.notes}
                        hiddenLabel
                      />
                    </Grid>
                  </Grid>
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <MDBox p={2.4} topBorder>
              <Grid spacing={1.6} container>
                <Grid item xs={12}>
                  <MDTypography variant="h5">
                    {i18n(
                      'entities.programControl.fields.attachments',
                    )}
                  </MDTypography>
                </Grid>
                <Grid item xs={12}>
                  <FilesViewItem
                    hiddenLabel={true}
                    label={i18n(
                      'entities.programControl.fields.attachments',
                    )}
                    value={record.attachments}
                  />
                </Grid>
              </Grid>
            </MDBox>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <TaskViewTable
              value={record.tasks}
              doAddTasks={props.doAddTasks}
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

export default ProgramControlView;
