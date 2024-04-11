import actions from 'src/modules/task/countByUser/taskCountByUserActions';

const initialData = {
  loading: false,
  record: null,
};

export default (state = initialData, { type, payload }) => {
  if (type === actions.FETCH_STARTED) {
    return {
      ...state,
      record: null,
      loading: true,
    };
  }

  if (type === actions.FETCH_SUCCESS) {
    return {
      ...state,
      record: payload,
      loading: false,
    };
  }

  if (type === actions.FETCH_ERROR) {
    return {
      ...state,
      record: null,
      loading: false,
    };
  }

  return state;
};
