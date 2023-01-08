import httpStatus from 'http-status';
import { NextFunction, Request, Response } from 'express';
import prisma from '../helpers/db.helper';
import productValidators from '../validators/product.validators';

interface RequestWithProduct extends Request {
  user: {
    id: string;
  };
}

// METHOD: GET
// PATH: /product
// DESC: Get all products.
export const getProducts = [
  async (req: RequestWithProduct, res: Response, next: NextFunction) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: req.user.id,
        },
        include: {
          products: true,
        },
      });

      res.status(httpStatus.OK).json({ data: user.products });
    } catch (error) {
      next(error);
    }
  },
];

// METHOD: GET
// PATH: /product/:id
// DESC: Get a product.
export const getProduct = [
  ...productValidators.getProduct,
  async (req: RequestWithProduct, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const product = await prisma.product.findFirst({
        where: {
          id,
          belongsToId: req.user.id,
        },
      });

      res.status(httpStatus.OK).json({ data: product });
    } catch (error) {
      next(error);
    }
  },
];

// METHOD: POST
// PATH: /product
// DESC: Create a product.
export const createProduct = [
  ...productValidators.createProduct,
  async (req: RequestWithProduct, res: Response, next: NextFunction) => {
    try {
      const { name } = req.body;
      const product = await prisma.product.create({
        data: {
          name,
          belongsToId: req.user.id,
        },
      });

      res.status(httpStatus.CREATED).json({ data: product });
    } catch (error) {
      next(error);
    }
  },
];

// METHOD: PUT
// PATH: /product/:id
// DESC: Update a product.
export const updateProduct = [
  ...productValidators.updateProduct,
  async (req: RequestWithProduct, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const product = await prisma.product.update({
        where: {
          id_belongsToId: {
            id,
            belongsToId: req.user.id,
          },
        },
        data: {
          name,
        },
      });

      res.status(httpStatus.OK).json({ data: product });
    } catch (error) {
      next(error);
    }
  },
];

// METHOD: DELETE
// PATH: /product/:id
// DESC: Delete a product.
export const deleteProduct = [
  ...productValidators.deleteProduct,
  async (req: RequestWithProduct, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const product = await prisma.product.delete({
        where: {
          id_belongsToId: {
            id,
            belongsToId: req.user.id,
          },
        },
      });

      res.status(httpStatus.OK).json({ data: product });
    } catch (error) {
      next(error);
    }
  },
];
