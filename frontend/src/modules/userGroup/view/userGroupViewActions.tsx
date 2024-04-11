import UserGroupService from 'src/modules/userGroup/userGroupService';
import Errors from 'src/modules/shared/error/errors';
import { getHistory } from 'src/modules/store';
import Message from 'src/view/shared/message';
import { i18n } from 'src/i18n';
import userListActions from 'src/modules/user/list/userListActions';

const prefix = 'USERGROUP_VIEW';

const userGroupViewActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: userGroupViewActions.FIND_STARTED,
      });

      const record = await UserGroupService.find(id);

      dispatch({
        type: userGroupViewActions.FIND_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: userGroupViewActions.FIND_ERROR,
      });

      getHistory().push('/user-group');
    }
  },

  doToggleUser: (groupId, userId) => async (dispatch) => {
    try {
      await UserGroupService.toggle(groupId, userId);

      dispatch(userListActions.doFetchCurrentFilter());

      Message.success(
        i18n('entities.userGroup.toggle.success'),
      );
    } catch (error) {
      Errors.handle(error);
    }
  },

  doToggleUsers:
    (groupId, userIds, doAssign) => async (dispatch) => {
      try {
        await UserGroupService.toggles(
          groupId,
          userIds,
          doAssign,
        );

        dispatch(userListActions.doFetchCurrentFilter());

        Message.success(
          i18n('entities.userGroup.toggle.success'),
        );
      } catch (error) {
        Errors.handle(error);
      }
    },
};

export default userGroupViewActions;
