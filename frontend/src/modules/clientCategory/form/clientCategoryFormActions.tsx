import ClientCategoryService from 'src/modules/clientCategory/clientCategoryService';
import Errors from 'src/modules/shared/error/errors';
import Message from 'src/view/shared/message';
import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';

const prefix = 'CLIENTCATEGORY_FORM';

const clientCategoryFormActions = {
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
        type: clientCategoryFormActions.INIT_STARTED,
      });

      let record = {};

      const isEdit = Boolean(id);

      if (isEdit) {
        record = await ClientCategoryService.find(id);
      }

      dispatch({
        type: clientCategoryFormActions.INIT_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: clientCategoryFormActions.INIT_ERROR,
      });

      getHistory().push('/client-category');
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: clientCategoryFormActions.CREATE_STARTED,
      });

      await ClientCategoryService.create(values);

      dispatch({
        type: clientCategoryFormActions.CREATE_SUCCESS,
      });

      Message.success(
        i18n('entities.clientCategory.create.success'),
      );

      getHistory().push('/client-category');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: clientCategoryFormActions.CREATE_ERROR,
      });
    }
  },

  doUpdate: (id, values) => async (dispatch, getState) => {
    try {
      dispatch({
        type: clientCategoryFormActions.UPDATE_STARTED,
      });

      await ClientCategoryService.update(id, values);

      dispatch({
        type: clientCategoryFormActions.UPDATE_SUCCESS,
      });

      Message.success(
        i18n('entities.clientCategory.update.success'),
      );

      getHistory().push('/client-category');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: clientCategoryFormActions.UPDATE_ERROR,
      });
    }
  },
};

export default clientCategoryFormActions;
