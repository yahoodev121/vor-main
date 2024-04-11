import ClientCategoryService from 'src/modules/clientCategory/clientCategoryService';
import Errors from 'src/modules/shared/error/errors';
import { getHistory } from 'src/modules/store';

const prefix = 'CLIENTCATEGORY_VIEW';

const clientCategoryViewActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: clientCategoryViewActions.FIND_STARTED,
      });

      const record = await ClientCategoryService.find(id);

      dispatch({
        type: clientCategoryViewActions.FIND_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: clientCategoryViewActions.FIND_ERROR,
      });

      getHistory().push('/client-category');
    }
  },
};

export default clientCategoryViewActions;
