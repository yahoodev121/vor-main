import ApiResponseHandler from '../api/apiResponseHandler';
import Error400 from '../errors/Error400';

export const impersonateMiddleware = async (
  req,
  res,
  next,
) => {
  try {
    if (
      req.currentUser?.impersonate &&
      req.method !== 'GET'
    ) {
      await ApiResponseHandler.error(
        req,
        res,
        new Error400(
          req.language,
          'user.errors.impersonate',
        ),
      );
      return;
    }
    next();
  } catch (error) {
    next(error);
  }
};
