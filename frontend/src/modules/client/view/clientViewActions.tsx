import ClientService from 'src/modules/client/clientService';
import Errors from 'src/modules/shared/error/errors';
import { getHistory } from 'src/modules/store';

const prefix = 'CLIENT_VIEW';

const clientViewActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: clientViewActions.FIND_STARTED,
      });

      const record = await ClientService.find(id);

      dispatch({
        type: clientViewActions.FIND_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: clientViewActions.FIND_ERROR,
      });

      getHistory().push('/client');
    }
  },
};

export default clientViewActions;
