import React, { useState } from "react";
import "./index.less";
import { PropTypes } from "prop-types";
import { MoreVert, Favorite, ThumbUp } from "@material-ui/icons";
import { postTime } from "../../utils/commonfunctions";
import { likePost } from "../../api/action";
import { Link } from "react-router-dom";
//import { getUser } from "../../api/action";
import { connect } from "react-redux";

function Post({ post, userInfo, id }) {
    const { username, avatar } = userInfo;
    const { description, comment, image, _id, createdAt } = post;
    const [like, setLike] = useState(post.likes ? post.likes.length : 0);
    const [hasLiked, sethasLiked] = useState(
        post.likes ? (post.likes.indexOf(id) !== -1 ? true : false) : false
    );
    const likeIt = async () => {
        if (!hasLiked) {
            setLike(like + 1);
            sethasLiked(true);
        } else {
            setLike(like - 1);
            sethasLiked(false);
        }
        await likePost(id, _id);
    };

    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`/profile/${userInfo._id}`}>
                            <img
                                src={avatar || "/utils/dinasour.png"}
                                alt=""
                                className="postTopLeftImg"
                            />
                        </Link>
                        <span className="postUsername">{username}</span>
                        <span className="postTime">{postTime(createdAt)}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert />
                    </div>
                </div>
                <div className="postCenter">
                    {description ? (
                        <span className="postText">{description}</span>
                    ) : null}
                    {image ? (
                        <img
                            loading="lazy"
                            src={image}
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

export default connect((state) => ({ id: state.userInfo._id }))(Post);
