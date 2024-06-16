// sequelize.ts

import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  database: 'postges',
  host: 'localhost',
  dialect: 'postgres',
});

export default sequelize;