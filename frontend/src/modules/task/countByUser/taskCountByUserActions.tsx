import { getHistory } from 'src/modules/store';
import authSelectors from 'src/modules/auth/authSelectors';
import Errors from 'src/modules/shared/error/errors';
import TaskService from 'src/modules/task/taskService';

const prefix = 'TASK_COUNT_BY_USER';

const taskCountByUserActions = {
  FETCH_STARTED: `${prefix}_FETCH_STARTED`,
  FETCH_SUCCESS: `${prefix}_FETCH_SUCCESS`,
  FETCH_ERROR: `${prefix}_FETCH_ERROR`,

  doFetch:
    (id = null) =>
    async (dispatch, getState) => {
      try {
        dispatch({
          type: taskCountByUserActions.FETCH_STARTED,
        });

        const currentUser = authSelectors.selectCurrentUser(
          getState(),
        );

        const record = await TaskService.countByUser(
          id ?? currentUser.id,
        );

        dispatch({
          type: taskCountByUserActions.FETCH_SUCCESS,
          payload: record,
        });
      } catch (error) {
        Errors.handle(error);

        dispatch({
          type: taskCountByUserActions.FETCH_ERROR,
        });

        getHistory().push('/task');
      }
    },
};

export default taskCountByUserActions;
