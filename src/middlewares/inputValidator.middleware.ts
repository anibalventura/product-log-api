import { Request, Response, NextFunction } from 'express';
import { Result, ValidationError, validationResult } from 'express-validator';
import httpStatus from 'http-status';

export const inputValidatorMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const reqErrors: Result<ValidationError> = validationResult(req);
  if (!reqErrors.isEmpty()) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ errors: reqErrors.array() });
  } else {
    next();
  }
};
