import listActions from 'src/modules/client/list/clientListActions';
import ClientService from 'src/modules/client/clientService';
import Errors from 'src/modules/shared/error/errors';
import { i18n } from 'src/i18n';
import { getHistory } from 'src/modules/store';
import Message from 'src/view/shared/message';

const prefix = 'CLIENT_DESTROY';

const clientDestroyActions = {
  DESTROY_STARTED: `${prefix}_DESTROY_STARTED`,
  DESTROY_SUCCESS: `${prefix}_DESTROY_SUCCESS`,
  DESTROY_ERROR: `${prefix}_DESTROY_ERROR`,

  DESTROY_ALL_STARTED: `${prefix}_DESTROY_ALL_STARTED`,
  DESTROY_ALL_SUCCESS: `${prefix}_DESTROY_ALL_SUCCESS`,
  DESTROY_ALL_ERROR: `${prefix}_DESTROY_ALL_ERROR`,

  doDestroy: (id) => async (dispatch) => {
    try {
      dispatch({
        type: clientDestroyActions.DESTROY_STARTED,
      });

      await ClientService.destroyAll([id]);

      dispatch({
        type: clientDestroyActions.DESTROY_SUCCESS,
      });

      Message.success(
        i18n('entities.client.destroy.success'),
      );

      dispatch(listActions.doFetchCurrentFilter());

      getHistory().push('/client');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: clientDestroyActions.DESTROY_ERROR,
      });
    }
  },

  doDestroyAll: (ids) => async (dispatch) => {
    try {
      dispatch({
        type: clientDestroyActions.DESTROY_ALL_STARTED,
      });

      await ClientService.destroyAll(ids);

      dispatch({
        type: clientDestroyActions.DESTROY_ALL_SUCCESS,
      });

      if (listActions) {
        dispatch(listActions.doClearAllSelected());
        dispatch(listActions.doFetchCurrentFilter());
      }

      Message.success(
        i18n('entities.client.destroyAll.success'),
      );

      getHistory().push('/client');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: clientDestroyActions.DESTROY_ALL_ERROR,
      });
    }
  },
};

export default clientDestroyActions;
