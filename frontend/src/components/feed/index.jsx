import React, { useState, useEffect } from "react";
import "./index.less";
import Share from "../share";
import Post from "../post";
import { getFeedsFromUserList, getUsernname } from "../../api/action";
import { connect } from "react-redux";
function Feed({ userInfo }) {
    const [posts, setPosts] = useState([]);
    const [userName, setUsername] = useState({});
    const followings = userInfo.followings;
    const id = userInfo._id;
    useEffect(async () => {
        try {
            const Usernames = await getUsernname(followings);
            const id2UserName = {};
            Usernames.forEach((user) => {
                id2UserName[user._id] = user;
            });
            setUsername(id2UserName);
            const Feeds = await getFeedsFromUserList(followings);
            const AllFeeds = [];
            Feeds.forEach((feed) => {
                AllFeeds.push(...feed);
            });
            console.log(id2UserName);
            setPosts(AllFeeds);
        } catch (err) {
            console.log("wrong happend", err);
        }
    }, []);

    return (
        <div className="feed">
            <div className="feedWrapper">
                <Share />
                {posts.map((post) => {
                    return (
                        <Post
                            id={id}
                            key={post._id}
                            post={post}
                            userInfo={userName[post.userId]}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default connect((state) => ({ userInfo: state.userInfo }))(Feed);
