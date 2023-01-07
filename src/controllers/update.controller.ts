import { NextFunction, Request, Response } from 'express';
import { handleInputErrors } from '../middlewares/error.middlewares';

export const getUpdates = [
  handleInputErrors,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {
      next(error);
    }
  },
];

export const getUpdate = [
  handleInputErrors,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {
      next(error);
    }
  },
];

export const createUpdate = [
  handleInputErrors,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {
      next(error);
    }
  },
];

export const updateUpdate = [
  handleInputErrors,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {
      next(error);
    }
  },
];

export const deleteUpdate = [
  handleInputErrors,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {
      next(error);
    }
  },
];
