import React from "react";
import "./index.less";
import {
    RssFeed,
    Chat,
    PlayCircleFilled,
    Group,
    Bookmark,
    ContactSupport,
    Work,
    Event,
    School,
} from "@material-ui/icons";

function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebarWapper">
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                        <RssFeed className="sidebarItemIcon" />
                        <span className="sidebarListItemText">Feed</span>
                    </li>
                    <li className="sidebarListItem">
                        <Chat className="sidebarItemIcon" />
                        <span className="sidebarListItemText">Chats</span>
                    </li>
                    <li className="sidebarListItem">
                        <PlayCircleFilled className="sidebarItemIcon" />
                        <span className="sidebarListItemText">Videos</span>
                    </li>
                    <li className="sidebarListItem">
                        <Group className="sidebarItemIcon" />
                        <span className="sidebarListItemText">Groups</span>
                    </li>
                    <li className="sidebarListItem">
                        <Bookmark className="sidebarItemIcon" />
                        <span className="sidebarListItemText">Bookmarks</span>
                    </li>
                    <li className="sidebarListItem">
                        <ContactSupport className="sidebarItemIcon" />
                        <span className="sidebarListItemText">Questions</span>
                    </li>
                    <li className="sidebarListItem">
                        <Work className="sidebarItemIcon" />
                        <span className="sidebarListItemText">Jobs</span>
                    </li>
                    <li className="sidebarListItem">
                        <Event className="sidebarItemIcon" />
                        <span className="sidebarListItemText">Events</span>
                    </li>
                    <li className="sidebarListItem">
                        <School className="sidebarItemIcon" />
                        <span className="sidebarListItemText">Courses</span>
                    </li>
                </ul>

                <button className="sidebarButton">Show More</button>
                <hr className="sidebarHr" />
                <ul className="sidebarFriendList">
                    <li className="sidebarFriend">
                        <img
                            src="/utils/dinasour.png"
                            alt=""
                            className="sidebarFriendImg"
                        />
                        <span className="sidebarFriendName">Done</span>
                    </li>
                    <li className="sidebarFriend">
                        <img
                            src="/utils/dinasour.png"
                            alt=""
                            className="sidebarFriendImg"
                        />
                        <span className="sidebarFriendName">Done</span>
                    </li>{" "}
                    <li className="sidebarFriend">
                        <img
                            src="/utils/dinasour.png"
                            alt=""
                            className="sidebarFriendImg"
                        />
                        <span className="sidebarFriendName">Done</span>
                    </li>{" "}
                    <li className="sidebarFriend">
                        <img
                            src="/utils/dinasour.png"
                            alt=""
                            className="sidebarFriendImg"
                        />
                        <span className="sidebarFriendName">Done</span>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;
