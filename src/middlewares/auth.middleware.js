import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    // get token from cookies or header
    const token = req.cookies.token || req.header('Authorization') || req.body.token;

    if (!token) return res.status(401).json({ 
        success: false,
        message: 'Access denied' 
    });

    try {
        // verify token
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        return res.status(400).json({ 
            success: false,
            message: 'Invalid token' 
        });
    }
};
