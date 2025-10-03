
const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    let token;

    // Check if the Authorization header exists and starts with 'Bearer'
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get the token from the Authorization header
            token = req.headers.authorization.split(' ')[1];

            // Verify the token using the JWT secret from your .env file
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Add the user ID to the request object
            req.user = decoded.user;
            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ msg: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ msg: 'Not authorized, no token' });
    }
};

module.exports = protect;