import { Sequelize } from 'sequelize';
import { DatabaseOptions } from './config';

export const sequelize = new Sequelize(DatabaseOptions);

export default async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('Database is connected');
  } catch (e) {
    console.log(e);
  }
};
