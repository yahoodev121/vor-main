import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';
import Errors from 'src/modules/shared/error/errors';
import Message from 'src/view/shared/message';
import ProgramControlTemplateService from 'src/modules/programControlTemplate/programControlTemplateService';

const prefix = 'PROGRAMCONTROLTEMPLATE_FORM';

const programControlTemplateFormActions = {
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
        type: programControlTemplateFormActions.INIT_STARTED,
      });

      let record = {};

      const isEdit = Boolean(id);

      if (isEdit) {
        record = await ProgramControlTemplateService.find(
          id,
        );
      }

      dispatch({
        type: programControlTemplateFormActions.INIT_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: programControlTemplateFormActions.INIT_ERROR,
      });

      getHistory().push('/program-control-template');
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: programControlTemplateFormActions.CREATE_STARTED,
      });

      await ProgramControlTemplateService.create(values);

      dispatch({
        type: programControlTemplateFormActions.CREATE_SUCCESS,
      });

      Message.success(
        i18n(
          'entities.programControlTemplate.create.success',
        ),
      );

      getHistory().push('/program-control-template');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: programControlTemplateFormActions.CREATE_ERROR,
      });
    }
  },

  doUpdate: (id, values) => async (dispatch, getState) => {
    try {
      dispatch({
        type: programControlTemplateFormActions.UPDATE_STARTED,
      });

      await ProgramControlTemplateService.update(
        id,
        values,
      );

      dispatch({
        type: programControlTemplateFormActions.UPDATE_SUCCESS,
      });

      Message.success(
        i18n(
          'entities.programControlTemplate.update.success',
        ),
      );

      getHistory().push('/program-control-template');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: programControlTemplateFormActions.UPDATE_ERROR,
      });
    }
  },
};

export default programControlTemplateFormActions;
