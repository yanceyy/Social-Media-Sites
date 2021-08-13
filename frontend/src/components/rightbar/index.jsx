import React from "react";
import { Cake } from "@material-ui/icons";
import "./index.less";
export default function Rightbar() {
    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
                <div className="birthdatContainer">
                    <Cake htmlColor="red" className="birthdayImg" />
                    <span className="birthdatText">
                        <b>Pols</b> and <b>3 other friends</b> have a birthday
                        today
                    </span>
                </div>
            </div>
        </div>
    );
}
