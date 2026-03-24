const authController = require("../controller/Replies")
const express = require("express")
const router = express.Router()


router.post("/reply",authController.Create)
router.post("/:id",authController.getDataById)
module.exports = router