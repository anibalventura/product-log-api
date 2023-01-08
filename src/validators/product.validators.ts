import { body, param } from 'express-validator';
import { inputValidatorMiddleware } from '../middlewares/inputValidator.middleware';

export default {
  getProduct: [param('id').notEmpty(), inputValidatorMiddleware],
  createProduct: [body('name').isString(), inputValidatorMiddleware],
  deleteProduct: [param('id').notEmpty(), inputValidatorMiddleware],
  updateProduct: [body('name').isString(), inputValidatorMiddleware],
};
