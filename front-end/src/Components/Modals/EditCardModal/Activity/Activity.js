import React, { useEffect, useRef, useState } from "react";
import {
  Container,
  LeftContainer,
  RightContainer,
  Title,
  CommentWrapper,
  SaveButton,
  CommentArea,
  LinkButton,
  TitleWrapper,
} from "./styled";
import MessageIcon from "@mui/icons-material/MessageOutlined";
import Comment from "../Comment/Comment";
import ActivityLog from "../ActivityLog/ActivityLog";
import Button from "../ReUsableComponents/Button";
import { useDispatch, useSelector } from "react-redux";
import { comment } from "../../../../Services/cardService";
import { Avatar } from "@mui/material";
import IosShareIcon from "@mui/icons-material/IosShare";

const Activity = () => {
  const dispatch = useDispatch();
  const ref = useRef();
  const card = useSelector((state) => state.card);
  const user = useSelector((state) => state.user);
  const [focusComment, setFocusComment] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [details, setDetails] = useState(false);

  const handleSaveClick = async () => {
    await comment(
      card.cardId,
      card.listId,
      card.boardId,
      newComment,
      user.name,
      dispatch
    );
    setNewComment("");
  };

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setFocusComment(false);
    } else {
      setFocusComment(true);
    }
  };

  const handleFileImage = () => {};
  const handleChange = (e) => {
    console.log(e.target.files);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  });
  return (
    <>
      <Container>
        <LeftContainer>
          <MessageIcon fontSize="small" />
          <Avatar
            sx={{
              width: 28,
              height: 28,
              bgcolor: user.userInfo.color,
              fontSize: "0.875rem",
              fontWeight: "800",
            }}
            src={user.userInfo.avatar[0]}
          >
            {/* {user.userInfo.name[0].toUpperCase()} */}
          </Avatar>
        </LeftContainer>
        <RightContainer>
          <TitleWrapper>
            <Title>Activity</Title>
            <Button
              clickCallback={() => setDetails((prev) => !prev)}
              title={details ? "Hide details" : "Show details"}
            />
          </TitleWrapper>
          <CommentWrapper ref={ref}>
            <SaveButton
              disabled={!newComment}
              onClick={handleSaveClick}
              show={focusComment}
            >
              Save
            </SaveButton>
            <CommentArea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              focus={focusComment}
              placeholder="Write a comment..."
            ></CommentArea>
            <LinkButton
              disabled={!newComment}
              show={focusComment}
              onClick={handleFileImage}
            >
              <div className="drag-file-area">
                <label className="label">
                  <input
                    type="file"
                    className="default-file-input"
                    onChange={handleChange}
                  />
                  <span className="browse-files">
                    <span className="browse-files-text">browse file </span>
                    <div className="icon-file">
                      <IosShareIcon />
                    </div>
                  </span>
                </label>
              </div>
            </LinkButton>
          </CommentWrapper>
        </RightContainer>
      </Container>
      {card.activities.map((activity) => {
        if (activity.isComment) {
          return <Comment key={activity._id} {...activity} />;
        }
        return undefined;
      })}

      {details && <ActivityLog />}
    </>
  );
};

export default Activity;
