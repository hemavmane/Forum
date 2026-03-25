const authController = require("../controller/forumPost")
const auth = require("../middleware/auth")
const express = require("express")
const router = express.Router()
const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

router.post("/create", auth, authController.Create)
router.post("/uploads", auth, upload.single("file"), authController.upload)
router.get("/getbyid/:id", authController.getDataById)
router.get("/getdata", authController.getAll)
router.put("/update/:id", auth, authController.updatePost)
router.post("/trash/:id", auth, authController.trash)

module.exports = router


