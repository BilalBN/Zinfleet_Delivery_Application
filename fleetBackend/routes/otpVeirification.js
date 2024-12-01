const express = require('express')
const otpController = require("../controllers/otpController")
const { phoneNumberValidation, otpValidation } = require('../validations/otpValidation')
const router = express.Router()
router.post("/by-phone", phoneNumberValidation, otpController.generateOtp);
router.post('/by-phone/verify', otpValidation, otpController.verifyOtp);
module.exports = router;