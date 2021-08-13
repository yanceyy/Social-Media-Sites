import React from "react";
import "./index.less";
import { PermMedia, Label, Room, EmojiEmotions } from "@material-ui/icons";
function Share() {
    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img
                        src="/utils/dinasour.png"
                        alt=""
                        className="shareTopImg"
                    />
                    <input
                        type="text"
                        className="shareTopInput"
                        placeholder="whats' in your mind"
                    />
                </div>
                <hr className="shareHr" />
                <div className="shareBottom">
                    <div className="shareOptions">
                        <div className="shareOption">
                            <PermMedia
                                htmlColor="tomato"
                                className="shareOptionIcon"
                            />
                            <span className="shareOptionText">
                                Photo or Video
                            </span>
                        </div>
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
                </div>
            </div>
        </div>
    );
}

export default Share;
