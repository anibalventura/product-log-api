import { NextFunction, Request, Response } from 'express';
import updateValidators from '../validators/update.validators';
import prisma from '../helpers/db.helper';
import httpStatus from 'http-status';

interface RequestWithUpdate extends Request {
  user: {
    id: string;
  };
}

// METHOD: GET
// PATH: /update
// DESC: Get all updates by product id.
export const getUpdates = [
  async (req: RequestWithUpdate, res: Response, next: NextFunction) => {
    try {
      const products = await prisma.product.findMany({
        where: {
          belongsToId: req.user.id,
        },
        include: {
          updates: true,
        },
      });

      const updates = products.reduce((allUpdates, product) => {
        return [...allUpdates, ...product.updates];
      }, []);

      res.status(httpStatus.OK).json({ data: updates });
    } catch (error) {
      next(error);
    }
  },
];

// METHOD: GET
// PATH: /update/:id
// DESC: Get a single update.
export const getUpdate = [
  ...updateValidators.getUpdate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const update = await prisma.update.findUnique({
        where: {
          id,
        },
      });

      if (update) {
        res.status(httpStatus.OK).json({ data: update });
      } else {
        res.status(httpStatus.NOT_FOUND).json({
          message: 'Update not found',
        });
      }
    } catch (error) {
      next(error);
    }
  },
];

// METHOD: POST
// PATH: /update
// DESC: Create a new update.
export const createUpdate = [
  ...updateValidators.createUpdate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { title, body, productId } = req.body;

      const product = await prisma.product.findUnique({
        where: {
          id: productId,
        },
      });

      if (!product) {
        return res.status(httpStatus.NOT_FOUND).json({
          message: 'Product not found',
        });
      }

      const update = await prisma.update.create({
        data: {
          title,
          body,
          product: {
            connect: { id: product.id },
          },
        },
      });

      res.status(httpStatus.CREATED).json({ data: update });
    } catch (error) {
      next(error);
    }
  },
];

// METHOD: PUT
// PATH: /update/:id
// DESC: Update a single update.
export const updateUpdate = [
  ...updateValidators.updateUpdate,
  async (req: RequestWithUpdate, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const products = await prisma.product.findMany({
        where: {
          belongsToId: req.user.id,
        },
        include: {
          updates: true,
        },
      });

      const updates = products.reduce((allUpdates, product) => {
        return [...allUpdates, ...product.updates];
      }, []);

      const match = updates.find((update) => update.id === id);
      if (!match) {
        return res.status(httpStatus.NOT_FOUND).json({
          message: 'Update not found',
        });
      }

      const update = await prisma.update.update({
        where: {
          id,
        },
        data: req.body,
      });

      res.status(httpStatus.OK).json({ data: update });
    } catch (error) {
      next(error);
    }
  },
];

// METHOD: DELETE
// PATH: /update/:id
// DESC: Delete a single update.
export const deleteUpdate = [
  ...updateValidators.deleteUpdate,
  async (req: RequestWithUpdate, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const products = await prisma.product.findMany({
        where: {
          belongsToId: req.user.id,
        },
        include: {
          updates: true,
        },
      });

      const updates = products.reduce((allUpdates, product) => {
        return [...allUpdates, ...product.updates];
      }, []);

      const match = updates.find((update) => update.id === id);
      if (!match) {
        return res.status(httpStatus.NOT_FOUND).json({
          message: 'Update not found',
        });
      }

      const deleted = await prisma.update.delete({
        where: {
          id,
        },
      });

      res.status(httpStatus.OK).json({ data: deleted });
    } catch (error) {
      next(error);
    }
  },
];
