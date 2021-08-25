import React, { useEffect, useState } from "react";
import "./index.less";
import Topbar from "../../components/topbar";
import Sidebar from "../../components/sidebar";
import Rightbar from "../../components/rightbar";
import Feed from "../../components/feed";
import { connect } from "react-redux";
import { getUser, getFeeds } from "../../api/action";
import { useParams } from "react-router";
function ProfilePage({ userInfo: selfInfo }) {
    const [state, setState] = useState({ userInfo: {}, posts: [] });
    const [iself, setIsself] = useState(true);
    const { userId } = useParams();
    useEffect(() => {
        (async () => {
            const userInfo = await getUser(userId);
            const posts = await getFeeds(userId);
            posts.sort((p1, p2) => {
                return new Date(p2.createdAt) - new Date(p1.createdAt);
            });
            setState({ userInfo, posts });
            setIsself(selfInfo._id === userId);
            console.log("dsd", userInfo);
        })();
    }, [userId]);
    return (
        <>
            <Topbar />
            <div className="profile">
                <Sidebar />
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img
                                className="profileCoverImg"
                                src={
                                    state.userInfo.coverPicture ||
                                    "/utils/2.jpg"
                                }
                                alt=""
                            />
                            <img
                                className="profileUserImg"
                                src={
                                    state.userInfo.avatar || "/utils/unkown.png"
                                }
                                alt=""
                            />
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">
                                {state.userInfo.username}
                            </h4>
                            <h4 className="profileInfoDesc">Nothing left!</h4>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Feed
                            posts={state.posts}
                            userNameLists={[state.userInfo]}
                            iself={iself}
                        />
                        <Rightbar
                            iself={iself}
                            position="profile"
                            userInfo={state.userInfo}
                            selfInfo={selfInfo}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default connect((state) => ({ userInfo: state.userInfo }))(ProfilePage);
