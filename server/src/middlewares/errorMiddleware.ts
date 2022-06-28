import { NextFunction, Request, Response } from 'express';
import HttpException from '../errors/ErrorHanlder';

export const errorLogger = (
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('\x1b[31m', err);
  next(err);
};

export const errorMiddleware = (
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.headersSent) {
    return next(err);
  }
  const { statusCode, response } = err;

  res.status(statusCode);
  res.header('Content-Type', 'application/problem+json');
  res.json({
    error: {
      success: false,
      description: response,
    },
  });
};
