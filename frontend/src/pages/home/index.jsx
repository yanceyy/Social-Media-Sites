import React, { useState, useEffect } from "react";
import Topbar from "../../components/topbar";
import Sidebar from "../../components/sidebar";
import Rightbar from "../../components/rightbar";
import Feed from "../../components/feed";
import { getFeedsFromUserList, getUsernname } from "../../api/action";
import "./index.less";
import { connect } from "react-redux";

function HomePage({ userInfo }) {
    const [posts, setPosts] = useState([]);
    const [userNameLists, setUsernameLists] = useState([]);
    useEffect(() => {
        (async () => {
            try {
                const followings = [...userInfo.followings];
                followings.push(userInfo._id);
                const Usernames = await getUsernname(followings);
                setUsernameLists(Usernames);
                const Feeds = await getFeedsFromUserList(followings);
                const AllFeeds = [];
                Feeds.forEach((feed) => {
                    AllFeeds.push(...feed);
                });
                AllFeeds.sort((p1, p2) => {
                    return new Date(p2.createdAt) - new Date(p1.createdAt);
                });
                setPosts(AllFeeds);
            } catch (err) {
                console.log("wrong happend", err);
            }
        })();
    }, []);
    return (
        <>
            <Topbar />
            <div className="homeContainer">
                <Sidebar />
                <div className="rightPlanel">
                    <Feed userNameLists={userNameLists} posts={posts} />
                    <Rightbar />
                </div>
            </div>
        </>
    );
}

export default connect((state) => ({ userInfo: state.userInfo }))(HomePage);
