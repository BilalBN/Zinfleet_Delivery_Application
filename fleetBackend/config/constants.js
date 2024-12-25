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
    IN_PROGRESS: 4,
    DELIVERED: 5
};
module.exports = {
    constants,
    OTPSERVICE,
    JOBSTATUS
}

