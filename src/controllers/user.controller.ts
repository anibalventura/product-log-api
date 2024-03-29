import { createJWT, comparePassword } from './../helpers/auth.helper';
import httpStatus from 'http-status';
import prisma from '../helpers/db.helper';
import { NextFunction, Request, Response } from 'express';
import { hashPassword } from '../helpers/auth.helper';
import userValidators from '../validators/user.validators';

// METHOD: POST
// PATH: /user
// DESC: Create a user.
export const createUser = [
  ...userValidators.createUser,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, password } = req.body;
      const isUserCreated = await prisma.user.findUnique({
        where: { username: username },
      });

      if (isUserCreated) {
        req.body.password = '********'; // Hide password in logs.
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

// METHOD: POST
// PATH: /user/login
// DESC: Login a user.
export const loginUser = [
  ...userValidators.loginUser,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, password } = req.body;
      const user = await prisma.user.findUnique({
        where: { username: username },
      });

      if (!user) {
        req.body.password = '********'; // Hide password in logs.
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

// METHOD: DELETE
// PATH: /user/:username
// DESC: Delete a user.
export const deleteUser = [
  ...userValidators.deleteUser,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username } = req.params;
      const user = await prisma.user.findUnique({
        where: { username },
      });

      if (!user) {
        return res
          .status(httpStatus.NOT_FOUND)
          .json({ message: 'Username not exist' });
      }

      await prisma.user.delete({
        where: { username },
      });

      res.status(httpStatus.OK).json({ message: 'User deleted successfully' });
    } catch (error) {
      next(error);
    }
  },
];
