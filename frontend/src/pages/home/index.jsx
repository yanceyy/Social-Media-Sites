import React from "react";
import Topbar from "../../components/topbar";
import Sidebar from "../../components/sidebar";
import Rightbar from "../../components/rightbar";
import Feed from "../../components/feed";
import "./index.less";

function HomePage() {
    return (
        <>
            <Topbar />
            <div className="homeContainer">
                <Sidebar />
                <div className="rightPlanel">
                    <Feed />
                    <Rightbar />
                </div>
            </div>
        </>
    );
}

export default HomePage;
