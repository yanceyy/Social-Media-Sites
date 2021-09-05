import React, { useState } from "react";
import styled from "@emotion/styled";
import { postComment } from "../../api/action";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import Emoji from "../emoji";
import { connect } from "react-redux";
const Commenent = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px 0 5px 10px;
    position: relative;
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
const CommonentEmojiInsert = styled(InsertEmoticonIcon)`
    color: #999;
    margin-right: 10px;
    cursor: pointer;
`;
function Postnewcommpoents({ postId, selfId, setComments, selfName }) {
    // must start with capital letter
    const [comment, setComment] = useState("");
    const [emojiOpen, SetEmojiOpen] = useState(false);
    const toPostComment = async () => {
        console.log(postId, {
            userId: selfId,
            description: comment,
        });
        if (comment.trim().length > 0) {
            try {
                const res = await postComment(postId, {
                    userId: selfId,
                    description: comment,
                });
                setComments((preComments) => {
                    res.username = selfName;
                    return [...preComments, res];
                });
                console.log(res);
            } catch (error) {
                console.log(error);
            }
        }
    };
    const addEmoji = (emoji) => {
        setComment(comment + emoji.native);
    };

    return (
        <Commenent>
            <CommonentEmojiInsert onClick={() => SetEmojiOpen(!emojiOpen)} />
            {emojiOpen ? <Emoji onSelect={addEmoji} topH="33px" /> : null}
            <CommentInput
                value={comment}
                onChange={(e) => {
                    setComment(e.target.value);
                }}
                type="text"
                placeholder="Add a comment..."
            />
            <CommonentButton onClick={toPostComment}>Post</CommonentButton>
        </Commenent>
    );
}

export default connect((state) => ({
    selfId: state.userInfo._id,
    selfName: state.userInfo.username,
}))(Postnewcommpoents);
