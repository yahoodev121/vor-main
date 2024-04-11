import actions from 'src/modules/highlight/quick/highlightQuickActions';

const initialData = {
  initLoading: false,
  saveLoading: false,
  highlights: null,
};

export default (state = initialData, { type, payload }) => {
  if (type === actions.INIT_STARTED) {
    return {
      ...state,
      highlights: null,
      initLoading: true,
    };
  }

  if (type === actions.INIT_SUCCESS) {
    return {
      ...state,
      highlights: payload,
      initLoading: false,
    };
  }

  if (type === actions.INIT_ERROR) {
    return {
      ...state,
      highlights: null,
      initLoading: false,
    };
  }

  if (type === actions.QUICK_STARTED) {
    return {
      ...state,
      saveLoading: true,
    };
  }

  if (type === actions.QUICK_SUCCESS) {
    return {
      ...state,
      saveLoading: false,
    };
  }

  if (type === actions.QUICK_ERROR) {
    return {
      ...state,
      saveLoading: false,
    };
  }

  if (type === actions.NEW_QUICK_HIGHLIGHT) {
    return {
      ...state,
      highlights: {
        rows: [payload, ...state.highlights?.rows],
        count: (state.highlights?.count ?? 0) + 1,
      },
    };
  }

  if (type === actions.DELETE_QUICK_HIGHLIGHT) {
    const length = state.highlights?.count ?? 0;
    return {
      ...state,
      highlights: {
        rows: [
          ...state.highlights?.rows.slice(0, payload),
          ...state.highlights?.rows.slice(payload + 1),
        ],
        count: length ? length - 1 : 0,
      },
    };
  }

  return state;
};
