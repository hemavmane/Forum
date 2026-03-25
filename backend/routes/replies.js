const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const replyController = require("../controller/Replies");


router.post("/create", auth, replyController.Create);

router.get("/getbyid/:id", replyController.getDataById);
router.get("/getdata", replyController.getAll);
router.put("/update/:id", auth, replyController.update);
router.post("/trash/:id", auth, replyController.delete);

module.exports = router;