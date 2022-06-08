import type { Options } from 'sequelize';

export const DatabaseOptions: Options = {
  dialect: 'mysql',
  host: process.env.HOSTNAME_DB ?? 'localhost',
  username: process.env.USER_DB ?? 'root',
  database: process.env.DB ?? 'db',
  password: process.env.PASSWORD_DB ?? '',
};
