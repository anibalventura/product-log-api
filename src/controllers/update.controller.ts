import { NextFunction, Request, Response } from 'express';
import errorMiddleware from '../middlewares/error.middleware';

export const getUpdates = [
  errorMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {
      next(error);
    }
  },
];

export const getUpdate = [
  errorMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {
      next(error);
    }
  },
];

export const createUpdate = [
  errorMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {
      next(error);
    }
  },
];

export const updateUpdate = [
  errorMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {
      next(error);
    }
  },
];

export const deleteUpdate = [
  errorMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {
      next(error);
    }
  },
];
