import { NextFunction, Request, Response } from 'express';
import { Result, ValidationError, validationResult } from 'express-validator';
import httpStatus from 'http-status';

export const errorMiddleware = (error: Error, req: Request, res: Response) => {
  if (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

export const handleInputErrors = (
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
