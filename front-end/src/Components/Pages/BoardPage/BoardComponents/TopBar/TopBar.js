import React, { useEffect, useState } from "react";
import * as style from "./styled";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import * as common from "../../CommonStyled";
import { useDispatch, useSelector } from "react-redux";
import { boardTitleUpdate } from "../../../../../Services/boardsService";
import RightDrawer from "../../../../Drawers/RightDrawer/RightDrawer";
import BasePopover from "../../../../Modals/EditCardModal/ReUsableComponents/BasePopover";
import InviteMembers from "../../../../Modals/EditCardModal/Popovers/InviteMembers/InviteMembers";
import { Avatar, AvatarGroup } from "@mui/material";

const TopBar = () => {
  const board = useSelector((state) => state.board);
  const [currentTitle, setCurrentTitle] = useState(board.title);
  const [showDrawer, setShowDrawer] = useState(false);
  const [invitePopover, setInvitePopover] = React.useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!board.loading) setCurrentTitle(board.title);
  }, [board.loading, board.title]);

  const handleTitleChange = () => {
    boardTitleUpdate(currentTitle, board.id, dispatch);
  };
  return (
    <style.TopBar>
      <style.LeftWrapper>
        <style.InviteButton
          onClick={(event) => setInvitePopover(event.currentTarget)}
        >
          <PersonAddAltIcon />
          <style.TextSpan>Thêm thành viên</style.TextSpan>
        </style.InviteButton>
        {invitePopover && (
          <BasePopover
            anchorElement={invitePopover}
            closeCallback={() => {
              setInvitePopover(null);
            }}
            title="Invite Members"
            contents={
              <InviteMembers
                closeCallback={() => {
                  setInvitePopover(null);
                }}
              />
            }
          />
        )}

        <style.BoardNameInput
          placeholder="Board Name"
          value={currentTitle}
          onChange={(e) => setCurrentTitle(e.target.value)}
          onBlur={handleTitleChange}
        />
      </style.LeftWrapper>

      <style.RightWrapper>
        <AvatarGroup className="members-avatar-group ">
          {board.members.map((item, index) => {
            return (
              <Avatar
                className="avatar-member-nav"
                direction="row"
                alignItems="center"
                key={index}
                alt="Remy Sharp"
                src={item.avatar}
              />
            );
          })}
        </AvatarGroup>
        <common.Button
          className="btn-show"
          onClick={() => {
            setShowDrawer(true);
          }}
        >
          <MoreHorizIcon />
          <style.TextSpan>Thông báo</style.TextSpan>
        </common.Button>
      </style.RightWrapper>
      <RightDrawer
        show={showDrawer}
        closeCallback={() => {
          setShowDrawer(false);
        }}
      />
    </style.TopBar>
  );
};

export default TopBar;
