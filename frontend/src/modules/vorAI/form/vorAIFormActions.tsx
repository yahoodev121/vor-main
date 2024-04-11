import { i18n } from 'src/i18n';
import Errors from 'src/modules/shared/error/errors';
import vorAIEnumerators from 'src/modules/vorAI/vorAIEnumerators';
import VORAIService from 'src/modules/vorAI/vorAIService';

const prefix = 'VORAI_FORM';

const vorAIFormActions = {
  SUBMIT_STARTED: `${prefix}_SUBMIT_STARTED`,
  SUBMIT_SUCCESS: `${prefix}_SUBMIT_SUCCESS`,
  SUBMIT_ERROR: `${prefix}_SUBMIT_ERROR`,

  SUBMIT_STATUS: `${prefix}_SUBMIT_STATUS`,

  doUploadAndTrain: (values) => async (dispatch) => {
    try {
      dispatch({
        type: vorAIFormActions.SUBMIT_STARTED,
      });

      const {
        apiBearerToken,
        attachments,
        engine: model,
      } = values;

      let trainingFiles = null;

      if (attachments) {
        dispatch({
          type: vorAIFormActions.SUBMIT_STATUS,
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
          type: vorAIFormActions.SUBMIT_STATUS,
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
        type: vorAIFormActions.SUBMIT_SUCCESS,
        payload: fineTunedModels,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: vorAIFormActions.SUBMIT_ERROR,
      });
    }
  },

  doStatus: (values) => async (dispatch) => {
    try {
      dispatch({
        type: vorAIFormActions.SUBMIT_STARTED,
      });

      const { apiBearerToken } = values;

      dispatch({
        type: vorAIFormActions.SUBMIT_STATUS,
        payload: i18n(
          'entities.vorAI.status.submit.status',
        ),
      });

      const payload = await VORAIService.status(
        apiBearerToken,
      );

      dispatch({
        type: vorAIFormActions.SUBMIT_SUCCESS,
        payload,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: vorAIFormActions.SUBMIT_ERROR,
      });
    }
  },

  doSubmit: (values) => async (dispatch) => {
    try {
      dispatch({
        type: vorAIFormActions.SUBMIT_STARTED,
      });

      dispatch({
        type: vorAIFormActions.SUBMIT_STATUS,
        payload: i18n(
          'entities.vorAI.status.submit.completions',
        ),
      });

      const payload = await VORAIService.completions(
        {
          ...values, prompt: `${values.prompt}

          ${values.promptFileText && values.promptFileText}
        `
        },
      );

      dispatch({
        type: vorAIFormActions.SUBMIT_SUCCESS,
        payload,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: vorAIFormActions.SUBMIT_ERROR,
      });
    }
  },
  doSubmitExtraction: (values) => async (dispatch) => {
    try {
      dispatch({
        type: vorAIFormActions.SUBMIT_STARTED,
      });

      dispatch({
        type: vorAIFormActions.SUBMIT_STATUS,
        payload: i18n(
          'entities.vorAI.status.submit.submitExtractions',
        ),
      });

      const payload = await VORAIService.submitExtractions(
        {
          ...values, prompt: `${values.prompt}

          ${values.promptFileText && values.promptFileText}
        `},
      );

      dispatch({
        type: vorAIFormActions.SUBMIT_SUCCESS,
        payload,
      });

    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: vorAIFormActions.SUBMIT_ERROR,
      });
    }
  },
};

export default vorAIFormActions;
