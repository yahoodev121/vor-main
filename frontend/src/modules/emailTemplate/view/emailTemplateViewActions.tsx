import EmailTemplateService from 'src/modules/emailTemplate/emailTemplateService';
import Errors from 'src/modules/shared/error/errors';
import { getHistory } from 'src/modules/store';

const prefix = 'EMAILTEMPLATE_VIEW';

const emailTemplateViewActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind:
    (id, fnSuccess = null) =>
    async (dispatch) => {
      try {
        dispatch({
          type: emailTemplateViewActions.FIND_STARTED,
        });

        const record = await EmailTemplateService.find(id);

        dispatch({
          type: emailTemplateViewActions.FIND_SUCCESS,
          payload: record,
        });

        fnSuccess && fnSuccess(record);
      } catch (error) {
        Errors.handle(error);

        dispatch({
          type: emailTemplateViewActions.FIND_ERROR,
        });

        getHistory().push('/email-template');
      }
    },
};

export default emailTemplateViewActions;
