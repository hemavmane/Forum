import React from "react";

const Posts = () => {
    return (
        <div>
            <button>Create Post</button>

            <div>
                <h3>Post Title</h3>
                <p>Post content preview...</p>
                <small>By Hema • 2 hours ago</small>
            </div>

            <div>
                <h3>Another Post</h3>
                <p>Another content...</p>
                <small>By User • 1 day ago</small>
            </div>
        </div>
    );
};

export default Posts;