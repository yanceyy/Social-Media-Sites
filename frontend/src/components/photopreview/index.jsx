import React from "react";
import "./index.less";
import CloseIcon from "@material-ui/icons/Close";
function PhotoPreview({ file, removeNewPicture }) {
    return (
        <div className="photopreview">
            <div className="wrapper">
                {file ? (
                    <div className="imgitem">
                        <div className="close" onClick={removeNewPicture}>
                            <CloseIcon className="closeIcon" />
                        </div>
                        <img src={file} alt="" />
                    </div>
                ) : null}
            </div>
        </div>
    );
}
export default PhotoPreview;
