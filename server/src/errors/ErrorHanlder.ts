export default class HttpException extends Error {
  public declare statusCode: number;
  public declare name: string;

  constructor(statusCode: number, message: string) {
    super();
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.message = message;
  }
}
