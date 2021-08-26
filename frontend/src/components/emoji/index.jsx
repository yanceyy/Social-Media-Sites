import React from "react";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
function Emoji({ onSelect, topH }) {
    return (
        <>
            <Picker
                set="apple"
                onSelect={onSelect}
                showPreview={false}
                size={16}
                title="Pick your emoji…"
                style={{
                    position: "absolute",
                    top: topH,
                    left: "0px",
                    zIndex: 999,
                }}
            />
        </>
    );
}

export default Emoji;
