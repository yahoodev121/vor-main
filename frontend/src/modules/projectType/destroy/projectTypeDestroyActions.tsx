import listActions from 'src/modules/projectType/list/projectTypeListActions';
import ProjectTypeService from 'src/modules/projectType/projectTypeService';
import Errors from 'src/modules/shared/error/errors';
import { i18n } from 'src/i18n';
import { getHistory } from 'src/modules/store';
import Message from 'src/view/shared/message';

const prefix = 'PROJECTTYPE_DESTROY';

const projectTypeDestroyActions = {
  DESTROY_STARTED: `${prefix}_DESTROY_STARTED`,
  DESTROY_SUCCESS: `${prefix}_DESTROY_SUCCESS`,
  DESTROY_ERROR: `${prefix}_DESTROY_ERROR`,

  DESTROY_ALL_STARTED: `${prefix}_DESTROY_ALL_STARTED`,
  DESTROY_ALL_SUCCESS: `${prefix}_DESTROY_ALL_SUCCESS`,
  DESTROY_ALL_ERROR: `${prefix}_DESTROY_ALL_ERROR`,

  doDestroy: (id) => async (dispatch) => {
    try {
      dispatch({
        type: projectTypeDestroyActions.DESTROY_STARTED,
      });

      await ProjectTypeService.destroyAll([id]);

      dispatch({
        type: projectTypeDestroyActions.DESTROY_SUCCESS,
      });

      Message.success(
        i18n('entities.projectType.destroy.success'),
      );

      dispatch(listActions.doFetchCurrentFilter());

      getHistory().push('/project-type');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: projectTypeDestroyActions.DESTROY_ERROR,
      });
    }
  },

  doDestroyAll: (ids) => async (dispatch) => {
    try {
      dispatch({
        type: projectTypeDestroyActions.DESTROY_ALL_STARTED,
      });

      await ProjectTypeService.destroyAll(ids);

      dispatch({
        type: projectTypeDestroyActions.DESTROY_ALL_SUCCESS,
      });

      if (listActions) {
        dispatch(listActions.doClearAllSelected());
        dispatch(listActions.doFetchCurrentFilter());
      }

      Message.success(
        i18n('entities.projectType.destroyAll.success'),
      );

      getHistory().push('/project-type');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: projectTypeDestroyActions.DESTROY_ALL_ERROR,
      });
    }
  },
};

export default projectTypeDestroyActions;
