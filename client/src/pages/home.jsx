import React from "react";

const Home = () => {

    function handleCreatePost() {

    }
    return (<>
        <div className="home">


            <div className="create-post">
                <span>Start a discussion...</span>
                <a href="/submit-post">Create Post</a>
            </div>


            <div className="content">


                <div className="posts">
                    <div className="post-card">
                        <h3 className="post-title">How to learn React?</h3>
                        <p className="post-content">Can someone guide me...</p>
                        <p className="post-meta">Posted by Hema • 2h ago</p>
                    </div>
                </div>


                <div className="sidebar">
                    <div className="sidebar-box">
                        <h4>About</h4>
                        <p>This is a forum app to discuss topics.</p>
                    </div>

                    <div className="sidebar-box">
                        <h4>Trending</h4>
                        <p># React</p>
                        <p># Node</p>
                    </div>
                </div>

            </div>
        </div>
    </>)
}

export default Home