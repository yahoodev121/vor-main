import listActions from 'src/modules/userGroup/list/userGroupListActions';
import UserGroupService from 'src/modules/userGroup/userGroupService';
import Errors from 'src/modules/shared/error/errors';
import { i18n } from 'src/i18n';
import { getHistory } from 'src/modules/store';
import Message from 'src/view/shared/message';

const prefix = 'USERGROUP_DESTROY';

const userGroupDestroyActions = {
  DESTROY_STARTED: `${prefix}_DESTROY_STARTED`,
  DESTROY_SUCCESS: `${prefix}_DESTROY_SUCCESS`,
  DESTROY_ERROR: `${prefix}_DESTROY_ERROR`,

  DESTROY_ALL_STARTED: `${prefix}_DESTROY_ALL_STARTED`,
  DESTROY_ALL_SUCCESS: `${prefix}_DESTROY_ALL_SUCCESS`,
  DESTROY_ALL_ERROR: `${prefix}_DESTROY_ALL_ERROR`,

  doDestroy: (id) => async (dispatch) => {
    try {
      dispatch({
        type: userGroupDestroyActions.DESTROY_STARTED,
      });

      await UserGroupService.destroyAll([id]);

      dispatch({
        type: userGroupDestroyActions.DESTROY_SUCCESS,
      });

      Message.success(
        i18n('entities.userGroup.destroy.success'),
      );

      dispatch(listActions.doFetchCurrentFilter());

      getHistory().push('/user-group');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: userGroupDestroyActions.DESTROY_ERROR,
      });
    }
  },

  doDestroyAll: (ids) => async (dispatch) => {
    try {
      dispatch({
        type: userGroupDestroyActions.DESTROY_ALL_STARTED,
      });

      await UserGroupService.destroyAll(ids);

      dispatch({
        type: userGroupDestroyActions.DESTROY_ALL_SUCCESS,
      });

      if (listActions) {
        dispatch(listActions.doClearAllSelected());
        dispatch(listActions.doFetchCurrentFilter());
      }

      Message.success(
        i18n('entities.userGroup.destroyAll.success'),
      );

      getHistory().push('/user-group');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: userGroupDestroyActions.DESTROY_ALL_ERROR,
      });
    }
  },
};

export default userGroupDestroyActions;
