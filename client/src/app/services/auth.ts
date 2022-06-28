/* eslint-disable operator-linebreak */
import {
  JSONResponse,
  ServiceBase,
  CredentialsRegister,
  CredentialsLogin,
} from './interfaces';

class AuthServices implements ServiceBase {
  declare BASE_URL: string;
  declare REGISTER_URI: string;
  declare LOGIN_URI: string;
  declare AUTHORIZE_URI: string;
  declare LOGOUT_URI: string;

  constructor() {
    this.BASE_URL = import.meta.env.VITE_API_BASE_URL;
    this.REGISTER_URI = '/register';
    this.LOGIN_URI = '/login';
    this.AUTHORIZE_URI = '/login/authorize';
    this.LOGOUT_URI = '/logout';
  }

  async register(
    credentials: CredentialsRegister,
  ): Promise<{ token: string; success: boolean }> {
    const response = await window.fetch(
      `${this.BASE_URL}${this.REGISTER_URI}`,
      {
        method: 'POST',
        body: JSON.stringify(credentials),
        credentials: 'include',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    const { data, error }: JSONResponse<{ token: string; success: boolean }> =
      await response.json();
    return response.ok && data ? data : Promise.reject(error);
  }

  async login(
    credentials: CredentialsLogin,
  ): Promise<{ token: string; success: boolean }> {
    const response = await window.fetch(`${this.BASE_URL}${this.LOGIN_URI}`, {
      method: 'POST',
      body: JSON.stringify(credentials),
      credentials: 'include',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const { data, error }: JSONResponse<{ token: string; success: boolean }> =
      await response.json();
    return response.ok && data?.success ? data : Promise.reject(error);
  }

  async authorize(): Promise<{ token: string; success: boolean }> {
    const response = await window.fetch(
      `${this.BASE_URL}${this.AUTHORIZE_URI}`,
      {
        method: 'GET',
        credentials: 'include',
        mode: 'cors',
      },
    );
    const { data, error }: JSONResponse<{ token: string; success: boolean }> =
      await response.json();
    return response.ok && data?.success ? data : Promise.reject(error);
  }

  async logout(): Promise<void> {
    const response = await window.fetch(`${this.BASE_URL}${this.LOGOUT_URI}`, {
      method: 'GET',
      credentials: 'include',
      mode: 'cors',
    });
    if (response.ok) {
      return Promise.resolve();
    }

    const { error }: JSONResponse<{}> = await response.json();
    return Promise.reject(error);
  }
}

export default new AuthServices();
