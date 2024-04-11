import ApiResponseHandler from '../apiResponseHandler';
import PermissionChecker from '../../services/user/permissionChecker';
import Permissions from '../../security/permissions';
import RoleService from '../../services/user/roleService';

export default async (req, res) => {
  try {
    new PermissionChecker(req).validateHas(
      Permissions.values.roleEdit,
    );

    const payload = await new RoleService(req).removeRole(
      req.body.users,
      req.params.role,
    );

    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
