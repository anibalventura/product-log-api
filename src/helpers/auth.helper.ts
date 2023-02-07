import { JwtPayload } from './../../node_modules/@types/jsonwebtoken/index.d';
import * as bcrypt from 'bcrypt';
import config from '../config';
import jwt from 'jsonwebtoken';

export const createJWT = (data: any): string => {
  if (!data) {
    return 'No data provided';
  }

  return jwt.sign(data, config.jwtSecret);
};

export const verifyJWT = (token: string | undefined): string | JwtPayload => {
  if (!token) {
    return 'No token provided';
  }

  return jwt.verify(token, config.jwtSecret);
};

export const comparePassword = (
  password: string | undefined,
  hash: string | undefined
): Promise<boolean> => {
  if (!password || !hash) {
    return Promise.resolve(false);
  }

  return bcrypt.compare(password, hash);
};

export const hashPassword = (password: string | undefined): Promise<string> => {
  if (!password) {
    return Promise.resolve('');
  }

  return bcrypt.hash(password, 10);
};
