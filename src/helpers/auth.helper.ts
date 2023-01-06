import { JwtPayload } from './../../node_modules/@types/jsonwebtoken/index.d';
import * as bcrypt from 'bcrypt';
import config from '../config';
import jwt from 'jsonwebtoken';

export const createJWT = (data: any): string => {
  return jwt.sign(data, config.jwtSecret);
};

export const verifyJWT = (token: string): string | JwtPayload => {
  return jwt.verify(token, config.jwtSecret);
};

export const comparePassword = (
  password: string,
  hash: string
): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};

export const hashPassword = (password: string): Promise<string> => {
  return bcrypt.hash(password, 10);
};
