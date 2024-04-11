import listActions from 'src/modules/emailTemplate/list/emailTemplateListActions';
import EmailTemplateService from 'src/modules/emailTemplate/emailTemplateService';
import Errors from 'src/modules/shared/error/errors';
import { i18n } from 'src/i18n';
import { getHistory } from 'src/modules/store';
import Message from 'src/view/shared/message';

const prefix = 'EMAILTEMPLATE_DESTROY';

const emailTemplateDestroyActions = {
  DESTROY_STARTED: `${prefix}_DESTROY_STARTED`,
  DESTROY_SUCCESS: `${prefix}_DESTROY_SUCCESS`,
  DESTROY_ERROR: `${prefix}_DESTROY_ERROR`,

  DESTROY_ALL_STARTED: `${prefix}_DESTROY_ALL_STARTED`,
  DESTROY_ALL_SUCCESS: `${prefix}_DESTROY_ALL_SUCCESS`,
  DESTROY_ALL_ERROR: `${prefix}_DESTROY_ALL_ERROR`,

  doDestroy: (id) => async (dispatch) => {
    try {
      dispatch({
        type: emailTemplateDestroyActions.DESTROY_STARTED,
      });

      await EmailTemplateService.destroyAll([id]);

      dispatch({
        type: emailTemplateDestroyActions.DESTROY_SUCCESS,
      });

      Message.success(
        i18n('entities.emailTemplate.destroy.success'),
      );

      dispatch(listActions.doFetchCurrentFilter());

      getHistory().push('/email-template');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: emailTemplateDestroyActions.DESTROY_ERROR,
      });
    }
  },

  doDestroyAll: (ids) => async (dispatch) => {
    try {
      dispatch({
        type: emailTemplateDestroyActions.DESTROY_ALL_STARTED,
      });

      await EmailTemplateService.destroyAll(ids);

      dispatch({
        type: emailTemplateDestroyActions.DESTROY_ALL_SUCCESS,
      });

      if (listActions) {
        dispatch(listActions.doClearAllSelected());
        dispatch(listActions.doFetchCurrentFilter());
      }

      Message.success(
        i18n('entities.emailTemplate.destroyAll.success'),
      );

      getHistory().push('/email-template');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: emailTemplateDestroyActions.DESTROY_ALL_ERROR,
      });
    }
  },
};

export default emailTemplateDestroyActions;
