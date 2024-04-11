import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';
import Errors from 'src/modules/shared/error/errors';
import Message from 'src/view/shared/message';
import ProgramService from 'src/modules/program/programService';

const prefix = 'PROGRAM_FORM';

const programFormActions = {
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
        type: programFormActions.INIT_STARTED,
      });

      let record = {};

      const isEdit = Boolean(id);

      if (isEdit) {
        record = await ProgramService.find(id);
      }

      dispatch({
        type: programFormActions.INIT_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: programFormActions.INIT_ERROR,
      });

      getHistory().push('/program');
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: programFormActions.CREATE_STARTED,
      });

      await ProgramService.create(values);

      dispatch({
        type: programFormActions.CREATE_SUCCESS,
      });

      Message.success(
        i18n('entities.program.create.success'),
      );

      getHistory().push('/program');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: programFormActions.CREATE_ERROR,
      });
    }
  },

  doUpdate: (id, values) => async (dispatch, getState) => {
    try {
      dispatch({
        type: programFormActions.UPDATE_STARTED,
      });

      await ProgramService.update(id, values);

      dispatch({
        type: programFormActions.UPDATE_SUCCESS,
      });

      Message.success(
        i18n('entities.program.update.success'),
      );

      getHistory().push('/program');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: programFormActions.UPDATE_ERROR,
      });
    }
  },
};

export default programFormActions;
