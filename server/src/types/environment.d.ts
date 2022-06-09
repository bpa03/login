declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TZ?: string;
      PORT?: number;
      HOSTNAME_DB?: string;
      USER_DB?: string;
      PASSWORD_DB?: string;
      DB?: string;
      NODE_ENV?: 'development' | 'production';
    }
  }
}

export {};
