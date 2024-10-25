
const express = require('express');
const authController = require('../controllers/authController');
const {
    loginValidation,
  } = require('../validations/authValidation');
const router = express.Router();

// CRUD routes for drivers
router.post('/login', loginValidation,authController.login);

module.exports = router;
