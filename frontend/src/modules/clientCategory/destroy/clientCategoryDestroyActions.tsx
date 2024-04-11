import listActions from 'src/modules/clientCategory/list/clientCategoryListActions';
import ClientCategoryService from 'src/modules/clientCategory/clientCategoryService';
import Errors from 'src/modules/shared/error/errors';
import { i18n } from 'src/i18n';
import { getHistory } from 'src/modules/store';
import Message from 'src/view/shared/message';

const prefix = 'CLIENTCATEGORY_DESTROY';

const clientCategoryDestroyActions = {
  DESTROY_STARTED: `${prefix}_DESTROY_STARTED`,
  DESTROY_SUCCESS: `${prefix}_DESTROY_SUCCESS`,
  DESTROY_ERROR: `${prefix}_DESTROY_ERROR`,

  DESTROY_ALL_STARTED: `${prefix}_DESTROY_ALL_STARTED`,
  DESTROY_ALL_SUCCESS: `${prefix}_DESTROY_ALL_SUCCESS`,
  DESTROY_ALL_ERROR: `${prefix}_DESTROY_ALL_ERROR`,

  doDestroy: (id) => async (dispatch) => {
    try {
      dispatch({
        type: clientCategoryDestroyActions.DESTROY_STARTED,
      });

      await ClientCategoryService.destroyAll([id]);

      dispatch({
        type: clientCategoryDestroyActions.DESTROY_SUCCESS,
      });

      Message.success(
        i18n('entities.clientCategory.destroy.success'),
      );

      dispatch(listActions.doFetchCurrentFilter());

      getHistory().push('/client-category');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: clientCategoryDestroyActions.DESTROY_ERROR,
      });
    }
  },

  doDestroyAll: (ids) => async (dispatch) => {
    try {
      dispatch({
        type: clientCategoryDestroyActions.DESTROY_ALL_STARTED,
      });

      await ClientCategoryService.destroyAll(ids);

      dispatch({
        type: clientCategoryDestroyActions.DESTROY_ALL_SUCCESS,
      });

      if (listActions) {
        dispatch(listActions.doClearAllSelected());
        dispatch(listActions.doFetchCurrentFilter());
      }

      Message.success(
        i18n('entities.clientCategory.destroyAll.success'),
      );

      getHistory().push('/client-category');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: clientCategoryDestroyActions.DESTROY_ALL_ERROR,
      });
    }
  },
};

export default clientCategoryDestroyActions;
