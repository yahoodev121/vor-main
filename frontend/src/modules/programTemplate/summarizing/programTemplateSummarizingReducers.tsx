import actions from 'src/modules/programTemplate/summarizing/programTemplateSummarizingActions';

const initialData = {
  loading: false,
  requirements: 0,
  controls: 0,
};

export default (state = initialData, { type, payload }) => {
  if (type === actions.FROM_REQUIREMENTS_STARTED) {
    return {
      ...state,
      loading: true,
      requirements: 0,
      controls: 0,
    };
  }

  if (type === actions.FROM_REQUIREMENTS_SUCCESS) {
    return {
      ...state,
      loading: false,
      requirements: payload.requirements,
      controls: payload.controls,
    };
  }

  if (type === actions.FROM_REQUIREMENTS_ERROR) {
    return {
      ...state,
      loading: false,
      requirements: 0,
      controls: 0,
    };
  }

  return state;
};
