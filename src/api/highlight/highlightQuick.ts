import ApiResponseHandler from '../apiResponseHandler';
import HighlightService from '../../services/highlightService';
import PermissionChecker from '../../services/user/permissionChecker';
import Permissions from '../../security/permissions';

export default async (req, res, next) => {
  try {
    new PermissionChecker(req).validateHas(
      Permissions.values.highlightCreate,
    );

    const payload = await new HighlightService(req).quick(
      req.body.fileId,
      req.body.highlights,
    );

    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
