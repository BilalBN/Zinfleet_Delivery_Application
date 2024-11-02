const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1]; // Bearer <token>
    if (!token) {
        return res.sendStatus(401); // Unauthorized
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user,role) => {
        if (err) {
            return res.sendStatus(403); // Forbidden
        }
        req.user = user; // Save user info for later use
        console.log(user.role)
        next();
    });
}

module.exports = { authMiddleware };
