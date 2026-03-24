const authController = require("../controller/forumPost")
const express = require("express")
const router = express.Router()


router.post("/create",authController.Create)
router.get("/getdata/:id",authController.getDataById)
module.exports = router