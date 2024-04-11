import listActions from 'src/modules/taskList/list/taskListListActions';
import TaskListService from 'src/modules/taskList/taskListService';
import Errors from 'src/modules/shared/error/errors';
import { i18n } from 'src/i18n';
import { getHistory } from 'src/modules/store';
import Message from 'src/view/shared/message';

const prefix = 'TASKLIST_DESTROY';

const taskListDestroyActions = {
  DESTROY_STARTED: `${prefix}_DESTROY_STARTED`,
  DESTROY_SUCCESS: `${prefix}_DESTROY_SUCCESS`,
  DESTROY_ERROR: `${prefix}_DESTROY_ERROR`,

  DESTROY_ALL_STARTED: `${prefix}_DESTROY_ALL_STARTED`,
  DESTROY_ALL_SUCCESS: `${prefix}_DESTROY_ALL_SUCCESS`,
  DESTROY_ALL_ERROR: `${prefix}_DESTROY_ALL_ERROR`,

  doDestroy: (id) => async (dispatch) => {
    try {
      dispatch({
        type: taskListDestroyActions.DESTROY_STARTED,
      });

      await TaskListService.destroyAll([id]);

      dispatch({
        type: taskListDestroyActions.DESTROY_SUCCESS,
      });

      Message.success(
        i18n('entities.taskList.destroy.success'),
      );

      dispatch(listActions.doFetchCurrentFilter());

      getHistory().push('/task-list');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: taskListDestroyActions.DESTROY_ERROR,
      });
    }
  },

  doDestroyAll: (ids) => async (dispatch) => {
    try {
      dispatch({
        type: taskListDestroyActions.DESTROY_ALL_STARTED,
      });

      await TaskListService.destroyAll(ids);

      dispatch({
        type: taskListDestroyActions.DESTROY_ALL_SUCCESS,
      });

      if (listActions) {
        dispatch(listActions.doClearAllSelected());
        dispatch(listActions.doFetchCurrentFilter());
      }

      Message.success(
        i18n('entities.taskList.destroyAll.success'),
      );

      getHistory().push('/task-list');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: taskListDestroyActions.DESTROY_ALL_ERROR,
      });
    }
  },
};

export default taskListDestroyActions;
