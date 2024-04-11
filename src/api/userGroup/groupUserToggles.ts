import PermissionChecker from '../../services/user/permissionChecker';
import ApiResponseHandler from '../apiResponseHandler';
import Permissions from '../../security/permissions';
import UserGroupService from '../../services/userGroupService';
import { safeBoolean } from '../../utils/objectUtils';

export default async (req, res, next) => {
  try {
    new PermissionChecker(req).validateHas(
      Permissions.values.userGroupEdit,
    );

    const payload = await new UserGroupService(
      req,
    ).userToggles(
      req.params.userId,
      req.body.groups,
      safeBoolean(req.params.doAssign),
    );

    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
