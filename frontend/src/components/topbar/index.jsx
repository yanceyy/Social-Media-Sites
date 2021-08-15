import React from "react";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import "./index.less";
import LinkW from "../link";

function Topbar() {
    return (
        <div className="topbarContainer">
            <div className="topbarLeft">
                <LinkW to="/">
                    <span className="logo">SOICALWHAT</span>
                </LinkW>
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
                    <LinkW to="/">
                        <span className="topbarLink">Homepage</span>
                    </LinkW>
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
                <LinkW to="/profile">
                    <img
                        src="/utils/dinasour.png"
                        alt=""
                        className="topbarImg"
                    />
                </LinkW>
            </div>
        </div>
    );
}

export default Topbar;
