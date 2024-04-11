import ApiResponseHandler from '../apiResponseHandler';
import formidable from 'formidable-serverless';
import mammoth from 'mammoth'; // Import mammoth library

export default async (req, res, next) => {
  try {
    const { path } = req.body;
    if (!path) {
      // Handle the case where no file was uploaded
      return ApiResponseHandler.error(
        req,
        res,
        'No file uploaded',
      );
    }

    // Read the Word document and convert it to text using mammoth
    const { value } = await mammoth.extractRawText({
      path: `./uploads/${path}`,
    });

    // Send the converted text to the client
    return ApiResponseHandler.success(req, res, value);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
