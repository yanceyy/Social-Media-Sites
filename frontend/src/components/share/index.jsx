import React, { useRef, useState, useEffect } from "react";
import "./index.less";
import { PermMedia, Label, Room, EmojiEmotions } from "@material-ui/icons";
import { post, upload } from "../../api/action";
import { connect } from "react-redux";
import PhotoPreview from "../photopreview";
import Emoji from "../emoji";
import Compressor from "compressorjs"; // compress the image before uploading
function Share({ userInfo }) {
    const [file, setFile] = useState(null);
    const [fileD, setFileD] = useState(null);
    const [isUploading, SetIsUploading] = useState(false);
    const [emojiOpen, SetEmojiOpen] = useState(false);
    const postContent = useRef();
    const postFeed = async (e) => {
        e.preventDefault();
        const newPost = {
            userId: userInfo._id,
            description: postContent.current.value,
        };
        SetIsUploading(true);
        if (file) {
            new Compressor(file, {
                quality: 0.3,
                async success(compressedPicture) {
                    const data = new FormData();
                    data.append("file", compressedPicture);
                    data.append("name", compressedPicture.name);

                    try {
                        const filename = await upload(data);
                        newPost.image = filename.filePath;
                    } catch (error) {
                        console.log(error);
                    }

                    if (postContent.current.value.trim().length !== 0) {
                        try {
                            await post(newPost);
                            window.location.reload();
                        } catch (error) {
                            console.log(error);
                        }
                    }
                    SetIsUploading(false);
                },
            });
        }
    };
    const addEmoji = (emoji) => {
        postContent.current.value += emoji.native;
        postContent.current.focus();
    };
    const previewFile = (file, callback) => {
        const reader = new FileReader();
        reader.onloadend = () => callback(reader.result);
        reader.readAsDataURL(file);
    };

    useEffect(() => {
        file &&
            previewFile(file, (res) => {
                setFileD(res);
            });
    }, [file]);

    const selectNewPictures = (e) => {
        setFile(e.target.files[0]);
    };

    const removeNewPicture = () => {
        setFile(null);
        setFileD(null);
    };
    // let files =
    //     "http://localhost:8800/images/b02f1a07-f5ad-4390-9dce-5f963297208a.jpg";
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
                <PhotoPreview
                    file={fileD}
                    removeNewPicture={removeNewPicture}
                />
                <hr className="shareHr" />
                <form className="shareBottom" onSubmit={postFeed}>
                    <div className="shareOptions">
                        <label className="shareOption" htmlFor="file">
                            <PermMedia
                                htmlColor="tomato"
                                className="shareOptionIcon"
                            />
                            <span className="shareOptionText">Photo</span>
                            <input
                                style={{ display: "none" }}
                                type="file"
                                id="file"
                                accept=".png,.jpeg,.jpg"
                                onChange={selectNewPictures}
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
                                onClick={() => SetEmojiOpen(!emojiOpen)}
                            />
                            <span
                                className="shareOptionText"
                                onClick={() => SetEmojiOpen(!emojiOpen)}
                            >
                                Feelings
                            </span>
                            {emojiOpen ? (
                                <Emoji onSelect={addEmoji} topH="25px" />
                            ) : null}
                        </div>

                        <button className="shareButton" disabled={isUploading}>
                            {isUploading ? "Uploading" : "Share"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default connect((state) => ({ userInfo: state.userInfo }))(Share);
