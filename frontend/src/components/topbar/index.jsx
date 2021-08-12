import React from "react";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import "./index.less";

function Topbar() {
    return (
        <div className="topbarContainer">
            <div className="topbarLeft">
                <span className="logo">SOICALWHAT</span>
            </div>
            <div className="topbarCenter"></div>
            <div className="searchbar">
                <Search />
                <input
                    type="text"
                    placeholder="Search"
                    className="searchInput"
                />
            </div>
            <div className="topbarRight">
                <div className="topbarLinks">
                    <span className="topbarLink">Homepage</span>
                    <span className="topbarLink">Timeline</span>
                </div>
                <div className="topbarIcons">
                    <span className="topbarIconItem">
                        <Person />
                        <span className="topbarIIconBadge">1</span>
                    </span>
                    <span className="topbarIconItem">
                        <Chat />
                        <span className="topbarIIconBadge">1</span>
                    </span>
                    <span className="topbarIconItem">
                        <Notifications />
                        <span className="topbarIIconBadge">1</span>
                    </span>
                </div>
            </div>
            <img src="/utils/dinasour.png" alt="" className="topbarImg" />
        </div>
    )
}

export default Topbar;
