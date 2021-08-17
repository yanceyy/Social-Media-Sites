import React, { useEffect, useState } from "react";
import "./index.less";
import Topbar from "../../components/topbar";
import Sidebar from "../../components/sidebar";
import Rightbar from "../../components/rightbar";
import Feed from "../../components/feed";
import { connect } from "react-redux";
import { getUser, getFeeds } from "../../api/action";
function ProfilePage(props) {
    //const { userInfo } = props;
    const [userInfo, setUserInfo] = useState({});
    const [posts, setPosts] = useState([]);
    const { userId } = props.match.params;
    useEffect(async () => {
        const result = await getUser(userId);
        const posts = await getFeeds(userId);
        setUserInfo(result);
        setPosts(posts);
    }, []);
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
                        <Feed posts={posts} userNameLists={[userInfo]} />
                        <Rightbar position="profile" />
                    </div>
                </div>
            </div>
        </>
    );
}

export default connect((state) => ({ userInfo: state.userInfo }))(ProfilePage);
