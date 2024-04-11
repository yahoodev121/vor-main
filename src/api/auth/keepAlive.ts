import ApiResponseHandler from '../apiResponseHandler';
import Error403 from '../../errors/Error403';

export default async (req, res, next) => {
  try {
    if (!req.currentUser || !req.currentUser.id) {
      throw new Error403(req.language);
    }

    const payload = { status: 'keep-alive' };

    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
