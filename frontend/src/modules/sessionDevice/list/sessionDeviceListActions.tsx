import Errors from 'src/modules/shared/error/errors';
import selectors from 'src/modules/sessionDevice/list/sessionDeviceListSelectors';
import SessionDeviceService from 'src/modules/sessionDevice/sessionDeviceService';
import authSelectors from 'src/modules/auth/authSelectors';

const prefix = 'SESSION_DEVICE_LIST';

const sessionDeviceListActions = {
  FETCH_STARTED: `${prefix}_FETCH_STARTED`,
  FETCH_SUCCESS: `${prefix}_FETCH_SUCCESS`,
  FETCH_ERROR: `${prefix}_FETCH_ERROR`,

  TOGGLE_ONE_SELECTED: `${prefix}_TOGGLE_ONE_SELECTED`,
  TOGGLE_ALL_SELECTED: `${prefix}_TOGGLE_ALL_SELECTED`,
  CLEAR_ALL_SELECTED: `${prefix}_CLEAR_ALL_SELECTED`,

  doClearAllSelected() {
    return {
      type: sessionDeviceListActions.CLEAR_ALL_SELECTED,
    };
  },

  doToggleAllSelected() {
    return {
      type: sessionDeviceListActions.TOGGLE_ALL_SELECTED,
    };
  },

  doToggleOneSelected(id) {
    return {
      type: sessionDeviceListActions.TOGGLE_ONE_SELECTED,
      payload: id,
    };
  },

  doFetch:
    (userId = null) =>
    async (dispatch, getState) => {
      try {
        dispatch({
          type: sessionDeviceListActions.FETCH_STARTED,
        });

        const currentUser = authSelectors.selectCurrentUser(
          getState(),
        );

        const response = await SessionDeviceService.list(
          userId ?? currentUser.id,
        );

        dispatch({
          type: sessionDeviceListActions.FETCH_SUCCESS,
          payload: {
            active: response.active,
            rows: response.rows,
            count: response.count,
          },
        });
      } catch (error) {
        Errors.handle(error);

        dispatch({
          type: sessionDeviceListActions.FETCH_ERROR,
        });
      }
    },
};

export default sessionDeviceListActions;
