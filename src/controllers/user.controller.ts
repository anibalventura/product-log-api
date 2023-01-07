import { createJWT, comparePassword } from './../helpers/auth.helper';
import httpStatus from 'http-status';
import prisma from '../helpers/db.helper';
import { NextFunction, Request, Response } from 'express';
import { hashPassword } from '../helpers/auth.helper';
import {
  Result,
  ValidationError,
  body,
  validationResult,
} from 'express-validator';

const requestValidators = [
  body('username')
    .isString()
    .isLength({ min: 3, max: 20 })
    .withMessage('Username must be between 3 and 20 characters'),
  body('password')
    .isString()
    .isLength({ min: 8, max: 20 })
    .withMessage('Password must be between 8 and 20 characters'),
];

export const createUser = [
  ...requestValidators,
  async (req: Request, res: Response, next: NextFunction) => {
    const reqErrors: Result<ValidationError> = validationResult(req);
    if (!reqErrors.isEmpty()) {
      return res.status(400).json({ errors: reqErrors.array() });
    }

    try {
      const { username, password } = req.body;
      const isUserCreated = await prisma.user.findUnique({
        where: { username: username },
      });

      if (isUserCreated) {
        return res
          .status(httpStatus.CONFLICT)
          .json({ message: 'Username already exists' });
      }

      const user = await prisma.user.create({
        data: {
          username: username,
          password: await hashPassword(password),
        },
      });
      const token: string = createJWT(user);

      req.body.password = '********'; // Hide password in logs.
      res.status(httpStatus.OK).json({ token });
    } catch (error) {
      next(error);
    }
  },
];

export const loginUser = [
  ...requestValidators,
  async (req: Request, res: Response, next: NextFunction) => {
    const reqErrors: Result<ValidationError> = validationResult(req);
    if (!reqErrors.isEmpty()) {
      return res.status(400).json({ errors: reqErrors.array() });
    }

    try {
      const { username, password } = req.body;
      const user = await prisma.user.findUnique({
        where: { username: username },
      });

      if (!user) {
        return res
          .status(httpStatus.UNAUTHORIZED)
          .json({ message: 'Invalid credentials' });
      }

      const isPasswordValid: boolean = await comparePassword(
        password,
        user.password
      );

      if (!isPasswordValid) {
        return res
          .status(httpStatus.UNAUTHORIZED)
          .json({ message: 'Invalid credentials' });
      }

      const token: string = createJWT(user);

      req.body.password = '********'; // Hide password in logs.
      res.status(httpStatus.OK).json({ token });
    } catch (error) {
      next(error);
    }
  },
];
