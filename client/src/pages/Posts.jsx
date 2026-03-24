import { useEffect, useState } from "react";
import API from "../services/api";
import "./post.css"

import { Link } from "react-router-dom";

export default function Posts() {
   

    return (
        <div className="container mt-4">
            <h3>Posts</h3>

            <div className="posts-container">
                <h3 className="posts-title">Posts</h3>

                <input
                    className="post-input"
                    placeholder="title"
                />

                <textarea
                    className="post-textarea"
                    placeholder="body"
                />

                <button className="post-btn">
                    Add Post
                </button>
            </div>

           
        </div>
    );
}