import { i18n } from 'src/i18n';
import actions from 'src/modules/vorAI/setting/vorAISettingActions';

const initialData = {
  responseFromAPIService: null,
  status: null,
  record: null,
  initLoading: false,
  saveLoading: false,
  submitLoading: false,
};

export default (state = initialData, { type, payload }) => {
  if (type === actions.INIT_STARTED) {
    return {
      ...state,
      record: null,
      initLoading: true,
    };
  }

  if (type === actions.INIT_SUCCESS) {
    return {
      ...state,
      record: payload,
      initLoading: false,
    };
  }

  if (type === actions.INIT_ERROR) {
    return {
      ...state,
      record: null,
      initLoading: false,
    };
  }

  if (type === actions.SAVE_STARTED) {
    return {
      ...state,
      saveLoading: true,
    };
  }

  if (type === actions.SAVE_SUCCESS) {
    return {
      ...state,
      saveLoading: false,
    };
  }

  if (type === actions.SAVE_ERROR) {
    return {
      ...state,
      saveLoading: false,
    };
  }

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

  if (type === actions.UPLOAD_STARTED) {
    return {
      ...state,
      submitLoading: true,
      status: i18n('entities.vorAI.status.submit.started'),
    };
  }

  if (type === actions.UPLOAD_SUCCESS) {
    return {
      ...state,
      submitLoading: false,
      status: i18n('entities.vorAI.status.submit.success'),
    };
  }

  if (type === actions.UPLOAD_ERROR) {
    return {
      ...state,
      submitLoading: false,
      status: i18n('entities.vorAI.status.submit.error'),
    };
  }

  if (type === actions.STATUS_STARTED) {
    return {
      ...state,
      submitLoading: true,
      status: i18n('entities.vorAI.status.submit.started'),
    };
  }

  if (type === actions.STATUS_SUCCESS) {
    return {
      ...state,
      submitLoading: false,
      status: i18n('entities.vorAI.status.submit.success'),
    };
  }

  if (type === actions.STATUS_ERROR) {
    return {
      ...state,
      submitLoading: false,
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
