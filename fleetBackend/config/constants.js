const constants = {
    shop: 'shop',
    admin: 'admin',
    fleet: 'fleet'
}

const OTPSERVICE = {
    PHONE: "phone",
    EMAIL: "email"
};

const JOBSTATUS = {
    NEW: 1,
    ASSIGNED_DRIVER: 2,
    DRIVER_ACCEPTED: 3,
    PICKUP_COMPLETED:4,
    DELIVERED: 5,
    RETURNED:6
};
module.exports = {
    constants,
    OTPSERVICE,
    JOBSTATUS
}

