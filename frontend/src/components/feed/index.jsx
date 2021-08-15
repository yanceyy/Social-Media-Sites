import React, { useState, useEffect } from "react";
import "./index.less";
import Share from "../share";
import Post from "../post";
import { getFeeds } from "../../api/action";
export default function Feed() {
    const [posts, setPosts] = useState([]);
    useEffect(async () => {
        try {
            const AllFeeds = await getFeeds("6113db83a20ac4d603a7406a");
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
                    console.log(post);
                    return <Post key={post._id} post={post} />;
                })}
            </div>
        </div>
    );
}
