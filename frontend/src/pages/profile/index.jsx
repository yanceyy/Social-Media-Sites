import React from "react";
import "./index.less";
import Topbar from "../../components/topbar";
import Sidebar from "../../components/sidebar";
import Rightbar from "../../components/rightbar";
import Feed from "../../components/feed";
function ProfilePage() {
    return (
        <>
            <Topbar />
            <div className="profile">
                <Sidebar />
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            {" "}
                            <img
                                className="profileCoverImg"
                                src="/utils/1.jpg"
                                alt=""
                            />
                            <img
                                className="profileUserImg"
                                src="/utils/2.jpg"
                                alt=""
                            />
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">My name</h4>
                            <h4 className="profileInfoDesc">Nothing left!</h4>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Feed />
                        <Rightbar />
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProfilePage;
