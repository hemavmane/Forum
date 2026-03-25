import React, { useEffect, useState } from "react";
import ServiceProvider from "../services/api";
import "./Home.css";
import { CiHeart } from "react-icons/ci";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaArrowUp, FaArrowDown, FaCommentAlt, FaShareAlt, FaHeart, FaEdit, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { IoShareSocialOutline } from "react-icons/io5";
import SuccessModal from "../hooks/success";
import { FaRegComment } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { BASE_URL_IMG } from "../services/config";
const Home = () => {
    const [posts, setPosts] = useState([]);
    const [likedPosts, setLikedPosts] = useState({});
    const [loading, setLoading] = useState(false);
    const [votes, setVotes] = useState({});
    const [userId, setUserId] = useState(null);
    const user = useSelector(state => state.auth.user);

    const [modal, setModal] = useState({
        show: false,
        message: "",
        type: "success"
    });


    useEffect(() => {

        if (user?.token) {
            const payload = JSON.parse(atob(user?.token.split(".")[1]));

            setUserId(payload.userId);
        }
        fetchPosts();

    }, []);

    const fetchPosts = async () => {
        try {
            setLoading(true);
            const res = await ServiceProvider.getPublished("forumpost");
            if (res.success) {
                setPosts(res.data);
                const initialVotes = {};
                res.data.forEach(post => (initialVotes[post.id] = 0));
                setVotes(initialVotes);
            }
        } catch (err) {
            console.error("Error fetching posts:", err);
        } finally {
            setLoading(false)
        }
    };
    const navigate = useNavigate();

    const goToPostDetails = (id, page_slug) => {
        navigate(`/comments/${id}/${page_slug}`);
    };



    const toggleLike = (postId) => {
        setLikedPosts(prev => ({ ...prev, [postId]: !prev[postId] }));
    };

    const upvote = (postId) => {
        setVotes(prev => ({ ...prev, [postId]: prev[postId] + 1 }));
    };

    const downvote = (postId) => {
        setVotes(prev => ({ ...prev, [postId]: prev[postId] - 1 }));
    };

    const handleDelete = async (post) => {
        console.log(post)
        const hasReplies = post.Replies && post.Replies.length > 0;

        if (hasReplies) {

            setModal({
                show: true,
                message: "Cannot delete post with replies",
                type: "error"
            });

            return;
        }

        try {
            const res = await ServiceProvider.trash(post.id, "forumpost/trash");

            if (res.success === true) {
                setPosts(prev => prev.filter(p => p.id !== post.id));
                setModal({
                    show: true,
                    message: res.message,
                    type: "success"
                });
            }
        } catch (err) {
            console.error("Delete error:", err);
        }
    };


    return (
        <div className="home-container">

            <div className="posts-list">
                {loading ? (
                    <p>Loading...</p>
                ) : posts?.length > 0 ? (

                    <> {posts?.map(post => {
                        const commentCount = post.Replies?.length || 0;
                        const likeCount = likedPosts[post.id] ? 1 : 0;

                        return (
                            <div className="reddit-post-card" key={post.id}>


                                <div className="post-content-section">
                                    <div className="post-header">
                                        <div className="user-info">
                                            <div className="avatar">
                                                {post?.User?.username?.charAt(0).toUpperCase()}
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
                                    <h3 className="post-title">{post.title}</h3>
                                    <div
                                        className="post-body post-preview"
                                        dangerouslySetInnerHTML={{
                                            __html: post.body.replaceAll(
                                                'src="/uploads',
                                                `src="http://localhost:8000/uploads`
                                            )
                                        }}
                                    />

                                    <div className="post-actions">
                                        <div className="vote-section">
                                            <button onClick={() => upvote(post.id)}><FaArrowUp /></button>
                                            <span>{votes[post.id]}</span>
                                            <button onClick={() => downvote(post.id)}><FaArrowDown /></button>
                                        </div>
                                        <span onClick={() => goToPostDetails(post.id, post.page_slug)}>
                                            <FaRegComment /> {commentCount} Reply
                                        </span>

                                        <span onClick={() => toggleLike(post.id)}>
                                            {likedPosts[post.id] ?
                                                <FaHeart className="red" /> : <CiHeart />}
                                            {likeCount} Like
                                        </span>

                                        {userId === post.userId && (
                                            <>
                                                <Link to={`/edit-post/${post.id}`}><FaEdit /> </Link>
                                                <span><FaRegTrashAlt onClick={() => handleDelete(post)} className="red" /> </span>
                                            </>
                                        )}

                                        <span><FaShareAlt /> </span>
                                    </div>


                                </div>
                            </div>
                        );
                    })}</>

                ) : (
                    <div className="empty-state">
                        <h3>No posts yet </h3>
                        <p>Be the first one to share something!</p>
                    </div>
                )}   </div>

            <div className="sidebar">
                <div className="sidebar-box">
                    <h4>About</h4>
                    <p>This is a forum app to discuss topics.</p>
                </div>

                <div className="sidebar-box">
                    <h4>Trending</h4>
                    <p>#React</p>
                    <p>#Node</p>
                </div>

                <div className="sidebar-box">
                    <h4>Communities</h4>
                    <p>r/ReactJS</p>
                    <p>r/Node</p>
                </div>
            </div>
            <SuccessModal
                show={modal.show}
                message={modal.message}
                type={modal.type}
                onClose={() => {
                    setModal({ ...modal, show: false });
                }}
            />
        </div>
    );
};

export default Home;