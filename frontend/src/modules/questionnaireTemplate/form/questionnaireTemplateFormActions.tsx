import QuestionnaireTemplateService from 'src/modules/questionnaireTemplate/questionnaireTemplateService';
import Errors from 'src/modules/shared/error/errors';
import Message from 'src/view/shared/message';
import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';

const prefix = 'QUESTIONNAIRETEMPLATE_FORM';

const questionnaireTemplateFormActions = {
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
        type: questionnaireTemplateFormActions.INIT_STARTED,
      });

      let record = {};

      const isEdit = Boolean(id);

      if (isEdit) {
        record = await QuestionnaireTemplateService.find(
          id,
        );
      }

      dispatch({
        type: questionnaireTemplateFormActions.INIT_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: questionnaireTemplateFormActions.INIT_ERROR,
      });

      getHistory().push('/questionnaire-template');
    }
  },

  doCreate:
    (values, doRedirect = true, fnSuccess = null) =>
    async (dispatch) => {
      try {
        dispatch({
          type: questionnaireTemplateFormActions.CREATE_STARTED,
        });

        const record =
          await QuestionnaireTemplateService.create(values);

        dispatch({
          type: questionnaireTemplateFormActions.CREATE_SUCCESS,
        });

        Message.success(
          i18n(
            'entities.questionnaireTemplate.create.success',
          ),
        );

        fnSuccess && fnSuccess(record);

        doRedirect &&
          getHistory().push('/questionnaire-template');
      } catch (error) {
        Errors.handle(error);

        dispatch({
          type: questionnaireTemplateFormActions.CREATE_ERROR,
        });
      }
    },

  doUpdate:
    (id, values, doRedirect = true, fnSuccess = null) =>
    async (dispatch, getState) => {
      try {
        dispatch({
          type: questionnaireTemplateFormActions.UPDATE_STARTED,
        });

        await QuestionnaireTemplateService.update(
          id,
          values,
        );

        dispatch({
          type: questionnaireTemplateFormActions.UPDATE_SUCCESS,
        });

        Message.success(
          i18n(
            'entities.questionnaireTemplate.update.success',
          ),
        );

        fnSuccess && fnSuccess();

        doRedirect &&
          getHistory().push('/questionnaire-template');
      } catch (error) {
        Errors.handle(error);

        dispatch({
          type: questionnaireTemplateFormActions.UPDATE_ERROR,
        });
      }
    },
};

export default questionnaireTemplateFormActions;
