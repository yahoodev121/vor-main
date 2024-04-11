import actions from 'src/modules/programControl/view/programControlViewActions';

const initialData = {
  loading: false,
  record: null,
};

export default (state = initialData, { type, payload }) => {
  if (type === actions.FIND_STARTED) {
    return {
      ...state,
      record: null,
      loading: true,
    };
  }

  if (type === actions.FIND_SUCCESS) {
    return {
      ...state,
      record: payload,
      loading: false,
    };
  }

  if (type === actions.FIND_ERROR) {
    return {
      ...state,
      record: null,
      loading: false,
    };
  }

  if (type === actions.ADD_TASKS_STARTED) {
    return {
      ...state,
      record: null,
      loading: true,
    };
  }

  if (type === actions.ADD_TASKS_SUCCESS) {
    return {
      ...state,
      record: payload,
      loading: false,
    };
  }

  if (type === actions.ADD_TASKS_ERROR) {
    return {
      ...state,
      record: null,
      loading: false,
    };
  }

  return state;
};
