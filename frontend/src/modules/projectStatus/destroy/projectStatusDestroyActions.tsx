import listActions from 'src/modules/projectStatus/list/projectStatusListActions';
import ProjectStatusService from 'src/modules/projectStatus/projectStatusService';
import Errors from 'src/modules/shared/error/errors';
import { i18n } from 'src/i18n';
import { getHistory } from 'src/modules/store';
import Message from 'src/view/shared/message';

const prefix = 'PROJECTSTATUS_DESTROY';

const projectStatusDestroyActions = {
  DESTROY_STARTED: `${prefix}_DESTROY_STARTED`,
  DESTROY_SUCCESS: `${prefix}_DESTROY_SUCCESS`,
  DESTROY_ERROR: `${prefix}_DESTROY_ERROR`,

  DESTROY_ALL_STARTED: `${prefix}_DESTROY_ALL_STARTED`,
  DESTROY_ALL_SUCCESS: `${prefix}_DESTROY_ALL_SUCCESS`,
  DESTROY_ALL_ERROR: `${prefix}_DESTROY_ALL_ERROR`,

  doDestroy: (id) => async (dispatch) => {
    try {
      dispatch({
        type: projectStatusDestroyActions.DESTROY_STARTED,
      });

      await ProjectStatusService.destroyAll([id]);

      dispatch({
        type: projectStatusDestroyActions.DESTROY_SUCCESS,
      });

      Message.success(
        i18n('entities.projectStatus.destroy.success'),
      );

      dispatch(listActions.doFetchCurrentFilter());

      getHistory().push('/project-status');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: projectStatusDestroyActions.DESTROY_ERROR,
      });
    }
  },

  doDestroyAll: (ids) => async (dispatch) => {
    try {
      dispatch({
        type: projectStatusDestroyActions.DESTROY_ALL_STARTED,
      });

      await ProjectStatusService.destroyAll(ids);

      dispatch({
        type: projectStatusDestroyActions.DESTROY_ALL_SUCCESS,
      });

      if (listActions) {
        dispatch(listActions.doClearAllSelected());
        dispatch(listActions.doFetchCurrentFilter());
      }

      Message.success(
        i18n('entities.projectStatus.destroyAll.success'),
      );

      getHistory().push('/project-status');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: projectStatusDestroyActions.DESTROY_ALL_ERROR,
      });
    }
  },
};

export default projectStatusDestroyActions;
