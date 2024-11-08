const jwt = require('jsonwebtoken');


const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization') && req.header('Authorization').replace('Bearer ', '').trim();
    
    if (!token) {
        return res.status(401).json({ message: 'No token provided, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); 
        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = authMiddleware;
