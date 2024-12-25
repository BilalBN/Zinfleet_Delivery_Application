
const otpAuthService = require("../services/otpAuthService")
const ResponseHandler = require('../utils/responseHandler');
const CustomError = require('../utils/customError');
const { OTPSERVICE } = require("../config/constants");
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
            await otpAuthService.verifyOtp(req, res)
        } catch (error) {
            console.log("Verify otp:", error)
            next(new CustomError(error.message, 500));
        }
    }
}

module.exports = new OtpController();