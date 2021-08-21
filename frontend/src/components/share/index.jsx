import React, { useRef, useState } from "react";
import "./index.less";
import { PermMedia, Label, Room, EmojiEmotions } from "@material-ui/icons";
import { post, upload } from "../../api/action";
import { connect } from "react-redux";

function Share({ userInfo }) {
    const [file, setFile] = useState(null);
    const postContent = useRef();
    const postFeed = async (e) => {
        e.preventDefault();
        const newPost = {
            userId: userInfo._id,
            description: postContent.current.value,
        };

        if (file) {
            const data = new FormData();
            data.append("file", file);
            data.append("name", file.name);

            try {
                const filename = await upload(data);
                newPost.image = filename.filePath;
            } catch (error) {
                console.log(error);
            }
        }

        if (postContent.current.value.trim().length !== 0) {
            try {
                console.log(newPost);
                await post(newPost);
                window.location.reload();
            } catch (error) {
                console.log(error);
            }
        }
    };
    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img
                        src={userInfo.avatar || "/utils/unkown.png"}
                        alt=""
                        className="shareTopImg"
                    />
                    <input
                        ref={postContent}
                        type="text"
                        className="shareTopInput"
                        placeholder={`what's in your mind ${userInfo.username}?`}
                    />
                </div>
                <hr className="shareHr" />
                <form className="shareBottom" onSubmit={postFeed}>
                    <div className="shareOptions">
                        <label className="shareOption" htmlFor="file">
                            <PermMedia
                                htmlColor="tomato"
                                className="shareOptionIcon"
                            />
                            <span className="shareOptionText">
                                Photo or Video
                            </span>
                            <input
                                style={{ display: "none" }}
                                type="file"
                                id="file"
                                accept=".png,.jpeg,.jpg"
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                        </label>
                        <div className="shareOption">
                            <Label
                                htmlColor="blue"
                                className="shareOptionIcon"
                            />
                            <span className="shareOptionText">Tag</span>
                        </div>
                        <div className="shareOption">
                            <Room
                                htmlColor="green"
                                className="shareOptionIcon"
                            />
                            <span className="shareOptionText">Location</span>
                        </div>
                        <div className="shareOption">
                            <EmojiEmotions
                                htmlColor="goldenrod"
                                className="shareOptionIcon"
                            />
                            <span className="shareOptionText">Feelings</span>
                        </div>
                        <button className="shareButton">Share</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default connect((state) => ({ userInfo: state.userInfo }))(Share);
