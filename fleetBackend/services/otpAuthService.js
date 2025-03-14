const { OTPSERVICE } = require("../config/constants");
const sequelize = require("../db/db");
const Otp = require("../models/otpModel");
const Driver = require("../models/driverModel");
const crypto = require('crypto')
const { QueryTypes, where } = require('sequelize')
const ResponseHandler = require('../utils/responseHandler');
const authService = require('./authService');
const exp = require("constants");
const { Op } = require('sequelize');
const OrderDeliveryOtp = require("../models/deliveryOtpModel");
const generateOtp = () => {
    return crypto.randomInt(1000, 9999)
}
class OtpAuthService {

    async requestOtp(otpReceiver, type) {
        switch (type) {
            case OTPSERVICE.PHONE:
                const driverData = await Driver.findOne({
                    where: {
                        phoneNumber: otpReceiver
                    }
                })
                if (driverData) {
                    const generatedOtp = generateOtp();
                    const expiry = new Date(Date.now() + 5 * 60 * 1000) // Otp valid for 5 minutes.
                    try {
                        const otp = Otp.create({
                            type: type,
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
                } else {
                    throw Error("Could not create the otp for:", otpReceiver)
                }
                break;
            case OTPSERVICE.EMAIL:
                console.log(`Sending otp via email:${otpDestination}`)
                break;
            default:
                console.log("Invalid otp service type:", type)
                throw Error("Invalid otp service type:", type)
        }
    }

    async verifyOtp(req, res) {
        const { phoneNumber, otp } = req.body
        console.log(`I am in otp service, phone:${phoneNumber}, otp:${otp}`)
        try {
            const expiryLimitTimeStamp = new Date(Date.now() - (5 * 60 * 1000))
            console.log("Expirty time:", expiryLimitTimeStamp)
            const otpGeneratedData = await Otp.findOne({
                where: {
                    receiver: phoneNumber,
                    otp: otp,
                    expire: {
                        [Op.gte]: expiryLimitTimeStamp,
                    }
                }
            })
            if (otpGeneratedData) {
                otpGeneratedData.isUsed = true
                await Otp.update({
                    isUsed: true
                }, {
                    where: {
                        id: otpGeneratedData.id
                    }
                })
                authService.getDriverSession(phoneNumber, res)
            } else {
                const respData = {
                    message: `May be your phone number not registered or otp expired:${phoneNumber}`,
                    phoneNumber: phoneNumber
                }
                ResponseHandler.error(res, respData, 404)
            }

        } catch (error) {
            console.log("Otp service:", error)
            throw Error("Could not verify the otp at this moment");
        }
    }


    async requestDeliveryOtp(orderId, otpReceiver, type) {
        switch (type) {
            case OTPSERVICE.PHONE:
                const generatedOtp = generateOtp();
                const expiry = new Date(Date.now() + 24*60 * 60 * 1000) // Otp valid for 5 minutes.
                try {
                    const otp = OrderDeliveryOtp.create({
                        type: type,
                        receiver: otpReceiver,
                        otp: generatedOtp,
                        expire: expiry,
                        fleetOrderId: orderId
                    })
                    console.log("Generated Delivery otp:", otp)
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
                throw Error("Invalid otp service type:", type)
                break;
            default:
                console.log("Invalid otp service type:", type)
                throw Error("Invalid otp service type:", type)
        }
    }

    async verifyDeliveryOtp(orderId, phoneNumber, otp) {
        try {
            // const expiryLimitTimeStamp = new Date(Date.now() - (24*60 * 60 * 1000))
            // console.log("Expirty time:", expiryLimitTimeStamp)
            const otpGeneratedData = await OrderDeliveryOtp.findOne({
                where: {
                    receiver: phoneNumber,
                    fleetOrderId: orderId,
                    otp: otp,
                    isUsed: false,
                    expire: {
                        [Op.gte]: Date.now(),
                    }
                },
                order: [["createdAt", "DESC"]]
            })
            if (otpGeneratedData) {
                otpGeneratedData.isUsed = true
                await OrderDeliveryOtp.update({
                    isUsed: true
                }, {
                    where: {
                        id: otpGeneratedData.id
                    }
                })
               return true
            } else {
               return false
            }

        } catch (error) {
            throw Error("Could not verify the otp at this moment");
        }
    }

}

module.exports = new OtpAuthService();