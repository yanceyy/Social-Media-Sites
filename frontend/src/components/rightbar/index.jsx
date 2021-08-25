import React, { useEffect, useState } from "react";
import { Cake } from "@material-ui/icons";
import "./index.less";
import { follow, unfollow } from "../../api/action";
export default function Rightbar({ userInfo, iself, selfInfo }) {
    const mainPage = (
        <div className="birthdayContainer">
            <Cake htmlColor="red" className="birthdayImg" />
            <span className="birthdatText">
                <b>Pols</b> and <b>3 other friends</b> have a birthday today
            </span>
        </div>
    );
    const [isfollowing, setIsfollowing] = useState(false);
    useEffect(() => {
        if (
            userInfo &&
            !(
                Object.keys(userInfo).length === 0 &&
                userInfo.constructor === Object
            )
        )
            (() => {
                setIsfollowing(userInfo.followers.includes(selfInfo._id));
            })();
    }, [userInfo]);
    const followAction = async () => {
        if (isfollowing) {
            await unfollow({ selfId: selfInfo._id, userId: userInfo._id });
            setIsfollowing(false);
        } else {
            await follow({ selfId: selfInfo._id, userId: userInfo._id });
            setIsfollowing(true);
        }
    };

    // make sure that the when position is not None then do the construction
    const profile = userInfo && (
        <>
            {iself ? null : (
                <div className="rightbarInfo">
                    <button
                        onClick={followAction}
                        className={
                            "followButton" + (isfollowing ? " active" : "")
                        }
                    >
                        {isfollowing ? "unfollow" : "follow"}
                    </button>
                </div>
            )}
            <h4 className="rightbarTitle">User Information</h4>
            <div className="rightbarInfo">
                <div className="rightbarInfoItem">
                    <span className="rightbarInfoItemKey">city:</span>
                    <span className="rightbarInfoItemValue">
                        {userInfo.city || "Unkown"}
                    </span>
                </div>
                <div className="rightbarInfoItem">
                    <span className="rightbarInfoItemKey">From:</span>
                    <span className="rightbarInfoItemValue">
                        {userInfo.from || "Unkown"}
                    </span>
                </div>
                <div className="rightbarInfoItem">
                    <span className="rightbarInfoItemKey">Relationship:</span>
                    <span className="rightbarInfoItemValue">
                        {userInfo.relationship === 1
                            ? "Single"
                            : userInfo.relationship === 2
                            ? "Married"
                            : "Unkown"}
                    </span>
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
                {userInfo ? profile : mainPage}
            </div>
        </div>
    );
}
