import EmailTemplateService from 'src/modules/emailTemplate/emailTemplateService';
import Errors from 'src/modules/shared/error/errors';
import Message from 'src/view/shared/message';
import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';

const prefix = 'EMAILTEMPLATE_FORM';

const emailTemplateFormActions = {
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
        type: emailTemplateFormActions.INIT_STARTED,
      });

      let record = {};

      const isEdit = Boolean(id);

      if (isEdit) {
        record = await EmailTemplateService.find(id);
      }

      dispatch({
        type: emailTemplateFormActions.INIT_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: emailTemplateFormActions.INIT_ERROR,
      });

      getHistory().push('/email-template');
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: emailTemplateFormActions.CREATE_STARTED,
      });

      await EmailTemplateService.create(values);

      dispatch({
        type: emailTemplateFormActions.CREATE_SUCCESS,
      });

      Message.success(
        i18n('entities.emailTemplate.create.success'),
      );

      getHistory().push('/email-template');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: emailTemplateFormActions.CREATE_ERROR,
      });
    }
  },

  doUpdate: (id, values) => async (dispatch, getState) => {
    try {
      dispatch({
        type: emailTemplateFormActions.UPDATE_STARTED,
      });

      await EmailTemplateService.update(id, values);

      dispatch({
        type: emailTemplateFormActions.UPDATE_SUCCESS,
      });

      Message.success(
        i18n('entities.emailTemplate.update.success'),
      );

      getHistory().push('/email-template');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: emailTemplateFormActions.UPDATE_ERROR,
      });
    }
  },
};

export default emailTemplateFormActions;
