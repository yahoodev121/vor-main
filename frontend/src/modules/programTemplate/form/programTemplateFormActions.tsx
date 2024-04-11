import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';
import Errors from 'src/modules/shared/error/errors';
import Message from 'src/view/shared/message';
import ProgramTemplateService from 'src/modules/programTemplate/programTemplateService';

const prefix = 'PROGRAMTEMPLATE_FORM';

const programTemplateFormActions = {
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
        type: programTemplateFormActions.INIT_STARTED,
      });

      let record = {};

      const isEdit = Boolean(id);

      if (isEdit) {
        record = await ProgramTemplateService.find(id);
      }

      dispatch({
        type: programTemplateFormActions.INIT_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: programTemplateFormActions.INIT_ERROR,
      });

      getHistory().push('/program-template');
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: programTemplateFormActions.CREATE_STARTED,
      });

      await ProgramTemplateService.create(values);

      dispatch({
        type: programTemplateFormActions.CREATE_SUCCESS,
      });

      Message.success(
        i18n('entities.programTemplate.create.success'),
      );

      getHistory().push('/program-template');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: programTemplateFormActions.CREATE_ERROR,
      });
    }
  },

  doUpdate: (id, values) => async (dispatch, getState) => {
    try {
      dispatch({
        type: programTemplateFormActions.UPDATE_STARTED,
      });

      await ProgramTemplateService.update(id, values);

      dispatch({
        type: programTemplateFormActions.UPDATE_SUCCESS,
      });

      Message.success(
        i18n('entities.programTemplate.update.success'),
      );

      getHistory().push('/program-template');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: programTemplateFormActions.UPDATE_ERROR,
      });
    }
  },
};

export default programTemplateFormActions;
