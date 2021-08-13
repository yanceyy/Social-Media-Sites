import React from "react";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import "./index.less";

function Topbar() {
    return (
        <div className="topbarContainer">
            <div className="topbarLeft">
                <span className="logo" onClick={() => location.assign("/")}>
                    SOICALWHAT
                </span>
            </div>
            <div className="topbarCenter">
                <div className="searchbar">
                    <Search className="searchIcon" />
                    <input
                        type="text"
                        placeholder="Search"
                        className="searchInput"
                    />
                </div>
            </div>

            <div className="topbarRight">
                <div className="topbarLinks">
                    <span className="topbarLink">Homepage</span>
                    <span className="topbarLink">Timeline</span>
                </div>
                <div className="topbarIcons">
                    <span className="topbarIconItem">
                        <Person />
                        <span className="topbarIconBadge">1</span>
                    </span>
                    <span className="topbarIconItem">
                        <Chat />
                        <span className="topbarIconBadge">1</span>
                    </span>
                    <span className="topbarIconItem">
                        <Notifications />
                        <span className="topbarIconBadge">1</span>
                    </span>
                </div>
                <img
                    src="/utils/dinasour.png"
                    alt=""
                    className="topbarImg"
                    onClick={() => location.assign("/profile")}
                />
            </div>
        </div>
    );
}

export default Topbar;
