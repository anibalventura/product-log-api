import { NextFunction, Request, Response } from 'express';
import { handleInputErrors } from '../middlewares/error.middlewares';

export const getUpdatePoints = [
  handleInputErrors,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {
      next(error);
    }
  },
];

export const getUpdatePoint = [
  handleInputErrors,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {
      next(error);
    }
  },
];

export const createUpdatePoint = [
  handleInputErrors,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {
      next(error);
    }
  },
];

export const updateUpdatePoint = [
  handleInputErrors,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {
      next(error);
    }
  },
];

export const deleteUpdatePoint = [
  handleInputErrors,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {
      next(error);
    }
  },
];
