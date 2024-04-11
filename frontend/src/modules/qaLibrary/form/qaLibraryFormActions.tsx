import QALibraryService from 'src/modules/qaLibrary/qaLibraryService';
import Errors from 'src/modules/shared/error/errors';
import Message from 'src/view/shared/message';
import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';

const prefix = 'QALIBRARY_FORM';

const qaLibraryFormActions = {
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
        type: qaLibraryFormActions.INIT_STARTED,
      });

      let record = {};

      const isEdit = Boolean(id);

      if (isEdit) {
        record = await QALibraryService.find(id);
      }

      dispatch({
        type: qaLibraryFormActions.INIT_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: qaLibraryFormActions.INIT_ERROR,
      });

      getHistory().push('/qalibrary');
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: qaLibraryFormActions.CREATE_STARTED,
      });

      await QALibraryService.create(values);

      dispatch({
        type: qaLibraryFormActions.CREATE_SUCCESS,
      });

      Message.success(
        i18n('entities.qaLibrary.create.success'),
      );

      getHistory().push('/qalibrary');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: qaLibraryFormActions.CREATE_ERROR,
      });
    }
  },

  doUpdate: (id, values) => async (dispatch, getState) => {
    try {
      dispatch({
        type: qaLibraryFormActions.UPDATE_STARTED,
      });

      await QALibraryService.update(id, values);

      dispatch({
        type: qaLibraryFormActions.UPDATE_SUCCESS,
      });

      Message.success(
        i18n('entities.qaLibrary.update.success'),
      );

      getHistory().push('/qalibrary');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: qaLibraryFormActions.UPDATE_ERROR,
      });
    }
  },
};

export default qaLibraryFormActions;
