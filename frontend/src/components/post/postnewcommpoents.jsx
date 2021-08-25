import React, { useState } from "react";
import styled from "@emotion/styled";
const Commenent = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px 0 5px 20px;
`;
const CommentInput = styled.input`
    flex: 1;
    border: none;
    outline: none;
`;
const CommonentButton = styled.button`
    width: 50px;
    background-color: transparent;
    border: none;
    color: #1775ee;
    font-weight: bold;
    cursor: pointer;
`;
function Postnewcommpoents() {
    // must start with capital letter
    const [comment, setComment] = useState("");

    return (
        <Commenent>
            <CommentInput
                value={comment}
                onChange={(e) => {
                    setComment(e.target.value);
                }}
                type="text"
                placeholder="Add a comment..."
            />
            <CommonentButton>Post</CommonentButton>
        </Commenent>
    );
}

export default Postnewcommpoents;
