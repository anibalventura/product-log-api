import { body, param } from 'express-validator';
import { inputValidatorMiddleware } from '../middlewares/inputValidator.middleware';

export default {
  getProduct: [param('id').notEmpty(), inputValidatorMiddleware],
  createProduct: [
    body('name')
      .isString()
      .isLength({ min: 3, max: 100 })
      .withMessage('Name must be between 3 and 100 characters'),
    inputValidatorMiddleware,
  ],
  updateProduct: [
    body('name')
      .isString()
      .isLength({ min: 3, max: 100 })
      .withMessage('Name must be between 3 and 100 characters'),
    inputValidatorMiddleware,
  ],
  deleteProduct: [param('id').notEmpty(), inputValidatorMiddleware],
};
