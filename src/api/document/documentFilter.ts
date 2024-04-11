import ApiResponseHandler from '../apiResponseHandler';
import DocumentService from '../../services/documentService';
import PermissionChecker from '../../services/user/permissionChecker';
import Permissions from '../../security/permissions';

export default async (req, res, next) => {
  try {
    new PermissionChecker(req).validateHas(
      Permissions.values.documentRead,
    );

    const payload = await new DocumentService(
      req,
    ).findAndCountAll(req.query, true);

    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
