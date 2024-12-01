const OTPSERVICE = require("../config/constants");
const sequelize = require("../db/db");
const Otp = require("../models/otpModel");
const crypto = require('crypto')
const { QueryTypes } = require('sequelize')

const generateOtp = () => {
    return crypto.randomInt(1000, 9999)
}
class OtpAuthService {

    async requestOtp(otpReceiver, type) {
        switch (type) {
            case OTPSERVICE.PHONE:
                const generatedOtp = generateOtp();
                const expiry = new Date(Date.now() + 5 * 60 * 1000) // Otp valid for 5 minutes.
                try {
                    const otp = Otp.create({
                        type: type.toString(),
                        receiver: otpReceiver,
                        otp: generatedOtp,
                        expire: expiry
                    })
                } catch (exc) {
                    console.error("Error in otp generation:", exc)
                    throw Error("Could not create the otp for:", otpReceiver)
                }
                console.log(`Sending otp via phone number:${otpReceiver}`)
                return {
                    message: `Generated otp for,:${otpReceiver}`
                };
                break;
            case OTPSERVICE.EMAIL:
                console.log(`Sending otp via email:${otpDestination}`)
                break;
            default:
                console.log("Invalid otp service type:", otpDestination)
                throw Error("Invalid otp service type:", otpDestination)
        }
    }

    async verifyOtp(otpReceiver, otp, type) {
        console.log(`I am in otp service, phone:${otpReceiver}, otp:${otp}`)
        switch (type) {
            case OTPSERVICE.PHONE:
                try {
                    const otpGeneratedData = await Otp.findOne({
                        where: {
                            receiver: otpReceiver,
                            otp: otp,
                            type: type.toString()
                        }
                    })
                    if (otpGeneratedData) {
                        console.log("OTP generated data:", otpGeneratedData)
                        return true;
                    }
                    return false;
                } catch (error) {
                    console.log("Otp service:", error)
                    throw Error("Could not verify the otp at this moment");
                }
                break;
            case OTPSERVICE.EMAIL:
                console.log(`Sending otp via email:${otpDestination}`)
                break;
            default:
                console.log("Invalid otp service type:", otpDestination)
                throw Error("Invalid otp service type:", otpDestination)
                break;
        }
    }
}

module.exports = new OtpAuthService();