import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';
import Errors from 'src/modules/shared/error/errors';
import Message from 'src/view/shared/message';
import ProgramRequirementTemplateService from 'src/modules/programRequirementTemplate/programRequirementTemplateService';

const prefix = 'PROGRAMREQUIREMENTTEMPLATE_FORM';

const programRequirementTemplateFormActions = {
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
        type: programRequirementTemplateFormActions.INIT_STARTED,
      });

      let record = {};

      const isEdit = Boolean(id);

      if (isEdit) {
        record =
          await ProgramRequirementTemplateService.find(id);
      }

      dispatch({
        type: programRequirementTemplateFormActions.INIT_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: programRequirementTemplateFormActions.INIT_ERROR,
      });

      getHistory().push('/program-requirement-template');
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: programRequirementTemplateFormActions.CREATE_STARTED,
      });

      await ProgramRequirementTemplateService.create(
        values,
      );

      dispatch({
        type: programRequirementTemplateFormActions.CREATE_SUCCESS,
      });

      Message.success(
        i18n(
          'entities.programRequirementTemplate.create.success',
        ),
      );

      getHistory().push('/program-requirement-template');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: programRequirementTemplateFormActions.CREATE_ERROR,
      });
    }
  },

  doUpdate: (id, values) => async (dispatch, getState) => {
    try {
      dispatch({
        type: programRequirementTemplateFormActions.UPDATE_STARTED,
      });

      await ProgramRequirementTemplateService.update(
        id,
        values,
      );

      dispatch({
        type: programRequirementTemplateFormActions.UPDATE_SUCCESS,
      });

      Message.success(
        i18n(
          'entities.programRequirementTemplate.update.success',
        ),
      );

      getHistory().push('/program-requirement-template');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: programRequirementTemplateFormActions.UPDATE_ERROR,
      });
    }
  },
};

export default programRequirementTemplateFormActions;
