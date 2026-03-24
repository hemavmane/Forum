const authController = require("../controller/auth")
const express = require("express")
const router = express.Router()


router.post("/register",authController.Create)
router.post("/login",authController.Login)
module.exports = router