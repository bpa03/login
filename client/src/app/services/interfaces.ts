export interface ErrorResponse {
  success: boolean;
  name: string;
  message: string;
  stack: string;
}

export interface JSONResponse<T> {
  data?: T;
  errors: ErrorResponse;
}

export interface CredentialsRegister {
  name: string;
  lastName: string;
  email: string;
  password: string;
}

export interface CredentialsLogin {
  email: string;
  password: string;
}

export interface ServiceBase {
  readonly BASE_URL: string;
  readonly REGISTER_URI: string;
  readonly LOGIN_URI: string;
}
