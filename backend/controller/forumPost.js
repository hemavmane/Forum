const { userModel, postModel, replyModel } = require("../models");
const slugify = require("slugify");
const path = require("path");


class ForumPost {
    async Create(req, res) {
        try {
            const { title, body, page_slug } = req.body;

            if (!title || title.length < 3) {
                return res.json({ success: false, error: "Title too short" });
            }

            if (!body) {
                return res.json({ success: false, error: "Content required" });
            }

            let slug = page_slug || slugify(title, { lower: true, strict: true });
            if (slug.length > 50) slug = slug.slice(0, 50);

            const data = await postModel.create({
                title,
                body,
                page_slug: slug,
                userId: req.user.userId
            });

            res.json({ success: true, data, message: "Post created successfully" });

        } catch (err) {
            console.error(err);
            res.status(500).json({ success: false, message: err.message });
        }
    }


    async upload(req, res) {
        try {
            const url = `/uploads/${req.file.filename}`;
            res.json({ success: true, url });
        } catch (err) {
            res.status(500).json({ success: false, message: "Upload failed" });
        }
    }

    async getAll(req, res) {
        try {
            const posts = await postModel.findAll({
                where: {
                    isDeleted: false
                },
                include: [
                    {
                        model: userModel,
                        as: "User",
                        attributes: ["id", "username", "email"]
                    },

                    {
                        model: replyModel,
                        as: "Replies",
                        include: [
                            {
                                model: userModel,
                                as: "User",
                                attributes: ["id", "username"]
                            }
                        ]
                    }
                ],
                order: [["createdAt", "DESC"]]
            });

            res.json({ success: true, data: posts });
        } catch (err) {
            console.error(err);
            res.status(500).json({ success: false, message: err.message });
        }
    }
    async getDataById(req, res) {
        try {
            const post = await postModel.findByPk(req.params.id, {
                include: [
                    {
                        model: userModel,
                        as: "User",
                        attributes: ["id", "username", "email"]
                    },
                    {
                        model: replyModel,
                        as: "Replies",
                        include: [
                            {
                                model: userModel,
                                as: "User",
                                attributes: ["id", "username"]
                            }
                        ]
                    }
                ]
            });

            if (!post) {
                return res.json({ success: false, error: "Post not found" });
            }

            res.json({ success: true, data: post });

        } catch (err) {
            console.error(err);
            res.status(500).json({ success: false, err });
        }
    }


    async updatePost(req, res) {
        try {
            const { title, body } = req.body;
            const post = await postModel.findByPk(req.params.id);

            if (!post) return res.json({ success: false, error: "Post not found" });

            post.title = title || post.title;
            post.body = body || post.body;

            await post.save();

            res.json({ success: true, message: "Post updated successfully", data: post });
        } catch (err) {
            res.json({ success: false, error: err.message || err });
        }
    }

    async trash(req, res) {
        try {
            const post = await postModel.findByPk(req.params.id, {
                include: [{ model: replyModel, as: "Replies" }]
            });

            if (!post) {
                return res.json({ success: false, error: "Post not found" });
            }


            if (post.Replies && post.Replies.length > 0) {
                return res.json({
                    success: false,
                    error: "Cannot delete post with replies"
                });
            }

            post.isDeleted = true;
            await post.save();

            res.json({ success: true, message: "Post moved to trash", data: post });

        } catch (err) {
            res.json({ success: false, error: err.message || err });
        }
    }

}

module.exports = new ForumPost();