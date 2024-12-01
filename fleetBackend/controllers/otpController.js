
const otpAuthService = require("../services/otpAuthService")
const ResponseHandler = require('../utils/responseHandler');
const CustomError = require('../utils/customError');
const OTPSERVICE = require("../config/constants");
class OtpController {

    async generateOtp(req, res, next) {
        try {
            const { phoneNumber } = req.body
            const otpResp = await otpAuthService.requestOtp(phoneNumber, OTPSERVICE.PHONE)
            ResponseHandler.success(res, otpResp, "Otp Generated")
        } catch (error) {
            console.log("In controller, could not get the otp:", error)
            next(new CustomError(error.message, 500));
        }
    }

    async verifyOtp(req, res, next) {
        try {
            const { phoneNumber, otp } = req.body
            console.log(`OTP controller,phone number:${phoneNumber}, otp:${otp}`)
            const otpResp = await otpAuthService.verifyOtp(phoneNumber, otp, OTPSERVICE.PHONE)
            if (otpResp) {
                const respData = {
                    message: `Otp verified for:${phoneNumber}`
                }
                console.log(`OTP Verified data:${otpResp}`)
                ResponseHandler.success(res, respData, "Otp verified")
            } else {
                ResponseHandler.error(res, "Invalid phone number or otp", 403)
            }

        } catch (error) {
            console.log("Verify otp:", error)
            next(new CustomError(error.message, 500));
        }
    }
}

module.exports = new OtpController();