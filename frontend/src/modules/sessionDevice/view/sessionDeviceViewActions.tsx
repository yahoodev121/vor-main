import Errors from 'src/modules/shared/error/errors';
import SessionDeviceService from 'src/modules/sessionDevice/sessionDeviceService';

const prefix = 'SESSION_DEVICE_VIEW';

const sessionDeviceViewActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: sessionDeviceViewActions.FIND_STARTED,
      });

      const record = await SessionDeviceService.find(id);

      dispatch({
        type: sessionDeviceViewActions.FIND_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: sessionDeviceViewActions.FIND_ERROR,
      });
    }
  },
};

export default sessionDeviceViewActions;
