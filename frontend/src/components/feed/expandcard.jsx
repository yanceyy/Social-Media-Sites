import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import CancelIcon from "@material-ui/icons/Cancel";
import Postnewcommpoents from "../post/postnewcommpoents";
import { getPost } from "../../api/action";
import { BASEIMAGEURL } from "../../utils/const";

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
    const [postId, SetPostId] = useState(undefined);
    const [show, setShow] = useState(false);
    const [postInfo, SetPostInfo] = useState({});
    useEffect(async () => {
        if (postId !== undefined) {
            const post = await getPost(postId);
            console.log(BASEIMAGEURL + post.image);
            SetPostInfo(post);
            setShow(true);
            const hiddenPanel = () => setShow(false);
            document.addEventListener("click", hiddenPanel);
            return () => document.removeEventListener("click", hiddenPanel);
        }
    }, [postId]);

    const content = function () {
        return show ? (
            <Conatiner>
                <CloseButton onClick={() => setShow(false)}>
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
                        <CardComments>{postInfo.description}</CardComments>
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
