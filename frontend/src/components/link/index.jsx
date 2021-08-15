import React from "react";
import "./index.less";
import { Link } from "react-router-dom";

function LinkW(props) {
    const { children, ...others } = props;
    return (
        <Link className="link" {...others}>
            {children}
        </Link>
    );
}

export default LinkW;
