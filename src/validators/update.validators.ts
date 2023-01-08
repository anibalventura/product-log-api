import { body } from 'express-validator';
import { inputValidatorMiddleware } from '../middlewares/inputValidator.middleware';

export default {
  createUpdate: [
    body('title').exists().isString(),
    body('body').exists().isString(),
    inputValidatorMiddleware,
  ],
  updateUpdate: [
    body('title').optional(),
    body('body').optional(),
    body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']),
    body('version').optional(),
    inputValidatorMiddleware,
  ],
};
