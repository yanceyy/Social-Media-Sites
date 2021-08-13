import React, { useState } from "react";
import "./index.less";
import { PropTypes } from "prop-types";
import { MoreVert, Favorite, ThumbUp } from "@material-ui/icons";
function Post({ post }) {
    const { desc, photo, comment } = post;
    const [like, setLike] = useState(post.like);
    const [hasLiked, sethasLiked] = useState(false);
    const likeIt = () => {
        if (!hasLiked) {
            setLike(like + 1);
            sethasLiked(true);
        } else {
            setLike(like - 1);
            sethasLiked(false);
        }
    };
    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <img
                            src="/utils/dinasour.png"
                            alt=""
                            className="postTopLeftImg"
                        />
                        <span className="postUsername">what</span>
                        <span className="postTime">posted 5 mins ago</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert />
                    </div>
                </div>
                <div className="postCenter">
                    {desc ? <span className="postText">{desc}</span> : null}
                    {photo ? (
                        <img
                            loading="lazy"
                            src={photo}
                            alt=""
                            className="postImg"
                        />
                    ) : null}
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <Favorite
                            htmlColor="red"
                            className="Likebutton"
                            onClick={likeIt}
                        />
                        <ThumbUp htmlColor="orange" className="Thumbbutton" />
                        {like ? (
                            <span className="postLikeCounter">
                                {like} people liked it
                            </span>
                        ) : null}
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">
                            {comment} comments
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

Post.propTypes = {
    post: PropTypes.object.isRequired,
};

export default Post;
