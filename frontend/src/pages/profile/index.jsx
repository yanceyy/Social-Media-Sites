import React from "react";
import "./index.less";
import Topbar from "../../components/topbar";
import Sidebar from "../../components/sidebar";
import Rightbar from "../../components/rightbar";
import Feed from "../../components/feed";
import { connect } from "react-redux";
function ProfilePage(props) {
    const { userInfo } = props;
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
                                src={userInfo.coverPicture || "/utils/2.jpg"}
                                alt=""
                            />
                            <img
                                className="profileUserImg"
                                src={userInfo.avatar || "/utils/2.jpg"}
                                alt=""
                            />
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">
                                {userInfo.username}
                            </h4>
                            <h4 className="profileInfoDesc">Nothing left!</h4>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Feed />
                        <Rightbar position="profile" />
                    </div>
                </div>
            </div>
        </>
    );
}

export default connect((state) => ({ userInfo: state.userInfo }))(ProfilePage);
