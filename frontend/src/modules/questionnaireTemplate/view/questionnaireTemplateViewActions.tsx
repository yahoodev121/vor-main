import QuestionnaireTemplateService from 'src/modules/questionnaireTemplate/questionnaireTemplateService';
import Errors from 'src/modules/shared/error/errors';
import { getHistory } from 'src/modules/store';

const prefix = 'QUESTIONNAIRETEMPLATE_VIEW';

const questionnaireTemplateViewActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind:
    (id, fnSuccess = null) =>
    async (dispatch) => {
      try {
        dispatch({
          type: questionnaireTemplateViewActions.FIND_STARTED,
        });

        const record =
          await QuestionnaireTemplateService.find(id);

        dispatch({
          type: questionnaireTemplateViewActions.FIND_SUCCESS,
          payload: record,
        });

        fnSuccess && fnSuccess(record);
      } catch (error) {
        Errors.handle(error);

        dispatch({
          type: questionnaireTemplateViewActions.FIND_ERROR,
        });

        getHistory().push('/questionnaire-template');
      }
    },
};

export default questionnaireTemplateViewActions;
