import { ValidationError } from 'express-validator';

type FormError = 'FE';
type AuthError = 'AE';

interface Error {
  message: any;
  param?: string;
}

interface ErrorResponse {
  errors: Error[] | string;
  type: FormError | AuthError;
}

export default class HttpException extends Error {
  public declare statusCode: number;
  public declare name: string;
  public declare response: ErrorResponse;

  constructor() {
    super();
    this.name = this.constructor.name;
  }

  static fromFormValidationError(
    statusCode: number,
    errors: ValidationError[]
  ) {
    const exception = new HttpException();
    exception.statusCode = statusCode;
    exception.response = {
      type: 'FE',
      errors: errors.map((err) => ({
        message: err.msg,
        param: err.param
      }))
    };    
    throw exception;
  }

  static fromAuthError(statusCode: number, message: string) {
    const exception = new HttpException();
    exception.statusCode = statusCode;
    exception.response = {
      type: 'AE',
      errors: message
    };
    throw exception;
  }
}
