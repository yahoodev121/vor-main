import { getHistory } from 'src/modules/store';
import Errors from 'src/modules/shared/error/errors';
import RoleService from 'src/modules/user/roleService';
import { i18n } from 'src/i18n';
import Message from 'src/view/shared/message';

const prefix = 'USER_ROLE';

const userRoleActions = {
  SUMMARY_STARTED: `${prefix}_SUMMARY_STARTED`,
  SUMMARY_SUCCESS: `${prefix}_SUMMARY_SUCCESS`,
  SUMMARY_ERROR: `${prefix}_SUMMARY_ERROR`,

  LOAD_STARTED: `${prefix}_LOAD_STARTED`,
  LOAD_SUCCESS: `${prefix}_LOAD_SUCCESS`,
  LOAD_ERROR: `${prefix}_LOAD_ERROR`,

  SAVE_STARTED: `${prefix}_SAVE_STARTED`,
  SAVE_SUCCESS: `${prefix}_SAVE_SUCCESS`,
  SAVE_ERROR: `${prefix}_SAVE_ERROR`,

  doSummary: () => async (dispatch) => {
    try {
      dispatch({
        type: userRoleActions.SUMMARY_STARTED,
      });

      const payload = await RoleService.loadSummary();

      dispatch({
        type: userRoleActions.SUMMARY_SUCCESS,
        payload,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: userRoleActions.SUMMARY_ERROR,
      });

      getHistory().push('/user');
    }
  },

  doLoadUsersByRole: (role) => async (dispatch) => {
    try {
      dispatch({
        type: userRoleActions.LOAD_STARTED,
      });

      const assigned = await RoleService.usersWithRole(
        role,
      );
      const unassigned = await RoleService.usersWithoutRole(
        role,
      );

      dispatch({
        type: userRoleActions.LOAD_SUCCESS,
        payload: {
          assigned,
          unassigned,
        },
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: userRoleActions.LOAD_ERROR,
      });

      getHistory().push('/user');
    }
  },

  doAddRole: (users, role) => async (dispatch) => {
    try {
      dispatch({
        type: userRoleActions.SAVE_STARTED,
      });

      await RoleService.addRole(users, role);

      dispatch({
        type: userRoleActions.SAVE_SUCCESS,
      });

      Message.success(
        i18n(
          'role.doAddRoleSuccess',
          i18n(`roles.${role}.label`),
        ),
      );

      dispatch(userRoleActions.doSummary());
      dispatch(userRoleActions.doLoadUsersByRole(role));
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: userRoleActions.SAVE_ERROR,
      });

      getHistory().push('/user');
    }
  },

  doRemoveRole: (users, role) => async (dispatch) => {
    try {
      dispatch({
        type: userRoleActions.SAVE_STARTED,
      });

      await RoleService.removeRole(users, role);

      dispatch({
        type: userRoleActions.SAVE_SUCCESS,
      });

      Message.success(
        i18n(
          'role.doRemoveRoleSuccess',
          i18n(`roles.${role}.label`),
        ),
      );

      dispatch(userRoleActions.doSummary());
      dispatch(userRoleActions.doLoadUsersByRole(role));
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: userRoleActions.SAVE_ERROR,
      });

      getHistory().push('/user');
    }
  },
};

export default userRoleActions;
