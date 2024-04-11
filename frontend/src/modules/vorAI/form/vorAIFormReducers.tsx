import { i18n } from 'src/i18n';
import actions from 'src/modules/vorAI/form/vorAIFormActions';

const initialData = {
  responseFromAPIService: null,
  status: null,
  submitLoading: false,
};

export default (state = initialData, { type, payload }) => {
  if (type === actions.SUBMIT_STARTED) {
    return {
      ...state,
      submitLoading: true,
      responseFromAPIService: null,
      status: i18n('entities.vorAI.status.submit.started'),
    };
  }

  if (type === actions.SUBMIT_SUCCESS) {
    return {
      ...state,
      submitLoading: false,
      responseFromAPIService: payload,
      status: i18n('entities.vorAI.status.submit.success'),
    };
  }

  if (type === actions.SUBMIT_ERROR) {
    return {
      ...state,
      submitLoading: false,
      responseFromAPIService: null,
      status: i18n('entities.vorAI.status.submit.error'),
    };
  }

  if (type === actions.SUBMIT_STATUS) {
    return {
      ...state,
      status: payload,
    };
  }

  return state;
};
