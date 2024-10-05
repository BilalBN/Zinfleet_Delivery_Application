const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Register a new user
const register = async (req, res) => {
  const { name, email, password } = req.body;

  // Check if user already exists
  User.findUserByEmail(email, async (err, results) => {
    if (results.length > 0) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    User.createUser(name, email, hashedPassword, (err) => {
      if (err) {
        return res.status(500).json({ msg: 'Server error' });
      }

      const payload = { user: { email } };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.status(201).json({ token });
    });
  });
};

// Login a user
const login = async (req, res) => {
  const { email, password } = req.body;

  User.findUserByEmail(email, async (err, results) => {
    if (results.length === 0) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const user = results[0];

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const payload = { user: { email: user.email } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  });
};

// Get logged-in user's info (protected)
const getUser = (req, res) => {
  User.findUserByEmail(req.user.email, (err, results) => {
    if (err || results.length === 0) {
      return res.status(404).json({ msg: 'User not found' });
    }
    const user = results[0];
    res.json({ id: user.id, name: user.name, email: user.email });
  });
};

module.exports = {
  register,
  login,
  getUser
};
