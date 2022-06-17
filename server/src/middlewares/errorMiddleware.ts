import { NextFunction, Request, Response } from 'express';
import ErrorHandler from '../errors/ErrorHanlder';

export const errorLogger = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('\x1b[31m', err);
  next(err);
};

export const errorMiddleware = (
  err: ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.headersSent) {
    return next(err);
  }
  const { statusCode, message, name, stack } = err;

  res.status(statusCode);
  res.header('Content-Type', 'application/problem+json');
  res.json({
    errors: {
      success: false,
      name: name,
      message: message,
      stack: stack,
    },
  });
};
