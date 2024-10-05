const express = require('express');
const router = express.Router();
const { register, login, getUser } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

// Register a new user
router.post('/register', register);

// Login a user
router.post('/login', login);

// Get logged-in user's info (protected route)
router.get('/me', authMiddleware, getUser);

module.exports = router;
