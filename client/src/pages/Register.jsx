import React, { useState } from "react";
import ServiceProvider from "../services/api";
import { useNavigate } from "react-router-dom";
import SuccessModal from "../hooks/success";

const Register = () => {
    const initialState = {
        username: "",
        email: "",
        password: ""
    }
    const [modal, setModal] = useState({
        show: false,
        message: "",
        type: "success"
    });


    const navigate = useNavigate();
    const [data, setData] = useState(initialState)
    const handleChange = (e) => {
        const { name, value } = e.target
        setData((prev) => ({
            ...prev, [name]: value
        }))
    }


    const handleSubmit = async () => {
        try {
            const res = await ServiceProvider.createData(data, "auth/register");

            if (res.success == true) {
             
                setModal({
                    show: true,
                    message: res.message,
                    type: "success"
                });

                setTimeout(() => {
                    navigate("/login");
                }, 1500);
            } else {

                setModal({
                    show: true,
                    message: res.error || "Something went wrong!",
                    type: "error"
                });
            }
        } catch (error) {
            console.log(error)
            setModal({
                show: true,
                message: error.response?.data?.message || "Network error",
                type: "error"
            });
        }
    };
    return (
        <div className="login-outer">
            <div className="login-container" >
                <h4>Create account</h4>
                <input name="username" className="input" placeholder="username" type="text" value={data.username} onChange={handleChange} />
                <input name="email" className="input" placeholder="email" type="text" value={data.email} onChange={handleChange} />
                <input name="password" className="input" placeholder="password" type="password" value={data.password} onChange={handleChange} />
                <button className="submit-btn mt-3  me-2 text-center m-auto" onClick={handleSubmit}>sign Up</button>
            </div>
            <SuccessModal
                show={modal.show}
                message={modal.message}
                type={modal.type}
                onClose={() => {
                    setModal({ ...modal, show: false });

                    if (modal.type === "success") {
                        navigate("/login");
                    }
                }}
            />
        </div>
    )
}
export default Register