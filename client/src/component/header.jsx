import React from "react";


const Header = () => {
    return (
        <header className="header">
            <div className="logo">Forum</div>

            <nav className="nav">
                <a href="/">Home</a>
                <a href="/create-post">Create Post</a>
                <a href="/login">Login</a>
            </nav>
        </header>
    );
};

export default Header;