import actions from 'src/modules/campaignInstance/form/campaignInstanceFormActions';

const initialData = {
  initLoading: false,
  saveLoading: false,
  submitLoading: false,
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

  if (type === actions.SUBMIT_STARTED) {
    return {
      ...state,
      submitLoading: true,
    };
  }

  if (type === actions.SUBMIT_SUCCESS) {
    return {
      ...state,
      submitLoading: false,
    };
  }

  if (type === actions.SUBMIT_ERROR) {
    return {
      ...state,
      submitLoading: false,
    };
  }

  return state;
};
