import React from "react";
import { Link, useNavigate } from "react-router-dom";


const Header = () => {
    const navigate = useNavigate()
    const token = localStorage.getItem("forumuser");
    const handleLogout = () => {
        localStorage.removeItem("forumuser");
        navigate("/login");
    };
    return (
        <header className="header">
            <div className="logo"><Link to="/">Forum</Link></div>

            <nav className="nav">
                <Link to="/">Home</Link>
                {token && <Link to="/submit-post">Create Post</Link>}

                {!token &&
                    <span><Link to="/login" className="me-1">Login</Link>
                        /<Link  className="mx-1" to="/register">Signup</Link></span>}
                {token && <span className="logout" onClick={handleLogout}>Logout</span>}
            </nav>
        </header>
    );
};

export default Header;
