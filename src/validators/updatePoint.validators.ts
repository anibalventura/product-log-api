import { body, oneOf } from 'express-validator';
import { inputValidatorMiddleware } from '../middlewares/inputValidator.middleware';

export default {
  createUpdatePoint: [
    body('name').isString(),
    body('description').isString(),
    body('updateId').exists().isString(),
    inputValidatorMiddleware,
  ],
  updateUpdatePoint: [
    body('name').optional().isString(),
    body('description').optional().isString(),
    inputValidatorMiddleware,
  ],
};
