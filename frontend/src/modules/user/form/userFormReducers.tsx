import actions from 'src/modules/user/form/userFormActions';

const initialData = {
  initLoading: false,
  saveLoading: false,
  destroyLoading: false,
  user: null,
};

export default (state = initialData, { type, payload }) => {
  if (type === actions.INIT_STARTED) {
    return {
      ...state,
      user: null,
      initLoading: true,
    };
  }

  if (type === actions.INIT_SUCCESS) {
    return {
      ...state,
      user: payload,
      initLoading: false,
    };
  }

  if (type === actions.INIT_ERROR) {
    return {
      ...state,
      user: null,
      initLoading: false,
    };
  }

  if (type === actions.ADD_STARTED) {
    return {
      ...state,
      saveLoading: true,
    };
  }

  if (type === actions.ADD_SUCCESS) {
    return {
      ...state,
      saveLoading: false,
    };
  }

  if (type === actions.ADD_ERROR) {
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

  if (type === actions.ACTIVATE_STARTED) {
    return {
      ...state,
      saveLoading: true,
    };
  }

  if (type === actions.ACTIVATE_SUCCESS) {
    return {
      ...state,
      saveLoading: false,
    };
  }

  if (type === actions.ACTIVATE_ERROR) {
    return {
      ...state,
      saveLoading: false,
    };
  }

  if (type === actions.DEACTIVATE_STARTED) {
    return {
      ...state,
      saveLoading: true,
    };
  }

  if (type === actions.DEACTIVATE_SUCCESS) {
    return {
      ...state,
      saveLoading: false,
    };
  }

  if (type === actions.DEACTIVATE_ERROR) {
    return {
      ...state,
      saveLoading: false,
    };
  }

  if (type === actions.DESTROY_STARTED) {
    return {
      ...state,
      destroyLoading: true,
    };
  }

  if (type === actions.DESTROY_SUCCESS) {
    return {
      ...state,
      destroyLoading: false,
    };
  }

  if (type === actions.DESTROY_ERROR) {
    return {
      ...state,
      destroyLoading: false,
    };
  }

  return state;
};
