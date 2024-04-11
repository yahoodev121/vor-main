import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';
import Errors from 'src/modules/shared/error/errors';
import Message from 'src/view/shared/message';
import ProgramRequirementService from 'src/modules/programRequirement/programRequirementService';

const prefix = 'PROGRAMREQUIREMENT_FORM';

const programRequirementFormActions = {
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
        type: programRequirementFormActions.INIT_STARTED,
      });

      let record = {};

      const isEdit = Boolean(id);

      if (isEdit) {
        record = await ProgramRequirementService.find(id);
      }

      dispatch({
        type: programRequirementFormActions.INIT_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: programRequirementFormActions.INIT_ERROR,
      });

      getHistory().push('/program-requirement');
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: programRequirementFormActions.CREATE_STARTED,
      });

      await ProgramRequirementService.create(values);

      dispatch({
        type: programRequirementFormActions.CREATE_SUCCESS,
      });

      Message.success(
        i18n('entities.programRequirement.create.success'),
      );

      getHistory().push('/program-requirement');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: programRequirementFormActions.CREATE_ERROR,
      });
    }
  },

  doUpdate: (id, values) => async (dispatch, getState) => {
    try {
      dispatch({
        type: programRequirementFormActions.UPDATE_STARTED,
      });

      await ProgramRequirementService.update(id, values);

      dispatch({
        type: programRequirementFormActions.UPDATE_SUCCESS,
      });

      Message.success(
        i18n('entities.programRequirement.update.success'),
      );

      getHistory().push('/program-requirement');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: programRequirementFormActions.UPDATE_ERROR,
      });
    }
  },
};

export default programRequirementFormActions;
