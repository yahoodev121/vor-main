import jwt from 'jsonwebtoken';
import { getConfig } from '../config';

export default class ApiResponseHandler {
  static async download(req, res, path, filename) {
    res.download(path, filename);
  }

  static async send(req, res, path) {
    res.sendFile(path);
  }

  static async success(req, res, payload) {
    if (payload !== undefined) {
      const newJWT =
        req.currentUser &&
        req.currentUser.id &&
        jwt.sign(
          { id: req.currentUser.id },
          getConfig().AUTH_JWT_SECRET,
          { expiresIn: getConfig().AUTH_JWT_EXPIRES_IN },
        );
      res.status(200).send({ payload, jwt: newJWT });
    } else {
      res.sendStatus(200);
    }
  }

  static async error(req, res, error) {
    if (
      error &&
      [400, 401, 403, 404].includes(error.code)
    ) {
      res.status(error.code).send(error.message);
    } else {
      console.error(error);
      res.status(500).send(error.message);
    }
  }
}
