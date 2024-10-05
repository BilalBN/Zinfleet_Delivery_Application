const db = require('../db/db');

// Create a user in the database
const createUser = (name, email, hashedPassword, callback) => {
  const query = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
  db.query(query, [name, email, hashedPassword], callback);
};

// Find a user by email
const findUserByEmail = (email, callback) => {
  const query = `SELECT * FROM users WHERE email = ?`;
  db.query(query, [email], callback);
};

module.exports = {
  createUser,
  findUserByEmail
};
