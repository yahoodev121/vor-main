import actions from 'src/modules/campaign/form/campaignFormActions';

const initialData = {
  previewEmailTemplateLoading: false,
  checkNameLoading: false,
  initLoading: false,
  saveLoading: false,
  sendLoading: false,
  record: null,
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

  if (type === actions.PREVIEW_EMAIL_TEMPLATE_STARTED) {
    return {
      ...state,
      previewEmailTemplateLoading: true,
    };
  }

  if (type === actions.PREVIEW_EMAIL_TEMPLATE_SUCCESS) {
    return {
      ...state,
      previewEmailTemplateLoading: false,
    };
  }

  if (type === actions.PREVIEW_EMAIL_TEMPLATE_ERROR) {
    return {
      ...state,
      previewEmailTemplateLoading: false,
    };
  }

  if (type === actions.CHECK_NAME_STARTED) {
    return {
      ...state,
      checkNameLoading: true,
    };
  }

  if (type === actions.CHECK_NAME_SUCCESS) {
    return {
      ...state,
      checkNameLoading: false,
    };
  }

  if (type === actions.CHECK_NAME_ERROR) {
    return {
      ...state,
      checkNameLoading: false,
    };
  }

  if (type === actions.CREATE_STARTED) {
    return {
      ...state,
      saveLoading: true,
    };
  }

  if (type === actions.CREATE_SUCCESS) {
    return {
      ...state,
      saveLoading: false,
    };
  }

  if (type === actions.CREATE_ERROR) {
    return {
      ...state,
      saveLoading: false,
    };
  }

  if (type === actions.UPDATE_STARTED) {
    return {
      ...state,
      saveLoading: true,
    };
  }

  if (type === actions.UPDATE_SUCCESS) {
    return {
      ...state,
      saveLoading: false,
    };
  }

  if (type === actions.UPDATE_ERROR) {
    return {
      ...state,
      saveLoading: false,
    };
  }

  if (type === actions.SEND_STARTED) {
    return {
      ...state,
      sendLoading: true,
    };
  }

  if (type === actions.SEND_SUCCESS) {
    return {
      ...state,
      sendLoading: false,
    };
  }

  if (type === actions.SEND_ERROR) {
    return {
      ...state,
      sendLoading: false,
    };
  }

  return state;
};
