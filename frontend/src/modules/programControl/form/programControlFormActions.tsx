import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';
import Errors from 'src/modules/shared/error/errors';
import Message from 'src/view/shared/message';
import ProgramControlService from 'src/modules/programControl/programControlService';

const prefix = 'PROGRAMCONTROL_FORM';

const programControlFormActions = {
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
        type: programControlFormActions.INIT_STARTED,
      });

      let record = {};

      const isEdit = Boolean(id);

      if (isEdit) {
        record = await ProgramControlService.find(id);
      }

      dispatch({
        type: programControlFormActions.INIT_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: programControlFormActions.INIT_ERROR,
      });

      getHistory().push('/program-control');
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: programControlFormActions.CREATE_STARTED,
      });

      await ProgramControlService.create(values);

      dispatch({
        type: programControlFormActions.CREATE_SUCCESS,
      });

      Message.success(
        i18n('entities.programControl.create.success'),
      );

      getHistory().push('/program-control');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: programControlFormActions.CREATE_ERROR,
      });
    }
  },

  doUpdate: (id, values) => async (dispatch, getState) => {
    try {
      dispatch({
        type: programControlFormActions.UPDATE_STARTED,
      });

      await ProgramControlService.update(id, values);

      dispatch({
        type: programControlFormActions.UPDATE_SUCCESS,
      });

      Message.success(
        i18n('entities.programControl.update.success'),
      );

      getHistory().push('/program-control');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: programControlFormActions.UPDATE_ERROR,
      });
    }
  },
};

export default programControlFormActions;
