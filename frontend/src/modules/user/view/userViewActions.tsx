import { i18n } from 'src/i18n';
import Errors from 'src/modules/shared/error/errors';
import { getHistory } from 'src/modules/store';
import UserService from 'src/modules/user/userService';
import userGroupListActions from 'src/modules/userGroup/list/userGroupListActions';
import Message from 'src/view/shared/message';

const prefix = 'USER_VIEW';

const userViewActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: userViewActions.FIND_STARTED,
      });

      const user = await UserService.find(id);

      dispatch({
        type: userViewActions.FIND_SUCCESS,
        payload: user,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: userViewActions.FIND_ERROR,
      });

      getHistory().push('/user');
    }
  },

  doToggleGroup: (userId, groupId) => async (dispatch) => {
    try {
      await UserService.toggle(userId, groupId);

      dispatch(userGroupListActions.doFetchCurrentFilter());

      Message.success(
        i18n('entities.userGroup.toggle.success'),
      );
    } catch (error) {
      Errors.handle(error);
    }
  },

  doToggleGroups:
    (userId, groupIds, doAssign) => async (dispatch) => {
      try {
        await UserService.toggles(
          userId,
          groupIds,
          doAssign,
        );

        dispatch(
          userGroupListActions.doFetchCurrentFilter(),
        );

        Message.success(
          i18n('entities.userGroup.toggle.success'),
        );
      } catch (error) {
        Errors.handle(error);
      }
    },
};

export default userViewActions;
