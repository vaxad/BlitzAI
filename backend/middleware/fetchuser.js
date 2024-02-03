const jwt = require('jsonwebtoken');

const fetchuser = (req, res, next) => {
    const JWT_SECRET = process.env.JWT_SECRET;
    try {
        const token = req.header('auth-token');
        if (!token) {
            res.status(401).send('Unauthorized');
        }
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send('Unauthorized');
    }
}

module.exports = fetchuser;