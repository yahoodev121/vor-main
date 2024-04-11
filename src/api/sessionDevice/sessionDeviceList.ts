import ApiResponseHandler from '../apiResponseHandler';
import PermissionChecker from '../../services/user/permissionChecker';
import Permissions from '../../security/permissions';
import SessionDeviceRepository from '../../database/repositories/sessionDeviceRepository';

export default async (req, res, next) => {
  try {
    new PermissionChecker(req).validateHas(
      Permissions.values.sessionDeviceRead,
    );

    const payload =
      await SessionDeviceRepository.findAndCountAll(
        req.params.userId,
        req,
      );

    await ApiResponseHandler.success(req, res, {
      active: req.activeDevice,
      ...payload,
    });
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
