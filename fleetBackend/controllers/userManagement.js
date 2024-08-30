const db = require('../db/db');

// Get all users
const getAllUsers = (req, res) => {
  const query = 'SELECT * FROM fltUser';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching users:', err);
      res.status(500).send('Server error');
      return;
    }
    res.json(results);
  });
};

// Get a user by ID
const getUserById = (req, res) => {
  const userId = req.params.id;
  const query = 'SELECT * FROM fltUser WHERE id = ?';

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching user:', err);
      res.status(500).send('Server error');
      return;
    }
    if (results.length === 0) {
      res.status(404).send('User not found');
      return;
    }
    res.json(results[0]);
  });
};

// Create a new user
const createUser = (req, res) => {
  const currentTimestamp  = new Date().toISOString();
  const { firstName, lastName, email, status, phone } = req.body;
  const query = 'INSERT INTO fltUser (firstName, lastName, email, status, phone,createdAt) VALUES (?, ?, ?, ?, ?,?)';

  db.query(query, [firstName, lastName, email, status, phone, currentTimestamp], (err, results) => {
    if (err) {
      console.error('Error creating user:', err);
      res.status(500).send('Server error');
      return;
    }
    res.status(201).json({ id: results.insertId, firstName,lastName, email, status,phone });
  });
};

// Update a user
const updateUser = (req, res) => {
  const userId = req.params.id;
  const { name, email } = req.body;
  const query = 'UPDATE users SET name = ?, email = ? WHERE id = ?';

  db.query(query, [name, email, userId], (err, results) => {
    if (err) {
      console.error('Error updating user:', err);
      res.status(500).send('Server error');
      return;
    }
    res.json({ id: userId, name, email });
  });
};

// Delete a user
const deleteUser = (req, res) => {
  const userId = req.params.id;
  const query = 'DELETE FROM users WHERE id = ?';

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error deleting user:', err);
      res.status(500).send('Server error');
      return;
    }
    res.status(204).send();
  });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
}