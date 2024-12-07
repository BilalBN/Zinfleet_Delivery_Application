
require('dotenv').config();
const development = {
  username: process.env.DB_USER_NAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DATABASE_NAME || 'fleet_db',
  host: process.env.DATABASE_HOST || '127.0.0.1',
  dialect: 'mysql',
};
const local = {
  username: process.env.DB_USER_NAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DATABASE_NAME || 'fleet_db',
  host: process.env.DATABASE_HOST || '127.0.0.1',
  dialect: 'mysql',
};
const production = {
  username: process.env.DB_USER_NAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DATABASE_NAME || 'fleet_db',
  host: process.env.DATABASE_HOST || '127.0.0.1',
  dialect: 'mysql',
};

module.exports = {
  development,
  local,
  production
};
// {
//   "development": {
//     "username": process.env.DB_USER || "root",
//     "password": "root",
//     "database": "fleet_db",
//     "host": "127.0.0.1",
//     "dialect": "mysql"
//   },
//   "local": {
//     "username": "root",
//     "password": "root",
//     "database": "fleet_db",
//     "host": "127.0.0.1",
//     "dialect": "mysql"
//   },
//   "production": {
//     "username": "root",
//     "password": null,
//     "database": "database_production",
//     "host": "127.0.0.1",
//     "dialect": "mysql"
//   }
// }
