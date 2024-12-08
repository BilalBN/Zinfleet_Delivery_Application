const constants = {
    shop: 'shop',
    admin: 'admin',
    fleet: 'fleet'
}

const OTPSERVICE = Object.freeze({
    PHONE: Symbol("phone"),
    EMAIL: Symbol("email")
});

const JOBSTATUS = {
    PENDING: 1,
    IN_PROGRESS: 2,
    DELIVERED: 3
};
module.exports = {
    constants,
    OTPSERVICE,
    JOBSTATUS
}

