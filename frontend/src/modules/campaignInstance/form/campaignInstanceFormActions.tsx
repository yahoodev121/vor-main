import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';
import CampaignInstanceService from 'src/modules/campaignInstance/campaignInstanceService';
import Errors from 'src/modules/shared/error/errors';
import Message from 'src/view/shared/message';

const prefix = 'CAMPAIGNINSTANCE_FORM';

const campaignInstanceFormActions = {
  INIT_STARTED: `${prefix}_INIT_STARTED`,
  INIT_SUCCESS: `${prefix}_INIT_SUCCESS`,
  INIT_ERROR: `${prefix}_INIT_ERROR`,

  CREATE_STARTED: `${prefix}_CREATE_STARTED`,
  CREATE_SUCCESS: `${prefix}_CREATE_SUCCESS`,
  CREATE_ERROR: `${prefix}_CREATE_ERROR`,

  UPDATE_STARTED: `${prefix}_UPDATE_STARTED`,
  UPDATE_SUCCESS: `${prefix}_UPDATE_SUCCESS`,
  UPDATE_ERROR: `${prefix}_UPDATE_ERROR`,

  SUBMIT_STARTED: `${prefix}_SUBMIT_STARTED`,
  SUBMIT_SUCCESS: `${prefix}_SUBMIT_SUCCESS`,
  SUBMIT_ERROR: `${prefix}_SUBMIT_ERROR`,

  doInit: (id) => async (dispatch) => {
    try {
      dispatch({
        type: campaignInstanceFormActions.INIT_STARTED,
      });

      let record = {};

      const isEdit = Boolean(id);

      if (isEdit) {
        record = await CampaignInstanceService.find(id);
      }

      dispatch({
        type: campaignInstanceFormActions.INIT_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: campaignInstanceFormActions.INIT_ERROR,
      });

      getHistory().push('/campaign-instance');
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: campaignInstanceFormActions.CREATE_STARTED,
      });

      await CampaignInstanceService.create(values);

      dispatch({
        type: campaignInstanceFormActions.CREATE_SUCCESS,
      });

      Message.success(
        i18n('entities.campaignInstance.create.success'),
      );

      getHistory().push('/campaign-instance');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: campaignInstanceFormActions.CREATE_ERROR,
      });
    }
  },

  doUpdate:
    (id, values, doReturnToList = true) =>
    async (dispatch, getState) => {
      try {
        dispatch({
          type: campaignInstanceFormActions.UPDATE_STARTED,
        });

        await CampaignInstanceService.update(id, values);

        dispatch({
          type: campaignInstanceFormActions.UPDATE_SUCCESS,
        });

        Message.success(
          i18n('entities.campaignInstance.update.success'),
        );

        if (doReturnToList) {
          getHistory().push('/campaign-instance');
        }
      } catch (error) {
        Errors.handle(error);

        dispatch({
          type: campaignInstanceFormActions.UPDATE_ERROR,
        });
      }
    },

  doSubmit: (id, values) => async (dispatch, getState) => {
    try {
      dispatch({
        type: campaignInstanceFormActions.SUBMIT_STARTED,
      });

      await CampaignInstanceService.submit(id, values);

      dispatch({
        type: campaignInstanceFormActions.SUBMIT_SUCCESS,
      });

      Message.success(
        i18n('entities.campaignInstance.submit.success'),
      );

      getHistory().push('/campaign-instance');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: campaignInstanceFormActions.SUBMIT_ERROR,
      });
    }
  },
};

export default campaignInstanceFormActions;
