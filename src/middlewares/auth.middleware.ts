import { verifyJWT } from './../helpers/auth.helper';
import { JwtPayload } from './../../node_modules/@types/jsonwebtoken/index.d';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { header } from 'express-validator';
import { handleInputErrors } from './error.middlewares';

interface RequestWithUser extends Request {
  user: string | JwtPayload;
}

const authMiddleware = [
  header('authorization')
    .notEmpty()
    .withMessage('Authorization header is required'),
  handleInputErrors,
  (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const path = req.path;
      if (path === '/api/user/create' || path === '/api/user/login') {
        next();
        return;
      }

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
