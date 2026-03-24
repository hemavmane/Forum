const jwt = require("jsonwebtoken")


module.exports = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1]

    if (!token) {
        return res.status(401).json({ success: false, error: "No token found" })
    }
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decode
        next()
    } catch (err) {
        return res.status(401).json({ success: false, error: "Invalide token" })
    }
}