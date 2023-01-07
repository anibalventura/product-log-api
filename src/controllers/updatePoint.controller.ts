import { NextFunction, Request, Response } from 'express';
import errorMiddleware from '../middlewares/error.middleware';

export const getUpdatePoints = [
  errorMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {
      next(error);
    }
  },
];

export const getUpdatePoint = [
  errorMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {
      next(error);
    }
  },
];

export const createUpdatePoint = [
  errorMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {
      next(error);
    }
  },
];

export const updateUpdatePoint = [
  errorMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {
      next(error);
    }
  },
];

export const deleteUpdatePoint = [
  errorMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {
      next(error);
    }
  },
];
