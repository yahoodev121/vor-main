import actions from 'src/modules/user/role/userRoleActions';

const initialData = {
  saveLoading: false,
  summary: {},
  summaryLoading: false,
  usersLoading: false,
  users: {
    assigned: [],
    unassigned: [],
  },
};

export default (state = initialData, { type, payload }) => {
  if (type === actions.SUMMARY_STARTED) {
    return {
      ...state,
      summary: {},
      summaryLoading: true,
    };
  }

  if (type === actions.SUMMARY_SUCCESS) {
    return {
      ...state,
      summary: payload,
      summaryLoading: false,
    };
  }

  if (type === actions.SUMMARY_ERROR) {
    return {
      ...state,
      summary: {},
      summaryLoading: false,
    };
  }

  if (type === actions.LOAD_STARTED) {
    return {
      ...state,
      users: {
        assigned: [],
        unassigned: [],
      },
      usersLoading: true,
    };
  }

  if (type === actions.LOAD_SUCCESS) {
    return {
      ...state,
      users: payload,
      usersLoading: false,
    };
  }

  if (type === actions.LOAD_ERROR) {
    return {
      ...state,
      users: {
        assigned: [],
        unassigned: [],
      },
      usersLoading: false,
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

  return state;
};
