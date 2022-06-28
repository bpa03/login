import { Response, Request, NextFunction } from 'express';
import { validationResult, Result, ValidationError } from 'express-validator';
import HttpException from '../errors/ErrorHanlder';

export const validationForm = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors: Result<ValidationError> = validationResult(req);
  if (!errors.isEmpty()) {
    throw HttpException.fromFormValidationError(400, errors.array());
  }

  next();
};
