import { NextFunction, Request, Response } from 'express';
import { handleInputErrors } from '../middlewares/error.middlewares';

export const getProducts = [
  handleInputErrors,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {
      next(error);
    }
  },
];

export const getProduct = [
  handleInputErrors,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {
      next(error);
    }
  },
];

export const createProduct = [
  handleInputErrors,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {
      next(error);
    }
  },
];

export const updateProduct = [
  handleInputErrors,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {
      next(error);
    }
  },
];

export const deleteProduct = [
  handleInputErrors,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {
      next(error);
    }
  },
];
