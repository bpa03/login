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

  constructor() {
    this.BASE_URL = import.meta.env.VITE_API_BASE_URL;
    this.REGISTER_URI = '/register';
    this.LOGIN_URI = '/login';
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
    const { data, errors }: JSONResponse<{ token: string; success: boolean }> =
      await response.json();
    return response.ok && data ? data : Promise.reject(errors);
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
    const { data, errors }: JSONResponse<{ token: string; success: boolean }> =
      await response.json();
    return response.ok && data?.success ? data : Promise.reject(errors);
  }
}

export default new AuthServices();
