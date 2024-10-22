import listActions from 'src/modules/projectPriority/list/projectPriorityListActions';
import ProjectPriorityService from 'src/modules/projectPriority/projectPriorityService';
import Errors from 'src/modules/shared/error/errors';
import { i18n } from 'src/i18n';
import { getHistory } from 'src/modules/store';
import Message from 'src/view/shared/message';

const prefix = 'PROJECTPRIORITY_DESTROY';

const projectPriorityDestroyActions = {
  DESTROY_STARTED: `${prefix}_DESTROY_STARTED`,
  DESTROY_SUCCESS: `${prefix}_DESTROY_SUCCESS`,
  DESTROY_ERROR: `${prefix}_DESTROY_ERROR`,

  DESTROY_ALL_STARTED: `${prefix}_DESTROY_ALL_STARTED`,
  DESTROY_ALL_SUCCESS: `${prefix}_DESTROY_ALL_SUCCESS`,
  DESTROY_ALL_ERROR: `${prefix}_DESTROY_ALL_ERROR`,

  doDestroy: (id) => async (dispatch) => {
    try {
      dispatch({
        type: projectPriorityDestroyActions.DESTROY_STARTED,
      });

      await ProjectPriorityService.destroyAll([id]);

      dispatch({
        type: projectPriorityDestroyActions.DESTROY_SUCCESS,
      });

      Message.success(
        i18n('entities.projectPriority.destroy.success'),
      );

      dispatch(listActions.doFetchCurrentFilter());

      getHistory().push('/project-priority');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: projectPriorityDestroyActions.DESTROY_ERROR,
      });
    }
  },

  doDestroyAll: (ids) => async (dispatch) => {
    try {
      dispatch({
        type: projectPriorityDestroyActions.DESTROY_ALL_STARTED,
      });

      await ProjectPriorityService.destroyAll(ids);

      dispatch({
        type: projectPriorityDestroyActions.DESTROY_ALL_SUCCESS,
      });

      if (listActions) {
        dispatch(listActions.doClearAllSelected());
        dispatch(listActions.doFetchCurrentFilter());
      }

      Message.success(
        i18n('entities.projectPriority.destroyAll.success'),
      );

      getHistory().push('/project-priority');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: projectPriorityDestroyActions.DESTROY_ALL_ERROR,
      });
    }
  },
};

export default projectPriorityDestroyActions;
