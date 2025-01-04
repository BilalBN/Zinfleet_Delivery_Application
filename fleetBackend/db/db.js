// // db.js
// const mysql = require('mysql2');

// // Create a connection to the database
// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'fleet_db'
// });

// // Connect to the database
// connection.connect((err) => {
//   if (err) {
//     console.error('Error connecting to the database:', err);
//     return;
//   }
//   console.log('Connected to the MySQL database.');
// });

// module.exports = connection;
const { Sequelize } = require('sequelize');
require('dotenv').config();

// Initialize Sequelize instance
const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DB_USER_NAME, process.env.DB_PASSWORD, {
  host: process.env.DATABASE_HOST,
  dialect:process.env.DATABASE_DIALECT, // You can change this if you're using another DBMS
});

// Test the connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection to MySQL database has been established successfully.');
    return sequelize.sync({force : false,
      alter:false
    })
  })
  .then(()=>{
    console.log('Data sync completed')
  })
  .catch((err) => {
    console.error('Unable to connect to the MySQL database:', err);
  });

module.exports = sequelize;