import { AuthToken } from 'src/modules/auth/authToken';
import actions from 'src/modules/auth/authActions';
import AuthCurrentTenant from 'src/modules/auth/authCurrentTenant';

const initialData = {
  impersonatedUsers: [],
  currentUser: null,
  currentTenant: null,
  currentAnswerData: null,
  loadingInit: true,
  loadingAnswer: false,
  loadingAnswerData: false,
  loadingEmailConfirmation: false,
  loadingPasswordResetEmail: false,
  loadingPasswordChange: false,
  loadingVerifyEmail: false,
  loadingPasswordReset: false,
  loadingUpdateProfile: false,
  loading: false,
  errorMessage: null,
  errorMessageVerifyEmail: null,
  promptKeepAlive: false,
};

export default (state = initialData, { type, payload }) => {
  if (type === actions.IMPERSONATE_START) {
    return {
      ...state,
      impersonatedUsers: [
        ...state.impersonatedUsers,
        {
          token: AuthToken.get(),
          currentUser: state.currentUser,
        },
      ],
    };
  }

  if (type === actions.IMPERSONATE_SUCCESS) {
    return {
      ...state,
      currentUser: payload.currentUser || null,
      currentTenant:
        AuthCurrentTenant.selectAndSaveOnStorageFor(
          payload.currentUser,
        ),
    };
  }

  if (type === actions.IMPERSONATE_ERROR) {
    return {
      ...state,
      impersonatedUsers: [
        ...state.impersonatedUsers.slice(
          0,
          state.impersonatedUsers.length - 1,
        ),
      ],
    };
  }

  if (type === actions.ERROR_MESSAGE_CLEARED) {
    return {
      ...state,
      errorMessage: null,
    };
  }

  if (type === actions.CURRENT_USER_REFRESH_SUCCESS) {
    return {
      ...state,
      currentUser: payload.currentUser || null,
      currentTenant:
        AuthCurrentTenant.selectAndSaveOnStorageFor(
          payload.currentUser,
        ),
    };
  }

  if (type === actions.CURRENT_USER_REFRESH_ERROR) {
    return {
      ...state,
      currentUser: null,
      currentTenant:
        AuthCurrentTenant.selectAndSaveOnStorageFor(null),
    };
  }

  if (type === actions.AUTH_ANSWER_DATA_START) {
    return {
      ...state,
      loadingAnswerData: true,
    };
  }

  if (type === actions.AUTH_ANSWER_DATA_SUCCESS) {
    return {
      ...state,
      loadingAnswerData: false,
      currentAnswerData: payload,
    };
  }

  if (type === actions.AUTH_ANSWER_DATA_ERROR) {
    return {
      ...state,
      loadingAnswerData: false,
      currentAnswerData: null,
    };
  }

  if (type === actions.AUTH_ANSWER_START) {
    return {
      ...state,
      loadingAnswer: true,
    };
  }

  if (type === actions.AUTH_ANSWER_SUCCESS) {
    return {
      ...state,
      loadingAnswer: false,
      currentTenant: payload,
    };
  }

  if (type === actions.AUTH_ANSWER_ERROR) {
    return {
      ...state,
      loadingAnswer: false,
    };
  }

  if (type === actions.AUTH_START) {
    return {
      ...state,
      impersonatedUsers: [],
      errorMessage: null,
      loading: true,
    };
  }

  if (type === actions.AUTH_SUCCESS) {
    return {
      ...state,
      currentUser: payload.currentUser || null,
      currentTenant:
        AuthCurrentTenant.selectAndSaveOnStorageFor(
          payload.currentUser,
        ),
      errorMessage: null,
      loading: false,
    };
  }

  if (type === actions.AUTH_ERROR) {
    return {
      ...state,
      currentUser: null,
      currentTenant: null,
      errorMessage: payload || null,
      loading: false,
    };
  }

  if (type === actions.EMAIL_CONFIRMATION_START) {
    return {
      ...state,
      loadingEmailConfirmation: true,
    };
  }

  if (type === actions.EMAIL_CONFIRMATION_SUCCESS) {
    return {
      ...state,
      loadingEmailConfirmation: false,
    };
  }

  if (type === actions.EMAIL_CONFIRMATION_ERROR) {
    return {
      ...state,
      loadingEmailConfirmation: false,
    };
  }

  if (type === actions.PASSWORD_RESET_EMAIL_START) {
    return {
      ...state,
      loadingPasswordResetEmail: true,
    };
  }

  if (type === actions.PASSWORD_RESET_EMAIL_SUCCESS) {
    return {
      ...state,
      loadingPasswordResetEmail: false,
    };
  }

  if (type === actions.PASSWORD_RESET_EMAIL_ERROR) {
    return {
      ...state,
      loadingPasswordResetEmail: false,
    };
  }

  if (type === actions.UPDATE_PROFILE_START) {
    return {
      ...state,
      loadingUpdateProfile: true,
    };
  }

  if (type === actions.UPDATE_PROFILE_SUCCESS) {
    return {
      ...state,
      loadingUpdateProfile: false,
    };
  }

  if (type === actions.UPDATE_PROFILE_ERROR) {
    return {
      ...state,
      loadingUpdateProfile: false,
    };
  }

  if (type === actions.PASSWORD_CHANGE_START) {
    return {
      ...state,
      loadingPasswordChange: true,
    };
  }

  if (type === actions.PASSWORD_CHANGE_SUCCESS) {
    return {
      ...state,
      loadingPasswordChange: false,
    };
  }

  if (type === actions.PASSWORD_CHANGE_ERROR) {
    return {
      ...state,
      loadingPasswordChange: false,
    };
  }

  if (type === actions.AUTH_INIT_SUCCESS) {
    return {
      ...state,
      currentUser: payload.currentUser || null,
      currentTenant:
        AuthCurrentTenant.selectAndSaveOnStorageFor(
          payload.currentUser,
        ),
      loadingInit: false,
    };
  }

  if (type === actions.AUTH_INIT_ERROR) {
    return {
      ...state,
      currentUser: null,
      currentTenant: null,
      loadingInit: false,
    };
  }

  if (type === actions.EMAIL_VERIFY_START) {
    return {
      ...state,
      loadingVerifyEmail: true,
      errorMessageVerifyEmail: null,
    };
  }

  if (type === actions.EMAIL_VERIFY_SUCCESS) {
    return {
      ...state,
      loadingVerifyEmail: false,
      errorMessageVerifyEmail: null,
    };
  }

  if (type === actions.EMAIL_VERIFY_ERROR) {
    return {
      ...state,
      loadingVerifyEmail: false,
      errorMessageVerifyEmail: payload,
    };
  }

  if (type === actions.PROMPT_KEEP_ALIVE) {
    return {
      ...state,
      promptKeepAlive: payload,
    };
  }

  return state;
};
