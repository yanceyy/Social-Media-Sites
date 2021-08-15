import React from "react";
import { Cake } from "@material-ui/icons";
import "./index.less";
export default function Rightbar({ position }) {
    const mainPage = (
        <div className="birthdayContainer">
            <Cake htmlColor="red" className="birthdayImg" />
            <span className="birthdatText">
                <b>Pols</b> and <b>3 other friends</b> have a birthday today
            </span>
        </div>
    );
    const profile = (
        <>
            <h4 className="rightbarTitle">User Information</h4>
            <div className="rightbarInfo">
                <div className="rightbarInfoItem">
                    <span className="rightbarInfoItemKey">city:</span>
                    <span className="rightbarInfoItemValue">Melbourne</span>
                </div>
                <div className="rightbarInfoItem">
                    <span className="rightbarInfoItemKey">From:</span>
                    <span className="rightbarInfoItemValue">VIC</span>
                </div>
                <div className="rightbarInfoItem">
                    <span className="rightbarInfoItemKey">Relationship:</span>
                    <span className="rightbarInfoItemValue">Single</span>
                </div>
            </div>
            <h4 className="rightbarTitle">User friends</h4>
            <div className="rightbarFollowings">
                <div className="rightbarFollowing">
                    <img
                        src="/utils/dinasour.png"
                        alt=""
                        className="rightbarFollowingImage"
                    />
                    <span className="rightbarFollowingName">Mornet</span>
                </div>
                <div className="rightbarFollowing">
                    <img
                        src="/utils/dinasour.png"
                        alt=""
                        className="rightbarFollowingImage"
                    />
                    <span className="rightbarFollowingName">Mornet</span>
                </div>
                <div className="rightbarFollowing">
                    <img
                        src="/utils/dinasour.png"
                        alt=""
                        className="rightbarFollowingImage"
                    />
                    <span className="rightbarFollowingName">Mornet</span>
                </div>
                <div className="rightbarFollowing">
                    <img
                        src="/utils/dinasour.png"
                        alt=""
                        className="rightbarFollowingImage"
                    />
                    <span className="rightbarFollowingName">Mornet</span>
                </div>
                <div className="rightbarFollowing">
                    <img
                        src="/utils/dinasour.png"
                        alt=""
                        className="rightbarFollowingImage"
                    />
                    <span className="rightbarFollowingName">Mornet</span>
                </div>
                <div className="rightbarFollowing">
                    <img
                        src="/utils/dinasour.png"
                        alt=""
                        className="rightbarFollowingImage"
                    />
                    <span className="rightbarFollowingName">Mornet</span>
                </div>
            </div>
        </>
    );
    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
                {position ? profile : mainPage}
            </div>
        </div>
    );
}
