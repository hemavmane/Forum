import React, { useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { FaCloudUploadAlt } from "react-icons/fa";

import "./posts.css";

const CreatePosts = () => {
    const [type, setType] = useState("text");
    const [content, setContent] = useState("");

    return (
        <div className="create-container">


            <div className="tabs">
                <button onClick={() => setType("text")} className={type === "text" ? "active" : ""}>Text</button>
                <button onClick={() => setType("media")} className={type === "media" ? "active" : ""}>Image & Video</button>
                <button onClick={() => setType("link")} className={type === "link" ? "active" : ""}>Link</button>
            </div>


            <input className="input" placeholder="Title" />


            {type === "text" && (
                <ReactQuill value={content} onChange={setContent} />
            )}
            {type === "media" && (
                <div className="upload-box">
                    <label htmlFor="fileUpload" className="upload-label">
                        <FaCloudUploadAlt className="upload-icon" />
                        <p>Click to upload image or video</p>
                    </label>

                    <input
                        id="fileUpload"
                        type="file"
                        className="file-input"
                    />
                </div>
            )}

            {type === "link" && (
                <input type="text" className="input" placeholder="Enter URL" />
            )}

            <button className="submit-btn mt-3 me-2">Public</button>
            <button className="submit-btn mt-3">Save  Draft</button>
        </div>
    );
};

export default CreatePosts;