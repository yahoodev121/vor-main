import { AuthToken } from 'src/modules/auth/authToken';
import { tenantSubdomain } from '../tenant/tenantSubdomain';
import authAxios from 'src/modules/shared/axios/authAxios';
import AuthCurrentTenant from 'src/modules/auth/authCurrentTenant';
import AuthInvitationToken from 'src/modules/auth/authInvitationToken';

export default class AuthService {
  static async sendEmailVerification() {
    const response = await authAxios.post(
      '/auth/send-email-address-verification-email',
      {
        tenantId: tenantSubdomain.isSubdomain
          ? AuthCurrentTenant.get()
          : undefined,
      },
    );

    return response.data;
  }

  static async sendPasswordResetEmail(email) {
    const response = await authAxios.post(
      '/auth/send-password-reset-email',
      {
        email,
        tenantId: tenantSubdomain.isSubdomain
          ? AuthCurrentTenant.get()
          : undefined,
      },
    );

    return response.data;
  }

  static async registerWithEmailAndPassword(
    email,
    password,
  ) {
    const invitationToken = AuthInvitationToken.get();

    const response = await authAxios.post('/auth/sign-up', {
      email,
      password,
      invitationToken,
      tenantId: tenantSubdomain.isSubdomain
        ? AuthCurrentTenant.get()
        : undefined,
    });

    AuthInvitationToken.clear();

    return response.data;
  }

  static async signinWithEmailAndPassword(email, password) {
    const invitationToken = AuthInvitationToken.get();

    const response = await authAxios.post('/auth/sign-in', {
      email,
      password,
      invitationToken,
      tenantId: tenantSubdomain.isSubdomain
        ? AuthCurrentTenant.get()
        : undefined,
    });

    AuthInvitationToken.clear();

    return response.data;
  }

  static async impersonate(id) {
    const response = await authAxios.post(
      '/auth/impersonate',
      {
        id,
      },
    );

    return response.data;
  }

  static async fetchMe() {
    const response = await authAxios.get('/auth/me');
    return response.data;
  }

  static async fetchAnswer(responseId) {
    const tenantId = tenantSubdomain.isSubdomain
      ? AuthCurrentTenant.get()
      : undefined;
    await authAxios.put(
      `/tenant/${tenantId}/answer/${responseId}`,
    );
  }

  static async fetchAnswerData(responseId) {
    const tenantId = tenantSubdomain.isSubdomain
      ? AuthCurrentTenant.get()
      : undefined;
    const response = await authAxios.get(
      `/tenant/${tenantId}/answer/${responseId}`,
    );
    return response.data;
  }

  static async destroyAnswerData(responseId) {
    const tenantId = tenantSubdomain.isSubdomain
      ? AuthCurrentTenant.get()
      : undefined;
    await authAxios.delete(
      `/tenant/${tenantId}/answer/${responseId}`,
    );
  }

  static signout() {
    AuthToken.set(null, false);
  }

  static async keepAlive() {
    const response = await authAxios.get(
      '/auth/keep-alive',
    );
    return response.data;
  }

  static async updateProfile(data) {
    const body = {
      data,
    };

    const response = await authAxios.put(
      '/auth/profile',
      body,
    );

    return response.data;
  }

  static async changePassword(oldPassword, newPassword) {
    const body = {
      oldPassword,
      newPassword,
    };

    const response = await authAxios.put(
      '/auth/change-password',
      body,
    );

    return response.data;
  }

  static async passwordReset(token, password) {
    const response = await authAxios.put(
      '/auth/password-reset',
      {
        token,
        password,
        tenantId: tenantSubdomain.isSubdomain
          ? AuthCurrentTenant.get()
          : undefined,
      },
    );

    return response.data;
  }

  static async verifyEmail(token) {
    const response = await authAxios.put(
      '/auth/verify-email',
      {
        token,
        tenantId: tenantSubdomain.isSubdomain
          ? AuthCurrentTenant.get()
          : undefined,
      },
    );

    return response.data;
  }

  static async socialOnboard() {
    const invitationToken = AuthInvitationToken.get();

    const response = await authAxios.post(
      '/auth/social/onboard',
      {
        invitationToken,
        tenantId: tenantSubdomain.isSubdomain
          ? AuthCurrentTenant.get()
          : undefined,
      },
    );

    AuthInvitationToken.clear();

    return response.data;
  }

  static isSocialOnboardRequested() {
    const urlParams = new URLSearchParams(
      window.location.search,
    );

    return Boolean(urlParams.get('social'));
  }
}
