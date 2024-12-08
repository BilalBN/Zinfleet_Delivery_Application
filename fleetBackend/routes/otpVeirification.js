const express = require('express')
const otpController = require("../controllers/otpController")
const { phoneNumberValidation, otpValidation } = require('../validations/otpValidation')
const router = express.Router()
router.post("/send", phoneNumberValidation, otpController.generateOtp);
router.post('/verify', otpValidation, otpController.verifyOtp);
module.exports = router;