import { i18n } from 'src/i18n';
import Errors from 'src/modules/shared/error/errors';
import vorAIEnumerators from 'src/modules/vorAI/vorAIEnumerators';
import VORAIService from 'src/modules/vorAI/vorAIService';
import Message from 'src/view/shared/message';

const prefix = 'VORAI_SETTING';

const vorAISettingActions = {
  INIT_STARTED: `${prefix}_INIT_STARTED`,
  INIT_SUCCESS: `${prefix}_INIT_SUCCESS`,
  INIT_ERROR: `${prefix}_INIT_ERROR`,

  SUBMIT_STARTED: `${prefix}_SUBMIT_STARTED`,
  SUBMIT_SUCCESS: `${prefix}_SUBMIT_SUCCESS`,
  SUBMIT_ERROR: `${prefix}_SUBMIT_ERROR`,

  UPLOAD_STARTED: `${prefix}_UPLOAD_STARTED`,
  UPLOAD_SUCCESS: `${prefix}_UPLOAD_SUCCESS`,
  UPLOAD_ERROR: `${prefix}_UPLOAD_ERROR`,

  STATUS_STARTED: `${prefix}_STATUS_STARTED`,
  STATUS_SUCCESS: `${prefix}_STATUS_SUCCESS`,
  STATUS_ERROR: `${prefix}_STATUS_ERROR`,

  SAVE_STARTED: `${prefix}_SAVE_STARTED`,
  SAVE_SUCCESS: `${prefix}_SAVE_SUCCESS`,
  SAVE_ERROR: `${prefix}_SAVE_ERROR`,

  SUBMIT_STATUS: `${prefix}_SUBMIT_STATUS`,

  doInit: () => async (dispatch) => {
    try {
      dispatch({
        type: vorAISettingActions.INIT_STARTED,
      });

      const record = await VORAIService.find();

      dispatch({
        type: vorAISettingActions.INIT_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: vorAISettingActions.INIT_ERROR,
      });
    }
  },

  doUploadAndTrain: (values) => async (dispatch) => {
    try {
      dispatch({
        type: vorAISettingActions.UPLOAD_STARTED,
      });

      const {
        apiBearerToken,
        attachments,
        engine: model,
      } = values;

      let trainingFiles = null;

      if (attachments) {
        dispatch({
          type: vorAISettingActions.SUBMIT_STATUS,
          payload: i18n(
            'entities.vorAI.status.submit.files',
          ),
        });

        trainingFiles = await VORAIService.files(
          apiBearerToken,
          attachments,
        );
      }

      let fineTunedModels = null;

      if (trainingFiles && !!trainingFiles.length) {
        dispatch({
          type: vorAISettingActions.SUBMIT_STATUS,
          payload: i18n(
            'entities.vorAI.status.submit.fineTunes',
          ),
        });

        fineTunedModels = await VORAIService.fineTunes(
          apiBearerToken,
          trainingFiles,
          vorAIEnumerators.baseModels[model],
        );
      }

      dispatch({
        type: vorAISettingActions.UPLOAD_SUCCESS,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: vorAISettingActions.UPLOAD_ERROR,
      });
    }
  },

  doStatus: (values) => async (dispatch) => {
    try {
      dispatch({
        type: vorAISettingActions.STATUS_STARTED,
      });

      const { apiBearerToken } = values;

      dispatch({
        type: vorAISettingActions.SUBMIT_STATUS,
        payload: i18n(
          'entities.vorAI.status.submit.status',
        ),
      });

      const payload = await VORAIService.status(
        apiBearerToken,
      );

      dispatch({
        type: vorAISettingActions.STATUS_SUCCESS,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: vorAISettingActions.STATUS_ERROR,
      });
    }
  },

  doSubmit: (values) => async (dispatch) => {
    try {
      dispatch({
        type: vorAISettingActions.SUBMIT_STARTED,
      });

      dispatch({
        type: vorAISettingActions.SUBMIT_STATUS,
        payload: i18n(
          'entities.vorAI.status.submit.completions',
        ),
      });

      const payload = await VORAIService.completionsOnConfigurator(
        values,
      );

      dispatch({
        type: vorAISettingActions.SUBMIT_SUCCESS,
        payload,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: vorAISettingActions.SUBMIT_ERROR,
      });
    }
  },

  doSave: (values) => async (dispatch) => {
    try {
      dispatch({
        type: vorAISettingActions.SAVE_STARTED,
      });

      await VORAIService.save(
        values,
      );

      dispatch({
        type: vorAISettingActions.SAVE_SUCCESS,
      });

      Message.success(i18n('settings.athena.save.success'));
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: vorAISettingActions.SAVE_ERROR,
      });
    }
  },
};

export default vorAISettingActions;
