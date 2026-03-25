import React, { useState, useRef, useEffect } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import ServiceProvider from "../services/api";
import { BASE_URL_IMG } from "../services/config";

import { useNavigate, useLocation, useParams } from "react-router-dom";
import "./posts.css";

const CreatePosts = () => {
    const token = localStorage.getItem("token");
    const quillRef = useRef();
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();

    const initialState = {
        title: "",
        body: "",
    };

    const [formdata, setFormData] = useState(initialState);


    useEffect(() => {
        if (location.state?.post) {
            setFormData({
                title: location.state.post.title,
                body: location.state.post.body,
            });
        }
    }, [location.state]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSaveAndPublic = async (e) => {
        e.preventDefault();
        try {
            let res;

            if (params.id) {

                res = await ServiceProvider.updateData(
                    params.id,
                    formdata,
                    "forumpost/update"
                );
            } else {
                res = await ServiceProvider.createData(formdata, "forumpost/create");
            }

            if (res.success) {
                alert(res.message);
                navigate("/");
            }
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        const fetchPost = async (id) => {
            try {
                const res = await ServiceProvider.getById(id, "forumpost");
                console.log(res)
                if (res.success && res.data) {
                    setFormData({
                        title: res.data.title,
                        body: res.data.body,
                    });
                }
            } catch (err) {
                console.log("Error fetching post:", err);
            }
        };

        if (params.id) {

            if (location.state?.post) {
                setFormData({
                    title: location.state.post.title,
                    body: location.state.post.body,
                });
            } else {

                fetchPost(params.id);
            }
        }
    }, [params.id, location.state]);

    const handleImageUpload = () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.click();

        input.onchange = async () => {
            const file = input.files[0];
            if (!file) return;

            const formData = new FormData();
            formData.append("file", file);

            try {
                const res = await ServiceProvider.create(formData, "forumpost/uploads");

                if (!res.success) return;

               
                const imageUrl = `${BASE_URL_IMG}${res.url}`;

                const quill = quillRef.current.getEditor();
                const range = quill.getSelection();

                const index = range ? range.index : quill.getLength();

                quill.insertEmbed(index, "image", imageUrl);

                
                setFormData(prev => ({
                    ...prev,
                    body: quill.root.innerHTML
                }));

            } catch (err) {
                console.log(err);
            }
        };
    };
    const modules = {
        toolbar: {
            container: [
                [{ header: [1, 2, false] }],
                ["bold", "italic", "underline", "strike"],
                [{ color: [] }, { background: [] }],
                ["link", "image"],
                [{ list: "ordered" }, { list: "bullet" }],
            ],
            handlers: { image: handleImageUpload },
        },
    };
    return (
        <div className="create-container">
            <form onSubmit={handleSaveAndPublic}>
                <input
                    className="input"
                    name="title"
                    value={formdata.title}
                    placeholder="Title"
                    onChange={handleChange}
                />

                <ReactQuill
                    key={formdata.body}   // 🔥 ADD THIS
                    ref={quillRef}
                    value={formdata.body}
                    modules={modules}
                    onChange={(value) =>
                        setFormData(prev => ({ ...prev, body: value }))
                    }
                />

                <button className="submit-btn mt-3 me-2" type="submit">
                    {params.id ? "Update Post" : "Save Post"}
                </button>
            </form>
        </div>
    );
};

export default CreatePosts;