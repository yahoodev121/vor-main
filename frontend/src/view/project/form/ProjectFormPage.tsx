import { Card, Grid } from '@mui/material';
import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import actions from 'src/modules/project/form/projectFormActions';
import ProjectForm from 'src/view/project/form/ProjectForm';
import riskListActions from 'src/modules/risk/list/riskListActions';
import RiskViewTable from 'src/view/risk/view/RiskViewTable';
import selectors from 'src/modules/project/form/projectFormSelectors';
import Spinner from 'src/view/shared/Spinner';
import taskListActions from 'src/modules/task/list/taskListActions';
import TaskViewTable from 'src/view/programControl/view/TaskViewTable';

function ProjectFormPage(props) {
  const [dispatched, setDispatched] = useState(false);
  const dispatch = useDispatch();
  const match = useRouteMatch();

  const initLoading = useSelector(
    selectors.selectInitLoading,
  );
  const saveLoading = useSelector(
    selectors.selectSaveLoading,
  );
  const record = useSelector(selectors.selectRecord);

  const isEditing = Boolean(match.params.id);
  const title = isEditing
    ? i18n('entities.project.edit.title')
    : i18n('entities.project.new.title');

  useEffect(() => {
    dispatch(actions.doInit(match.params.id));
    setDispatched(true);
  }, [dispatch, match.params.id]);

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
      riskListActions.doFetchCurrentFilter({
        ids: newRiskIds,
        contains: true,
      }),
    );
  };

  const doSubmit = (id, data) => {
    if (isEditing) {
      dispatch(
        actions.doUpdate(id, {
          ...data,
          tasks: taskIds,
          risks: riskIds,
        }),
      );
    } else {
      dispatch(actions.doCreate(data));
    }
  };

  useEffect(() => {
    setTaskIds(record?.tasks ?? []);
  }, [record?.tasks]);

  useEffect(() => {
    setRiskIds(record?.risks ?? []);
  }, [record?.risks]);

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
    >
      <Grid item xs={12}>
        {initLoading && <Spinner />}

        {dispatched && !initLoading && (
          <>
            <ProjectForm
              saveLoading={saveLoading}
              initLoading={initLoading}
              record={record}
              isEditing={isEditing}
              onSubmit={doSubmit}
              onCancel={() =>
                isEditing
                  ? getHistory().push(
                      `/project/${match.params.id}`,
                    )
                  : getHistory().push('/project')
              }
            />
            {isEditing && (
              <Grid container spacing={1.6} pt={1.6}>
                <Grid item xs={12}>
                  <Card>
                    <TaskViewTable
                      value={record?.tasks}
                      doAddTasks={doAddTasks}
                      confirmTextToAdd={i18n(
                        'entities.project.addThisTask',
                      )}
                    />
                  </Card>
                </Grid>
                <Grid item xs={12}>
                  <Card>
                    <RiskViewTable
                      value={record?.risks}
                      doAddRisks={doAddRisks}
                      confirmTextToAdd={i18n(
                        'entities.project.addThisRisk',
                      )}
                    />
                  </Card>
                </Grid>
              </Grid>
            )}
          </>
        )}
      </Grid>
    </Grid>
  );
}

export default ProjectFormPage;
