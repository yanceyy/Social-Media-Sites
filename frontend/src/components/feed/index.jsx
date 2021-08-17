import React from "react";
import "./index.less";
import Share from "../share";
import Post from "../post";

function Feed({ posts, userNameLists }) {
    return (
        <div className="feed">
            <div className="feedWrapper">
                <Share />
                {posts.map((post) => {
                    return (
                        <Post
                            key={post._id}
                            post={post}
                            userInfo={
                                userNameLists.filter(
                                    (item) => item._id === post.userId
                                )[0]
                            }
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default Feed;
