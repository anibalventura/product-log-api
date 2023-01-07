import { body } from 'express-validator';
import { NextFunction, Request, Response } from 'express';
import errorMiddleware from '../middlewares/error.middleware';

export const getProducts = [
  errorMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {
      next(error);
    }
  },
];

export const getProduct = [
  errorMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {
      next(error);
    }
  },
];

export const createProduct = [
  errorMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {
      next(error);
    }
  },
];

export const updateProduct = [
  errorMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {
      next(error);
    }
  },
];

export const deleteProduct = [
  errorMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {
      next(error);
    }
  },
];
