import actions from 'src/modules/userGroup/form/userGroupFormActions';

const initialData = {
  initLoading: false,
  saveLoading: false,
  record: null,
  users: [],
};

export default (state = initialData, { type, payload }) => {
  if (type === actions.INIT_STARTED) {
    return {
      ...state,
      record: null,
      users: [],
      initLoading: true,
    };
  }

  if (type === actions.INIT_SUCCESS) {
    return {
      ...state,
      record: payload,
      users: payload.users || [],
      initLoading: false,
    };
  }

  if (type === actions.INIT_ERROR) {
    return {
      ...state,
      record: null,
      users: [],
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

  if (type === actions.TOGGLE_USER) {
    const users = state.users?.includes(payload)
      ? state.users?.filter((user) => user !== payload)
      : [...state.users, payload];
    return {
      ...state,
      users: users,
    };
  }

  if (type === actions.TOGGLE_USERS) {
    const users = payload.doSelect
      ? [...state.users, ...payload.users]
      : state.users?.filter(
          (user) => !payload.users.includes(user),
        );
    return {
      ...state,
      users: users,
    };
  }

  return state;
};
