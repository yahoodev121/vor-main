import ClientService from 'src/modules/client/clientService';
import Errors from 'src/modules/shared/error/errors';
import Message from 'src/view/shared/message';
import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';

const prefix = 'CLIENT_FORM';

const clientFormActions = {
  INIT_STARTED: `${prefix}_INIT_STARTED`,
  INIT_SUCCESS: `${prefix}_INIT_SUCCESS`,
  INIT_ERROR: `${prefix}_INIT_ERROR`,

  CREATE_STARTED: `${prefix}_CREATE_STARTED`,
  CREATE_SUCCESS: `${prefix}_CREATE_SUCCESS`,
  CREATE_ERROR: `${prefix}_CREATE_ERROR`,

  UPDATE_STARTED: `${prefix}_UPDATE_STARTED`,
  UPDATE_SUCCESS: `${prefix}_UPDATE_SUCCESS`,
  UPDATE_ERROR: `${prefix}_UPDATE_ERROR`,

  doInit: (id) => async (dispatch) => {
    try {
      dispatch({
        type: clientFormActions.INIT_STARTED,
      });

      let record = {};

      const isEdit = Boolean(id);

      if (isEdit) {
        record = await ClientService.find(id);
      }

      dispatch({
        type: clientFormActions.INIT_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: clientFormActions.INIT_ERROR,
      });

      getHistory().push('/client');
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: clientFormActions.CREATE_STARTED,
      });

      await ClientService.create(values);

      dispatch({
        type: clientFormActions.CREATE_SUCCESS,
      });

      Message.success(
        i18n('entities.client.create.success'),
      );

      getHistory().push('/client');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: clientFormActions.CREATE_ERROR,
      });
    }
  },

  doUpdate: (id, values) => async (dispatch, getState) => {
    try {
      dispatch({
        type: clientFormActions.UPDATE_STARTED,
      });

      await ClientService.update(id, values);

      dispatch({
        type: clientFormActions.UPDATE_SUCCESS,
      });

      Message.success(
        i18n('entities.client.update.success'),
      );

      getHistory().push('/client');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: clientFormActions.UPDATE_ERROR,
      });
    }
  },
};

export default clientFormActions;
