import { verifyJWT } from './../helpers/auth.helper';
import { JwtPayload } from './../../node_modules/@types/jsonwebtoken/index.d';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import {
  Result,
  ValidationError,
  header,
  validationResult,
} from 'express-validator';

interface RequestWithUser extends Request {
  user: string | JwtPayload;
}

const authMiddleware = [
  header('authorization')
    .notEmpty()
    .withMessage('Authorization header is required'),
  (req: RequestWithUser, res: Response, next: NextFunction) => {
    const path = req.path;
    if (path === '/api/user' || path === '/api/user/login') {
      next();
      return;
    }

    const reqErrors: Result<ValidationError> = validationResult(req);
    if (!reqErrors.isEmpty()) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ errors: reqErrors.array() });
    }

    try {
      const [, token]: string[] = req.headers.authorization.split(' ');
      const user: string | JwtPayload = verifyJWT(token);

      req.user = user;
      next();
      return;
    } catch (error) {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .send({ message: 'Invalid token' });
    }
  },
];

export default authMiddleware;
