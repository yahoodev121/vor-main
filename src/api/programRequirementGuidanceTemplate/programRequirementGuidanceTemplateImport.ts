import PermissionChecker from '../../services/user/permissionChecker';
import ApiResponseHandler from '../apiResponseHandler';
import Permissions from '../../security/permissions';
import ProgramRequirementGuidanceTemplateService from '../../services/programRequirementGuidanceTemplateService';

export default async (req, res, next) => {
  try {
    new PermissionChecker(req).validateHas(
      Permissions.values
        .programRequirementGuidanceTemplateImport,
    );

    await new ProgramRequirementGuidanceTemplateService(
      req,
    ).import(req.body.data, req.body.importHash);

    const payload = true;

    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
