import React, { useState, useEffect } from "react";
import "./index.less";
import Share from "../share";
import Post from "../post";
import { getFeeds, getUsernname } from "../../api/action";
import { unique } from "../../utils/commonfunctions";
export default function Feed() {
    const [posts, setPosts] = useState([]);
    const [userName, setUsername] = useState({});
    useEffect(async () => {
        try {
            const AllFeeds = await getFeeds("6113db83a20ac4d603a7406a");
            let userIds = AllFeeds.map((item) => item.userId);
            userIds = unique(userIds);
            const Usernames = await getUsernname(userIds);
            const id2UserName = {};
            Usernames.forEach((user) => {
                id2UserName[user._id] = user;
            });
            setUsername(id2UserName);
            setPosts(AllFeeds);
            console.log(userName);
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
