const { userModel, postModel, replyModel } = require("../models")
const auth = require("../middleware/auth")

class ReplyController {
    async Create(req, res) {
        try {
            const { title, body } = req.body
            if (title.length < 3 || body.length < 5) {
                return res.json({ success: false, error: "Validation failed" });
            }
            const data = await postModel.create({
                title,
                body,
                userId: req.user.userId
            })
            res.json({ success: true, data: data });
        } catch (err) {
            return res.status(500).json({ success: false, err })
        }
    }

    async getDataById(req, res) {
        try {
            const post = await postModel.findById(req.params.id, {
                include: [User, { model: Reply, include: User }]
            });
            res.json({ success: true, data: post });
        } catch (err) {
            res.json({ success: false, err: err });
        }
    }




}

module.exports = new ReplyController()