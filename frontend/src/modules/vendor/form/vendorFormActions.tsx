import VendorService from 'src/modules/vendor/vendorService';
import Errors from 'src/modules/shared/error/errors';
import Message from 'src/view/shared/message';
import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';

const prefix = 'VENDOR_FORM';

const vendorFormActions = {
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
        type: vendorFormActions.INIT_STARTED,
      });

      let record = {};

      const isEdit = Boolean(id);

      if (isEdit) {
        record = await VendorService.find(id);
      }

      dispatch({
        type: vendorFormActions.INIT_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: vendorFormActions.INIT_ERROR,
      });

      getHistory().push('/vendor');
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: vendorFormActions.CREATE_STARTED,
      });

      await VendorService.create(values);

      dispatch({
        type: vendorFormActions.CREATE_SUCCESS,
      });

      Message.success(
        i18n('entities.vendor.create.success'),
      );

      getHistory().push('/vendor');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: vendorFormActions.CREATE_ERROR,
      });
    }
  },

  doUpdate: (id, values) => async (dispatch, getState) => {
    try {
      dispatch({
        type: vendorFormActions.UPDATE_STARTED,
      });

      await VendorService.update(id, values);

      dispatch({
        type: vendorFormActions.UPDATE_SUCCESS,
      });

      Message.success(
        i18n('entities.vendor.update.success'),
      );

      getHistory().push('/vendor');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: vendorFormActions.UPDATE_ERROR,
      });
    }
  },
};

export default vendorFormActions;
