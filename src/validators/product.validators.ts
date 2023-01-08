import { getProduct } from './../controllers/products.controller';
import { body, header } from 'express-validator';
import { inputValidatorMiddleware } from '../middlewares/inputValidator.middleware';

export default {
  getProduct: [header('id').notEmpty(), inputValidatorMiddleware],
  createProduct: [body('name').isString(), inputValidatorMiddleware],
  deleteProduct: [header('id').notEmpty(), inputValidatorMiddleware],
  updateProduct: [body('name').isString(), inputValidatorMiddleware],
};
