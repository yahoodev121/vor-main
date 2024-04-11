import { Card, Grid } from '@mui/material';
import { DEFAULT_MOMENT_FORMAT } from 'src/config/common';
import { i18n } from 'src/i18n';
import CreationInfo from 'src/view/shared/view/CreationInfo';
import FilesViewItem from 'src/view/shared/view/FilesViewItem';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import moment from 'moment';
import NoteViewItem from 'src/view/note/view/NoteViewItem';
import ProjectPriorityViewItem from 'src/view/projectPriority/view/ProjectPriorityViewItem';
import ProjectStatusViewItem from 'src/view/projectStatus/view/ProjectStatusViewItem';
import ProjectTypeViewItem from 'src/view/projectType/view/ProjectTypeViewItem';
import RiskViewTable from 'src/view/risk/view/RiskViewTable';
import Spinner from 'src/view/shared/Spinner';
import TaskViewTable from 'src/view/programControl/view/TaskViewTable';
import TextViewItem from 'src/view/shared/view/TextViewItem';
import UserGroupViewItem from 'src/view/userGroup/view/UserGroupViewItem';
import UserViewItem from 'src/view/user/view/UserViewItem';

function ProjectView(props) {
  const { record, loading } = props;

  if (loading || !record) {
    return <Spinner />;
  }

  return (
    <Grid container spacing={1.6}>
      <Grid item lg={8} md={8} sm={12} xs={12}>
        <Card sx={{ height: '100%' }}>
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
            >{`# ${record.reference}`}</MDTypography>
            <Grid spacing={1.6} container>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <MDTypography variant="h5">
                  {record.name}
                </MDTypography>
              </Grid>

              <Grid item lg={6} md={6} sm={12} xs={12}>
                <ProjectTypeViewItem
                  label={i18n(
                    'entities.project.fields.type',
                  )}
                  value={record.type}
                />
              </Grid>

              <Grid item xs={12}>
                <TextViewItem
                  label={i18n(
                    'entities.project.fields.description',
                  )}
                  value={record.description}
                  multiline
                />
              </Grid>

              <Grid item lg={6} md={6} sm={12} xs={12}>
                <ProjectStatusViewItem
                  label={i18n(
                    'entities.project.fields.status',
                  )}
                  value={record.status}
                />
              </Grid>

              <Grid item lg={6} md={6} sm={12} xs={12}>
                <ProjectPriorityViewItem
                  label={i18n(
                    'entities.project.fields.priority',
                  )}
                  value={record.priority}
                />
              </Grid>

              <Grid item lg={6} md={6} sm={12} xs={12}>
                <UserViewItem
                  label={i18n(
                    'entities.project.fields.owner',
                  )}
                  value={record.owner}
                />
              </Grid>

              <Grid item lg={6} md={6} sm={12} xs={12}>
                <TextViewItem
                  label={i18n(
                    'entities.project.fields.dueDate',
                  )}
                  value={moment(record.dueDate).format(
                    'YYYY-MM-DD HH:mm',
                  )}
                />
              </Grid>

              {record.status.status === 'Complete' && (
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <TextViewItem
                    label={i18n(
                      'entities.project.fields.completedDate',
                    )}
                    value={moment(
                      record.completedDate,
                    ).format(DEFAULT_MOMENT_FORMAT)}
                  />
                </Grid>
              )}

              <Grid xs={12} item>
                <CreationInfo {...props} />
              </Grid>
            </Grid>
          </MDBox>
        </Card>
      </Grid>
      <Grid item lg={4} md={4} sm={12} xs={12}>
        <Grid height="100%" container>
          <Grid item xs={12}>
            <Card sx={{ height: '100%' }}>
              <MDBox p={2.4} topBorder>
                <Grid container spacing={1.6}>
                  <Grid item xs={12}>
                    <MDTypography variant="h5">
                      {i18n(
                        'entities.project.fields.notes',
                      )}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12}>
                    <NoteViewItem
                      label={i18n(
                        'entities.project.fields.notes',
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
        <Grid spacing={1.6} container>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Card sx={{ height: '100%' }}>
              <MDBox p={2.4} topBorder>
                <Grid spacing={1.6} container>
                  <Grid item xs={12}>
                    <MDTypography variant="h5">
                      {i18n(
                        'entities.project.fields.teamMembers',
                      )}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12}>
                    <UserViewItem
                      label={i18n(
                        'entities.project.fields.teamMembers',
                      )}
                      value={record.teamMembers}
                      hiddenLabel
                    />
                  </Grid>
                </Grid>
              </MDBox>
            </Card>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Card sx={{ height: '100%' }}>
              <MDBox p={2.4} topBorder>
                <Grid spacing={1.6} container>
                  <Grid item xs={12}>
                    <MDTypography variant="h5">
                      {i18n(
                        'entities.project.fields.teamGroups',
                      )}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12}>
                    <UserGroupViewItem
                      label={i18n(
                        'entities.project.fields.teamGroups',
                      )}
                      value={record.teamGroups}
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
                    'entities.project.fields.attachments',
                  )}
                </MDTypography>
              </Grid>
              <Grid item xs={12}>
                <FilesViewItem
                  label={i18n(
                    'entities.project.fields.attachments',
                  )}
                  value={record.attachments}
                  hiddenLabel
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
            confirmTextToAdd={i18n(
              'entities.project.addThisTask',
            )}
          />
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <RiskViewTable
            value={record.risks}
            doAddRisks={props.doAddRisks}
            confirmTextToAdd={i18n(
              'entities.project.addThisRisk',
            )}
          />
        </Card>
      </Grid>
    </Grid>
  );
}

export default ProjectView;
