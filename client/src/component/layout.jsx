import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";



const Layout = ({ children }) => {
    return (
        <div className="app">
            <Header />

            <main className="main">
                <Outlet />
            </main>

            <Footer />
        </div>
    )
}

export default Layout