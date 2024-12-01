const {body, param} = require('express-validator')

const phoneNumberValidation  = [
    body('phoneNumber').isMobilePhone('any').withMessage("Invalid phone number")
]

const otpValidation = [
    body('phoneNumber').isMobilePhone('any').withMessage("Invalid phone number"),
    body('otp').isEmpty().withMessage('OTP field is missing'),
    body('otp').isLength({min:4, max:4}).withMessage("Invalid otp")
]


module.exports ={
    phoneNumberValidation,
    otpValidation
}