import React, { useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import CancelIcon from "@material-ui/icons/Cancel";
import Postnewcommpoents from "../post/postnewcommpoents";
import { getPost } from "../../api/action";
import { BASEIMAGEURL } from "../../utils/const";
import {
    disableBodyScroll,
    enableBodyScroll,
    clearAllBodyScrollLocks,
} from "body-scroll-lock"; //show same behaver as the Instagram

const Conatiner = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const CloseButton = styled.button`
    width: 50px;
    height: 50px;
    position: absolute;
    top: 10px;
    right: 30px;
    background-color: transparent;
    border: none;
    color: white;
    font-size: 50px;
    cursor: pointer;
`;
const Card = styled.div`
    width: 900px;
    height: 600px;
    background-color: white;
    display: flex;
    justify-content: space-between;
`;
const CardPhoto = styled.div`
    flex: 1;
`;
const CardPhotoImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;
const CommentCard = styled.div`
    width: 300px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;
const CardName = styled.div`
    width: 100%;
    height: 80px;
    display: flex;
    border-bottom: 1px rgba(0, 0, 0, 0.1) solid;
    align-items: center;
`;
const CardComments = styled.div`
    flex: 1;
    padding: 10px;

    & > .commentstitle {
        font-weight: bold;
        margin: 5px 0;
    }

    & .name {
        margin-right: 5px;
    }
    & .des {
        margin-left: 5px;
        word-wrap: break-word;
        overflow-wrap: wrap;
    }
`;

const CardCommentsBottom = styled.div`
    width: 100%;
    height: 160px;
    border-top: 1px rgba(0, 0, 0, 0.1) solid;
`;
const CardCommentsOperation = styled.div`
    width: 100%;
    height: 120px;
    border-bottom: 1px rgba(0, 0, 0, 0.1) solid;
`;
const UserImg = styled.img`
    width: 50px;
    height: 50px;
    margin: 0 30px;
    padding: 2px;
    border: red 2px solid;
    border-radius: 50%;
`;

const UserName = styled.span``;
function useExpandcard() {
    const panel = useRef();
    const [postId, SetPostId] = useState(undefined); //show when receive a id than undefined
    const [show, setShow] = useState(false);
    const [postInfo, SetPostInfo] = useState({}); //store post info
    useEffect(async () => {
        if (postId !== undefined) {
            const post = await getPost(postId);
            setShow(true);
            SetPostInfo(post);
            disableBodyScroll(window);
            SetPostId(undefined);
            //when click on the back then the pop up panel has been hiddened
            const hiddenPanel = (e) => {
                if (e.target === panel.current) {
                    enableBodyScroll(window);
                    setShow(false);
                }
            };
            panel.current.addEventListener("click", hiddenPanel);
            return () => {
                clearAllBodyScrollLocks();
                panel.current.removeEventListener("click", hiddenPanel);
            };
        }
    }, [postId]);

    const content = function () {
        return show ? (
            <Conatiner ref={panel}>
                <CloseButton
                    onClick={() => {
                        enableBodyScroll(window);
                        setShow(false);
                    }}
                >
                    <CancelIcon />
                </CloseButton>
                <Card>
                    <CardPhoto>
                        <CardPhotoImg
                            src={
                                BASEIMAGEURL + postInfo.image || "/utils/1.jpg"
                            }
                        />
                    </CardPhoto>
                    <CommentCard>
                        <CardName>
                            <UserImg src={"/utils/unkown.png"} alt="" />
                            <UserName>{postInfo.userId}</UserName>
                        </CardName>
                        <CardComments>
                            {postInfo.description}
                            <p className="commentstitle">Comments:</p>
                            <ul className="list">
                                {postInfo.comments
                                    ? postInfo.comments.map((comment) => (
                                          <li key={comment._id}>
                                              <span className="name">
                                                  {comment.userId}
                                              </span>
                                              :
                                              <span className="des">
                                                  {comment.description}
                                              </span>
                                          </li>
                                      ))
                                    : "no comments"}
                            </ul>
                        </CardComments>
                        <CardCommentsBottom>
                            <CardCommentsOperation></CardCommentsOperation>
                            <Postnewcommpoents></Postnewcommpoents>
                        </CardCommentsBottom>
                    </CommentCard>
                </Card>
            </Conatiner>
        ) : null;
    };
    return [content, SetPostId];
}

export default useExpandcard;
