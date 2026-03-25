const { userModel } = require("../models")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

class Auth {
    async Create(req, res) {
        try {
            const { email, password, username } = req.body
            if (!email || password.length < 8) {
                return res.json({ success: false, error: "invalid input" })
            }
            const existing = await userModel.findOne({ where: { email } });
            if (existing) {
                return res.json({ success: false, error: "Email already exists" });
            }
            const salt = await bcrypt.genSalt(10)
            const hash = await bcrypt.hash(password, salt)
            const userdata = await userModel.create({
                email, password: hash, username
            })
            return res.status(201).json({ success: true, data: userdata, message: "Account created successfully!" })
        } catch (err) {

            return res.status(500).json({
                success: false,
                error: "server error"
            });
        }
    }
    async Login(req, res) {
        try {
            const { email, password } = req.body;
            const finduser = await userModel.findOne({ where: { email } });
            if (!finduser) {
                return res.json({ success: false, error: "User not found" });
            }

            const matchPassword = await bcrypt.compare(password, finduser.password);
            if (!matchPassword) {
                return res.json({ success: false, error: "Wrong password" });
            }

            const token = jwt.sign({ userId: finduser.id }, process.env.JWT_SECRET, { expiresIn: "7d" });


            return res.status(200).json({
                success: true,
                token,
                userId: finduser.id,
                username: finduser.username,
                message: "Signed in successfully"
            });
        } catch (err) {
            console.error(err); 
            return res.status(500).json({ success: false, error: "Server error" });
        }
    }
}

const authController = new Auth()
module.exports = authController