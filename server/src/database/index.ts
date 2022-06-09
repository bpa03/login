import { Sequelize } from 'sequelize';
import { DatabaseOptions } from './config';

export const sequelize = new Sequelize(DatabaseOptions);

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
    console.log('Database is connected');
    console.log("All models were synchronized successfully.");
  } catch (e) {
    console.log(e);
  }
})();
