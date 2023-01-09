import { body, param } from 'express-validator';
import { inputValidatorMiddleware } from '../middlewares/inputValidator.middleware';

export default {
  getUpdate: [param('id').notEmpty(), inputValidatorMiddleware],
  createUpdate: [
    body('title').exists().isString(),
    body('body').exists().isString(),
    body('productId').exists().isString(),
    inputValidatorMiddleware,
  ],
  updateUpdate: [
    body('title').optional(),
    body('body').optional(),
    body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']).optional(),
    body('version').optional(),
    inputValidatorMiddleware,
  ],
  deleteUpdate: [param('id').notEmpty(), inputValidatorMiddleware],
};
