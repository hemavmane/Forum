const { User } = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

class Auth {
    async Create(req, res) {
        try {
            const { email, password } = req.body
            if (!email || password.length < 8) {
                return res.json({ success: false, error: "invalid input" })
            }
            const salt = await bcrypt.genSalt(10)
            const hash = await bcrypt.hash(password, salt)
            const userdata = await User.create({
                email, password: hash
            })
            return res.status(201).json({ success: true, data: userdata })
        } catch (err) {

        }
    }

    async Login(req, res) {
        try {
            const { email, password } = req.body
            const finduser = await User.findOne({ where: { email } })
            if (!finduser) {
                return res.json({ success: false, error: "User not found" });
            }
            const matchPassword = await bcrypt.compare(password, User.password)
            if (!matchPassword) {
                return res.json({ success: false, error: "Wrong password" });
            }

            const token = jwt.sign({ userId: _id }, process.env.JWT_SECRET)
            res.json({ success: true, token });
        } catch (err) {
            return res.status(500).json({ success: false, error: err })
        }
    }
}

const authController = new Auth()
module.exports = authController