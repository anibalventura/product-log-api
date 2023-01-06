import { verifyJWT } from './../helpers/auth.helper';
import { JwtPayload } from './../../node_modules/@types/jsonwebtoken/index.d';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

interface RequestWithUser extends Request {
  user: string | JwtPayload;
}

const authMiddleware = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const path = req.path;

  if (path === '/api/user/create' || path === '/api/user/login') {
    next();
    return;
  }

  const bearer: String = req.headers.authorization;

  if (!bearer) {
    return res
      .status(httpStatus.UNAUTHORIZED)
      .send({ message: 'Not authorized' });
  }

  const [, token]: string[] = bearer.split(' ');

  if (!token) {
    return res
      .status(httpStatus.UNAUTHORIZED)
      .send({ message: 'Not authorized' });
  }

  try {
    const user: string | JwtPayload = verifyJWT(token);
    req.user = user;
    next();
    return;
  } catch (error) {
    return res
      .status(httpStatus.UNAUTHORIZED)
      .send({ message: 'Invalid token' });
  }
};

export default authMiddleware;
