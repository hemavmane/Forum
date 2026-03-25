import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ServiceProvider from "../services/api";
import { FaEdit, FaTrash, FaReply } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa6";
import { useSelector } from "react-redux";
import "./PostDetails.css";

const PostDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [post, setPost] = useState(null);
    const [replies, setReplies] = useState([]);

    const [replyText, setReplyText] = useState("");
    const [activeReplyId, setActiveReplyId] = useState(null);
    const [replyInputs, setReplyInputs] = useState({});

    const [editingReplyId, setEditingReplyId] = useState(null);
    const [editText, setEditText] = useState("");

    const [showLoginModal, setShowLoginModal] = useState(false);


    const user = useSelector(state => state.auth.user);
    const token = useSelector(state => state.auth.token);
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

    useEffect(() => {
        fetchPost();
    }, [id]);

    const fetchPost = async () => {
        const postRes = await ServiceProvider.getById(id, "forumpost");

        if (postRes.success) {
            setPost(postRes.data);

            const replyRes = await ServiceProvider.getById(id, "reply");
            if (replyRes.success) setReplies(replyRes.data);
        }

    };
    console.log(post)
    const fetchReplies = async () => {
        const res = await ServiceProvider.getById(id, "reply");
        if (res.success) setReplies(res.data);
    };

    const requireAuth = () => {
        if (!token) {
            setShowLoginModal(true);
            return false;
        }
        return true;
    };


    const handleReplySubmit = async () => {
        if (!requireAuth()) return;
        if (!replyText.trim()) return;

        const res = await ServiceProvider.createData(
            { postId: post.id, body: replyText },
            "reply/create"
        );

        if (res.success) {
            setReplyText("");
            fetchReplies();
        }
    };


    const renderReplies = (list, parent = null) => {
        return list
            .filter(r => r.parentId === parent)
            .map(reply => (
                <div key={reply.id} className="reply-wrapper">

                    <div className="reply-card">

                        <div className="reply-header">
                            <div className="avatar">
                                {reply?.User?.username?.charAt(0)?.toUpperCase()}
                            </div>
                            <span className="username">{reply?.User?.username}</span>
                        </div>


                        {editingReplyId === reply.id ? (
                            <div className="edit-box">
                                <textarea
                                    value={editText}
                                    onChange={(e) => setEditText(e.target.value)}
                                />

                                <div className="edit-actions">
                                    <button
                                        className="btn save"
                                        onClick={async () => {
                                            const res = await ServiceProvider.updateData(
                                                reply.id,
                                                { body: editText },
                                                "reply/update"
                                            );
                                            if (res.success) {
                                                setEditingReplyId(null);
                                                fetchReplies();
                                            }
                                        }}
                                    >✔</button>

                                    <button
                                        className="btn cancel"
                                        onClick={() => setEditingReplyId(null)}
                                    >✖</button>
                                </div>
                            </div>
                        ) : (
                            <p className="reply-text">{reply.body}</p>
                        )}


                        <div className="reply-actions">

                            <button onClick={() => setActiveReplyId(reply.id)}>
                                <FaRegComment />
                            </button>

                            {Number(user?.userId) === Number(reply.userId) && (
                                <>
                                    <button
                                        onClick={() => {
                                            setEditingReplyId(reply.id);
                                            setEditText(reply.body);
                                        }}
                                    >
                                        <FaEdit />
                                    </button>

                                    <button
                                        onClick={async () => {
                                            const res = await ServiceProvider.trash(
                                                reply.id,
                                                "reply/trash"
                                            );
                                            if (res.success) fetchReplies();
                                        }}
                                    >
                                        <FaTrash />
                                    </button>
                                </>
                            )}
                        </div>
                    </div>


                    <div className="nested">
                        {renderReplies(list, reply.id)}
                    </div>


                    {activeReplyId === reply.id && (
                        <div className="nested-reply-box">
                            <textarea
                                placeholder="Write reply..."
                                value={replyInputs[reply.id] || ""}
                                onChange={(e) =>
                                    setReplyInputs(prev => ({
                                        ...prev,
                                        [reply.id]: e.target.value
                                    }))
                                }
                            />

                            <button
                                onClick={async () => {
                                    if (!requireAuth()) return;

                                    const text = replyInputs[reply.id];
                                    if (!text?.trim()) return;

                                    const res = await ServiceProvider.createData(
                                        {
                                            postId: post.id,
                                            body: text,
                                            parentId: reply.id
                                        },
                                        "reply/create"
                                    );

                                    if (res.success) {
                                        setReplyInputs(prev => ({
                                            ...prev,
                                            [reply.id]: ""
                                        }));
                                        setActiveReplyId(null);
                                        fetchReplies();
                                    }
                                }}
                            >
                                Reply
                            </button>
                        </div>
                    )}
                </div>
            ));
    };

    if (!post) return <p>Loading...</p>;

    return (
        <div className="post-details-container">

            <div className="post-card">
                <div className="post-header">
                    <div className="user-info">
                        <div className="avatar">
                            {post?.
                                User?.username?.charAt(0).toUpperCase()}
                        </div>

                        <div className="user-meta">
                            <span className="username">
                                {post?.User?.username || "Anonymous"}
                            </span>
                            <span className="post-time">
                                • {new Date(post.createdAt).toLocaleString()}
                            </span>
                        </div>
                    </div>
                </div>
                <h2>{post.title}</h2>

                <div className="post-body" dangerouslySetInnerHTML={{ __html: post.body }} />


                <div className="reply-input">
                    <textarea
                        placeholder="Write a reply..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                    />
                    <button onClick={handleReplySubmit}>Reply</button>
                </div>

                <div className="replies-list">
                    {replies.length > 0
                        ? renderReplies(replies)
                        : <p>No replies yet</p>}
                </div>
            </div>


            {showLoginModal && (
                <div className="modal-backdrop">
                    <div className="modal-box">
                        <h3>Login Required</h3>
                        <button onClick={() => navigate("/login")}>Login</button>
                        <button onClick={() => navigate("/register")}>Register</button>
                        <button onClick={() => setShowLoginModal(false)}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PostDetails;