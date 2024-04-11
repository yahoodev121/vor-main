import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';
import authActions from 'src/modules/auth/authActions';
import authSelectors from 'src/modules/auth/authSelectors';
import Errors from 'src/modules/shared/error/errors';
import Message from 'src/view/shared/message';
import userListActions from 'src/modules/user/list/userListActions';
import UserService from 'src/modules/user/userService';

const prefix = 'USER_FORM';

const userFormActions = {
  INIT_STARTED: `${prefix}_INIT_STARTED`,
  INIT_SUCCESS: `${prefix}_INIT_SUCCESS`,
  INIT_ERROR: `${prefix}_INIT_ERROR`,

  ADD_STARTED: `${prefix}_ADD_STARTED`,
  ADD_SUCCESS: `${prefix}_ADD_SUCCESS`,
  ADD_ERROR: `${prefix}_ADD_ERROR`,

  UPDATE_STARTED: `${prefix}_UPDATE_STARTED`,
  UPDATE_SUCCESS: `${prefix}_UPDATE_SUCCESS`,
  UPDATE_ERROR: `${prefix}_UPDATE_ERROR`,

  ACTIVATE_STARTED: `${prefix}_ACTIVATE_STARTED`,
  ACTIVATE_SUCCESS: `${prefix}_ACTIVATE_SUCCESS`,
  ACTIVATE_ERROR: `${prefix}_ACTIVATE_ERROR`,

  DEACTIVATE_STARTED: `${prefix}_DEACTIVATE_STARTED`,
  DEACTIVATE_SUCCESS: `${prefix}_DEACTIVATE_SUCCESS`,
  DEACTIVATE_ERROR: `${prefix}_DEACTIVATE_ERROR`,

  DESTROY_STARTED: `${prefix}_DESTROY_STARTED`,
  DESTROY_SUCCESS: `${prefix}_DESTROY_SUCCESS`,
  DESTROY_ERROR: `${prefix}_DESTROY_ERROR`,

  doInit: (id?) => async (dispatch) => {
    try {
      dispatch({
        type: userFormActions.INIT_STARTED,
      });

      const isEdit = Boolean(id);
      let record = {};

      if (isEdit) {
        record = await UserService.find(id);
      }

      dispatch({
        type: userFormActions.INIT_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: userFormActions.INIT_ERROR,
      });

      getHistory().push('/user');
    }
  },

  doAdd: (values) => async (dispatch) => {
    try {
      dispatch({
        type: userFormActions.ADD_STARTED,
      });

      await UserService.create(values);

      dispatch({
        type: userFormActions.ADD_SUCCESS,
      });

      Message.success(i18n('user.doAddSuccess'));

      getHistory().push('/user');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: userFormActions.ADD_ERROR,
      });
    }
  },

  doUpdate:
    (values, doRedirect = true, fnSuccess = null) =>
    async (dispatch, getState) => {
      try {
        dispatch({
          type: userFormActions.UPDATE_STARTED,
        });

        await UserService.edit(values);

        dispatch({
          type: userFormActions.UPDATE_SUCCESS,
        });

        const currentUser = authSelectors.selectCurrentUser(
          getState(),
        );

        if (currentUser.id === values.id) {
          await dispatch(
            authActions.doRefreshCurrentUser(),
          );
        }

        Message.success(i18n('user.doUpdateSuccess'));

        fnSuccess && fnSuccess();

        doRedirect && getHistory().push('/user');
      } catch (error) {
        Errors.handle(error);

        dispatch({
          type: userFormActions.UPDATE_ERROR,
        });
      }
    },

  doActivate:
    (id, fnSuccess = null) =>
    async (dispatch, getState) => {
      try {
        dispatch({
          type: userFormActions.ACTIVATE_STARTED,
        });

        await UserService.activate([id]);

        dispatch({
          type: userFormActions.ACTIVATE_SUCCESS,
        });

        fnSuccess && fnSuccess();

        Message.success(i18n('user.doActivateSuccess'));
      } catch (error) {
        Errors.handle(error);

        dispatch({
          type: userFormActions.ACTIVATE_ERROR,
        });
      }
    },

  doDeactivate:
    (id, fnSuccess = null) =>
    async (dispatch, getState) => {
      try {
        dispatch({
          type: userFormActions.DEACTIVATE_STARTED,
        });

        await UserService.deactivate([id]);

        dispatch({
          type: userFormActions.DEACTIVATE_SUCCESS,
        });

        const currentUser = authSelectors.selectCurrentUser(
          getState(),
        );

        if (currentUser.id === id) {
          await dispatch(
            authActions.doRefreshCurrentUser(),
          );
        } else {
          fnSuccess && fnSuccess();
        }

        Message.success(i18n('user.doDeactivateSuccess'));
      } catch (error) {
        Errors.handle(error);

        dispatch({
          type: userFormActions.DEACTIVATE_ERROR,
        });
      }
    },

  doDestroy: (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: userFormActions.DESTROY_STARTED,
      });

      await UserService.destroy([id]);

      const currentUser = authSelectors.selectCurrentUser(
        getState(),
      );

      if (currentUser.id === id) {
        await dispatch(authActions.doRefreshCurrentUser());
      }

      Message.success(i18n('user.doDestroySuccess'));

      dispatch({
        type: userFormActions.DESTROY_SUCCESS,
      });

      getHistory().push('/user');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: userFormActions.DESTROY_ERROR,
      });
    }
  },
};

export default userFormActions;
