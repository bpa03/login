import { JSONResponse, ServiceBase } from './interfaces';

class AuthServices implements ServiceBase {
  declare BASE_URL: string;
  declare REGISTER_URI: string;
  declare LOGIN_URI: string;

  constructor() {
    this.BASE_URL = import.meta.env.VITE_API_BASE_URL;
    this.REGISTER_URI = '/register';
    this.LOGIN_URI = '/login';
  }

  async register(credentials: {
    email: string;
    password: string;
  }): Promise<{ token: string; success: true }> {
    const response = await window.fetch(
      `${this.BASE_URL}${this.REGISTER_URI}`,
      {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    // eslint-disable-next-line operator-linebreak
    const { data, errors }: JSONResponse<{ token: string; success: true }> =
      await response.json();
    return response.ok && data ? data : Promise.reject(errors);
  }
}

export default new AuthServices();
