import { Sequelize } from 'sequelize';
let connection;

if (process.env.NODE_ENV === 'development') {
  connection = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
  });
}

export default connection;
