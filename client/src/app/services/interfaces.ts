export interface ErrorResponse {
  success: boolean;
  description:
    | {
        type: 'AE';
        errors: string;
      }
    | {
        type: 'FE';
        errors: {
          message: string;
          param: string;
        }[];
      };
}

export interface JSONResponse<T> {
  data?: T;
  error: ErrorResponse;
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
