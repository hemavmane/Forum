const { replyModel, postModel, userModel } = require("../models");

class ReplyController {
    async Create(req, res) {
        try {
            const { postId, body, parentId } = req.body;

            if (!body || body.length < 3) {
                return res.json({ success: false, error: "Reply must be at least 3 characters" });
            }

            const post = await postModel.findByPk(postId);
            if (!post) return res.json({ success: false, error: "Post not found" });

            const reply = await replyModel.create({
                body,
                postId,
                parentId: parentId || null,
                userId: req.user.userId
            });

            res.json({ success: true, data: reply, message: "Reply added successfully" });

        } catch (err) {
            console.error(err);
            return res.status(500).json({ success: false, err: err.message });
        }
    }

    async getDataById(req, res) {
        try {
            const post = await postModel.findByPk(req.params.id, {
                include: [
                    {
                        model: replyModel,
                        as: "Replies",
                        include: [
                            { model: userModel, as: "User", attributes: ["id", "username"] }
                        ]
                    }
                ],
            });

            if (!post) return res.json({ success: false, error: "Post not found" });


            const replies = post.Replies || [];
            res.json({ success: true, data: replies });
        } catch (err) {
            console.error(err);
            res.json({ success: false, err });
        }
    }
    async getAll(req, res) {
        try {
            const replies = await replyModel.findAll({
                where: { postId },
                include: [
                    { model: userModel, as: "User" },
                    {
                        model: replyModel,
                        as: "Children",
                        include: [{ model: userModel, as: "User" }]
                    }
                ]
            });
            return res.status(200).json({ message: "Fetched replie", replies })
        } catch (err) {
            return res.status(500).json({ message: "internal error" })
        }

    }

    async update(req, res) {
        try {
            const reply = await replyModel.findByPk(req.params.id);

            if (!reply) return res.json({ success: false, error: "Reply not found" });


            if (reply.userId !== req.user.userId) {
                return res.status(403).json({ success: false, error: "Unauthorized" });
            }

            reply.body = req.body.body || reply.body;

            await reply.save();

            res.json({ success: true, message: "Reply updated", data: reply });

        } catch (err) {
            res.status(500).json({ success: false, error: err.message });
        }
    }

    async delete(req, res) {
        try {
            const reply = await replyModel.findByPk(req.params.id);

            if (!reply) return res.json({ success: false, error: "Reply not found" });


            if (reply.userId !== req.user.userId) {
                return res.status(403).json({ success: false, error: "Unauthorized" });
            }

            await reply.destroy();

            res.json({ success: true, message: "Reply deleted" });

        } catch (err) {
            res.status(500).json({ success: false, error: err.message });
        }
    }
}

module.exports = new ReplyController();