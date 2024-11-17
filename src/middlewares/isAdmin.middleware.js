export const isAdmin = async(req, res, next) => {
    const role = req.user.role
    if(role === 'admin'){
        next();
    }
    return res.status(403).json({
        message: "Protected route for admin"
    })
}