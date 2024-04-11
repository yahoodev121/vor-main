import authAxios from 'src/modules/shared/axios/authAxios';
import AuthCurrentTenant from 'src/modules/auth/authCurrentTenant';

export default class RoleService {
  static async loadSummary() {
    const tenantId = AuthCurrentTenant.get();
    const response = await authAxios.get(
      `/tenant/${tenantId}/role/summary`,
    );
    return response.data;
  }

  static async usersWithRole(role) {
    const tenantId = AuthCurrentTenant.get();
    const response = await authAxios.get(
      `/tenant/${tenantId}/role/assigned/${role}`,
    );
    return response.data;
  }

  static async usersWithoutRole(role) {
    const tenantId = AuthCurrentTenant.get();
    const response = await authAxios.get(
      `/tenant/${tenantId}/role/unassigned/${role}`,
    );
    return response.data;
  }

  static async addRole(users, role) {
    const tenantId = AuthCurrentTenant.get();
    const response = await authAxios.post(
      `/tenant/${tenantId}/role/add/${role}`,
      {
        users,
      },
    );
    return response.data;
  }

  static async removeRole(users, role) {
    const tenantId = AuthCurrentTenant.get();
    const response = await authAxios.post(
      `/tenant/${tenantId}/role/remove/${role}`,
      {
        users,
      },
    );
    return response.data;
  }
}
