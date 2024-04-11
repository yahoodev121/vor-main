import PermissionChecker from '../../services/user/permissionChecker';
import Storage from '../../security/storage';
import FileStorage from '../../services/file/fileStorage';
import ApiResponseHandler from '../apiResponseHandler';
import Error403 from '../../errors/Error403';
import moment from 'moment';

export default async (req, res) => {
  try {
    const permissionChecker = new PermissionChecker(req);

    const filename = req.query.filename;
    const originalFilename = req.query.original;
    const storageId = req.query.storageId;

    let userDoesNotExist =
      !req.currentUser || !req.currentUser.id;

    let currentTenantDoesNotExist =
      !req.currentTenant || !req.currentTenant.id;

    if (userDoesNotExist) {
      console.log('User does not exist.');
      throw new Error403();
    }

    if (currentTenantDoesNotExist) {
      console.log('Tenant does not exist');
      throw new Error403();
    }

    // The config storage has the information on where
    // to store the file and the max size
    const config = Storage.values[storageId];

    if (!config) {
      throw new Error403();
    }

    if (
      // Some permissions are related to the user itself,
      // not related to any entity, that's why there is a bypass permissions
      !config.bypassWritingPermissions &&
      !permissionChecker.hasStorage(storageId)
    ) {
      console.log('no permission');
      throw new Error403();
    }

    // The private URL is the path related to the bucket/file system folder
    let privateUrl = `${config.folder}/${filename}`;
    privateUrl = privateUrl.replace(
      ':tenantId',
      req.currentTenant.id,
    );
    privateUrl = privateUrl.replace(
      ':userId',
      req.currentUser.id,
    );

    const maxSizeInBytes = config.maxSizeInBytes;
    const publicRead = Boolean(config.publicRead);

    const downloadUrl = await FileStorage.downloadUrl(
      originalFilename,
      privateUrl,
      publicRead,
    );

    /**
     * Upload Credentials has the URL and the fields to be sent
     * to the upload server.
     */
    const uploadCredentials =
      await FileStorage.uploadCredentials(
        privateUrl,
        maxSizeInBytes,
        publicRead,
        null,
        req.currentTenant.id,
      );

    await ApiResponseHandler.success(req, res, {
      original: originalFilename,
      privateUrl,
      downloadUrl,
      uploadCredentials,
      uploader: req.currentUser,
      uploadedAt: moment.now(),
    });
  } catch (error) {
    console.log(error);
    await ApiResponseHandler.error(req, res, error);
  }
};
