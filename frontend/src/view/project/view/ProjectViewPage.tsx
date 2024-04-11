import { Card, Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import actions from 'src/modules/project/view/projectViewActions';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import ProjectView from 'src/view/project/view/ProjectView';
import ProjectViewToolbar from 'src/view/project/view/ProjectViewToolbar';
import riskListActions from 'src/modules/risk/list/riskListActions';
import selectors from 'src/modules/project/view/projectViewSelectors';
import taskListActions from 'src/modules/task/list/taskListActions';
import projectFormActions from 'src/modules/project/form/projectFormActions';

function ProjectPage() {
  const dispatch = useDispatch();
  const match = useRouteMatch();

  const loading = useSelector(selectors.selectLoading);
  const record = useSelector(selectors.selectRecord);

  const [taskIds, setTaskIds] = useState(
    record?.tasks || [],
  );
  const [riskIds, setRiskIds] = useState(
    record?.risks || [],
  );

  const doAddTasks = (id) => {
    const newTaskIds = [...taskIds, id];
    setTaskIds(newTaskIds);
    dispatch(
      projectFormActions.doAddTaskOrRisk(record.id, {
        tasks: newTaskIds,
        risks: riskIds,
      }),
    );
    dispatch(
      taskListActions.doFetchCurrentFilter({
        ids: newTaskIds,
        contains: true,
      }),
    );
  };
  const doAddRisks = (id) => {
    const newRiskIds = [...riskIds, id];
    setRiskIds(newRiskIds);
    dispatch(
      projectFormActions.doAddTaskOrRisk(record.id, {
        tasks: taskIds,
        risks: newRiskIds,
      }),
    );
    dispatch(
      riskListActions.doFetchCurrentFilter({
        ids: newRiskIds,
        contains: true,
      }),
    );
  };

  useEffect(() => {
    setTaskIds(record?.tasks ?? []);
  }, [record?.tasks]);

  useEffect(() => {
    setRiskIds(record?.risks ?? []);
  }, [record?.risks]);

  useEffect(() => {
    dispatch(actions.doFind(match.params.id));
  }, [dispatch, match.params.id]);

  return (
    <Grid spacing={1.6} container>
      <Grid xs={12} item>
        <Card>
          <MDBox p={2.4} topBorder>
            <MDBox
              display="flex"
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <MDTypography variant="h4">
                {i18n('entities.project.view.title')}
              </MDTypography>
              <ProjectViewToolbar match={match} />
            </MDBox>
          </MDBox>
        </Card>
      </Grid>
      <Grid xs={12} item>
        <ProjectView
          loading={loading}
          record={record}
          doAddTasks={doAddTasks}
          doAddRisks={doAddRisks}
        />
      </Grid>
    </Grid>
  );
}

export default ProjectPage;
