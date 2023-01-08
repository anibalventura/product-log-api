import { body, header } from 'express-validator';
import { inputValidatorMiddleware } from '../middlewares/inputValidator.middleware';

export default {
  createProduct: [body('name').isString(), inputValidatorMiddleware],
  updateProduct: [body('name').isString(), inputValidatorMiddleware],
  deleteProduct: [header('id').notEmpty(), inputValidatorMiddleware],
};
