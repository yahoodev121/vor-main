import ApiResponseHandler from '../apiResponseHandler';
import PermissionChecker from '../../services/user/permissionChecker';
import Permissions from '../../security/permissions';
import VorAISettingRepository from '../../database/repositories/vorAISettingRepository';

export default async (req, res, next) => {
  try {
    new PermissionChecker(req).validateHas(
      Permissions.values.vorAISubmit,
    );

    const payload =
      await VorAISettingRepository.createOrUpdate(
        req.body.data,
        req,
      );

    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
