import React, { useState, useRef, useEffect } from "react";
import "./index.less";
import { PropTypes } from "prop-types";
import { MoreVert, Favorite, ThumbUp } from "@material-ui/icons";
import { postTime } from "../../utils/commonfunctions";
import { likePost, deletePost } from "../../api/action";
import LinkW from "../link";
//import { getUser } from "../../api/action";
import { connect } from "react-redux";
import { BASEIMAGEURL } from "../../utils/const";
import Postnewcommpoents from "./postnewcommpoents";
function Post({ post, userInfo, id, deletePost: dp }) {
    const { username, avatar, _id: userId } = userInfo;
    const [showMenu, setShowMenu] = useState(false);
    const muneRef = useRef();
    const { description, comments, image, _id, createdAt } = post;
    const [like, setLike] = useState(post.likes ? post.likes.length : 0);
    const [hasLiked, sethasLiked] = useState(
        post.likes ? (post.likes.indexOf(id) !== -1 ? true : false) : false
    );
    useEffect(() => {
        document.addEventListener("click", () => {
            setShowMenu(false);
        });
    }, []);
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

    const openMenu = (ev) => {
        ev.stopPropagation();
        setShowMenu((s) => !s);
    };

    const deleteAction = async () => {
        await deletePost({ userId, postId: _id });
        dp();
    };

    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <LinkW to={`/profile/${userInfo._id}`}>
                            <img
                                src={avatar || "/utils/unkown.png"}
                                alt=""
                                className="postTopLeftImg"
                            />
                        </LinkW>
                        <LinkW to={`/profile/${userInfo._id}`}>
                            <span className="postUsername">{username}</span>
                        </LinkW>
                        <span className="postTime">{postTime(createdAt)}</span>
                    </div>
                    <div className="postTopRight" ref={muneRef}>
                        <MoreVert className="MoreVert" onClick={openMenu} />
                        {showMenu && (
                            <ul className="menu">
                                <li className="menu_share">Share</li>
                                {id === userId ? (
                                    <li
                                        className="menu_delete"
                                        onClick={deleteAction}
                                    >
                                        Delete
                                    </li>
                                ) : null}
                            </ul>
                        )}
                    </div>
                </div>
                <div className="postCenter">
                    {description ? (
                        <span className="postText">{description}</span>
                    ) : null}
                    {image ? (
                        <img
                            loading="lazy"
                            src={BASEIMAGEURL + image}
                            alt=""
                            className="postImg"
                        />
                    ) : null}
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <Favorite
                            className={
                                "Likebutton" + (hasLiked ? " alreadyLike" : "")
                            }
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
                            {comments ? comments.length : 0} comments
                        </span>
                    </div>
                </div>
                <ul className="comments">
                    {comments
                        ? comments.map((comment) => (
                              <li key={comment._id}>{comment.description}</li>
                          ))
                        : 0}
                </ul>
                <hr className="shareHr" />
                <Postnewcommpoents />
            </div>
        </div>
    );
}

Post.propTypes = {
    post: PropTypes.object.isRequired,
};

export default connect((state) => ({ id: state.userInfo._id }))(Post);
