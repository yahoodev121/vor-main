import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';
import Errors from 'src/modules/shared/error/errors';
import listActions from 'src/modules/task/list/taskListActions';
import Message from 'src/view/shared/message';
import programControlListActions from 'src/modules/programControl/list/programControlListActions';
import TaskService from 'src/modules/task/taskService';

const prefix = 'TASK_DESTROY';

const taskDestroyActions = {
  DESTROY_STARTED: `${prefix}_DESTROY_STARTED`,
  DESTROY_SUCCESS: `${prefix}_DESTROY_SUCCESS`,
  DESTROY_ERROR: `${prefix}_DESTROY_ERROR`,

  DESTROY_ALL_STARTED: `${prefix}_DESTROY_ALL_STARTED`,
  DESTROY_ALL_SUCCESS: `${prefix}_DESTROY_ALL_SUCCESS`,
  DESTROY_ALL_ERROR: `${prefix}_DESTROY_ALL_ERROR`,

  doDestroy:
    (id, redirect = true) =>
    async (dispatch) => {
      try {
        dispatch({
          type: taskDestroyActions.DESTROY_STARTED,
        });

        await TaskService.destroyAll([id]);

        dispatch({
          type: taskDestroyActions.DESTROY_SUCCESS,
        });

        Message.success(
          i18n('entities.task.destroy.success'),
        );

        dispatch(listActions.doFetchCurrentFilter());
        dispatch(
          programControlListActions.doFetchCurrentFilter(),
        );

        if (redirect) {
          getHistory().push('/task');
        }
      } catch (error) {
        Errors.handle(error);

        dispatch(listActions.doFetchCurrentFilter());
        dispatch(
          programControlListActions.doFetchCurrentFilter(),
        );

        dispatch({
          type: taskDestroyActions.DESTROY_ERROR,
        });
      }
    },

  doDestroyAll:
    (ids, redirect = true) =>
    async (dispatch) => {
      try {
        dispatch({
          type: taskDestroyActions.DESTROY_ALL_STARTED,
        });

        await TaskService.destroyAll(ids);

        dispatch({
          type: taskDestroyActions.DESTROY_ALL_SUCCESS,
        });

        if (listActions) {
          dispatch(listActions.doClearAllSelected());
          dispatch(listActions.doFetchCurrentFilter());
        }
        dispatch(
          programControlListActions.doFetchCurrentFilter(),
        );

        Message.success(
          i18n('entities.task.destroyAll.success'),
        );

        if (redirect) {
          getHistory().push('/task');
        }
      } catch (error) {
        Errors.handle(error);

        dispatch(listActions.doFetchCurrentFilter());
        dispatch(
          programControlListActions.doFetchCurrentFilter(),
        );

        dispatch({
          type: taskDestroyActions.DESTROY_ALL_ERROR,
        });
      }
    },
};

export default taskDestroyActions;
