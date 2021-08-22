import React, { useState, useEffect } from "react";
import "./index.less";
import Share from "../share";
import Post from "../post";

function Feed({ posts: p, userNameLists }) {
    const [posts, setPosts] = useState([]);
    const deletePost = (postId) => {
        setPosts(posts.filter((post) => post._id !== postId));
    };

    useEffect(() => {
        setPosts(p);
    }, [p]);

    return (
        <div className="feed">
            <div className="feedWrapper">
                <Share />
                {posts.map((post) => {
                    return (
                        <Post
                            deletePost={() => deletePost(post._id)}
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
