import React from "react";
import "./index.less";
import Share from "../share";
import Post from "../post";

import { Posts } from "../../dummy";
export default function Feed() {
    return (
        <div className="feed">
            <div className="feedWrapper">
                <Share />
                {Posts.map((post) => (
                    <Post key={post.id} post={post} />
                ))}
            </div>
        </div>
    );
}
