import React from "react";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import "./index.less";
import LinkW from "../link";
import { connect } from "react-redux";
import { Logout } from "../../utils/commonfunctions";
import { useHistory } from "react-router-dom";
function Topbar({ userInfo }) {
    let history = useHistory();
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
                <div className="logoutContainer">
                    <LinkW to={`/profile/${userInfo._id}`}>
                        <img
                            src={userInfo.avatar || "/utils/unkown.png"}
                            alt=""
                            className="topbarImg"
                        />
                    </LinkW>
                    <div className="logout">
                        <span onClick={() => Logout(history)}>Logout</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default connect((state) => ({ userInfo: state.userInfo }))(Topbar);
