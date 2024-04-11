import UserGroupService from 'src/modules/userGroup/userGroupService';
import Errors from 'src/modules/shared/error/errors';
import Message from 'src/view/shared/message';
import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';

const prefix = 'USERGROUP_FORM';

const userGroupFormActions = {
  INIT_STARTED: `${prefix}_INIT_STARTED`,
  INIT_SUCCESS: `${prefix}_INIT_SUCCESS`,
  INIT_ERROR: `${prefix}_INIT_ERROR`,

  CREATE_STARTED: `${prefix}_CREATE_STARTED`,
  CREATE_SUCCESS: `${prefix}_CREATE_SUCCESS`,
  CREATE_ERROR: `${prefix}_CREATE_ERROR`,

  UPDATE_STARTED: `${prefix}_UPDATE_STARTED`,
  UPDATE_SUCCESS: `${prefix}_UPDATE_SUCCESS`,
  UPDATE_ERROR: `${prefix}_UPDATE_ERROR`,

  TOGGLE_USER: `${prefix}_TOGGLE_USER`,
  TOGGLE_USERS: `${prefix}_TOGGLE_USERS`,

  doInit: (id?) => async (dispatch) => {
    try {
      dispatch({
        type: userGroupFormActions.INIT_STARTED,
      });

      let record = {};

      const isEdit = Boolean(id);

      if (isEdit) {
        record = await UserGroupService.find(id);
      }

      dispatch({
        type: userGroupFormActions.INIT_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: userGroupFormActions.INIT_ERROR,
      });

      getHistory().push('/user-group');
    }
  },

  doToggleUser: (id) => {
    return {
      type: userGroupFormActions.TOGGLE_USER,
      payload: id,
    };
  },

  doToggleUsers: (doSelect, ids) => {
    return {
      type: userGroupFormActions.TOGGLE_USERS,
      payload: {
        doSelect: doSelect,
        users: ids,
      },
    };
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: userGroupFormActions.CREATE_STARTED,
      });

      await UserGroupService.create(values);

      dispatch({
        type: userGroupFormActions.CREATE_SUCCESS,
      });

      Message.success(
        i18n('entities.userGroup.create.success'),
      );

      getHistory().push('/user-group');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: userGroupFormActions.CREATE_ERROR,
      });
    }
  },

  doUpdate: (id, values) => async (dispatch, getState) => {
    try {
      dispatch({
        type: userGroupFormActions.UPDATE_STARTED,
      });

      await UserGroupService.update(id, values);

      dispatch({
        type: userGroupFormActions.UPDATE_SUCCESS,
      });

      Message.success(
        i18n('entities.userGroup.update.success'),
      );

      getHistory().push('/user-group');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: userGroupFormActions.UPDATE_ERROR,
      });
    }
  },
};

export default userGroupFormActions;
