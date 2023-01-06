import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
};

export default errorMiddleware;