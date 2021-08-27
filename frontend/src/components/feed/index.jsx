import React, { useState, useEffect } from "react";
import "./index.less";
import Share from "../share";
import Post from "../post";
import useExpandcard from "./expandcard";
function Feed({ posts: p, userNameLists, iself }) {
    const [posts, setPosts] = useState([]);
    const [Content, SetPostId] = useExpandcard();
    const deletePost = (postId) => {
        setPosts(posts.filter((post) => post._id !== postId));
    };
    useEffect(() => {
        setPosts(p);
    }, [p]);

    return (
        <>
            <div className="feed">
                <div className="feedWrapper">
                    {iself ? <Share /> : null}
                    {posts.map((post) => {
                        return (
                            <Post
                                deletePost={() => deletePost(post._id)}
                                key={post._id}
                                post={post}
                                SetPostId={SetPostId}
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
            <Content />
        </>
    );
}

export default Feed;
