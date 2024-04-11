import PermissionChecker from '../../services/user/permissionChecker';
import ApiResponseHandler from '../apiResponseHandler';
import Permissions from '../../security/permissions';
import ProgramRequirementGuidanceTemplateService from '../../services/programRequirementGuidanceTemplateService';

export default async (req, res, next) => {
  try {
    new PermissionChecker(req).validateHas(
      Permissions.values
        .programRequirementGuidanceTemplateRead,
    );

    const payload =
      await new ProgramRequirementGuidanceTemplateService(
        req,
      ).findById(req.params.id);

    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
