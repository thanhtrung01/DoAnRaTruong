import React, { useEffect, useState, useRef } from "react";
import * as style from "./styled";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import ScreenshotMonitorIcon from '@mui/icons-material/ScreenshotMonitor';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import * as common from "../../CommonStyled";
import { useDispatch, useSelector } from "react-redux";
import { boardTitleUpdate } from "../../../../../Services/boardsService";
import RightDrawer from "../../../../Drawers/RightDrawer/RightDrawer";
import BasePopover from "../../../../Modals/EditCardModal/ReUsableComponents/BasePopover";
import InviteMembers from "../../../../Modals/EditCardModal/Popovers/InviteMembers/InviteMembers";
import { Avatar, AvatarGroup, Button } from "@mui/material";
import List from "../List/List";
import html2canvas from 'html2canvas';
const TopBar = (props) => {
  const { name } = props;
  const [imageData, setImageData] = useState('');
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
  const targetRef = useRef(null);
  const handleCapture = () => {
    html2canvas(targetRef.current).then((canvas) => {
      const imgData = canvas.toDataURL();
      setImageData(imgData);
    });
  };

  const handleDownload = () => {
    const downloadLink = document.createElement('a');
    downloadLink.href = imageData;
    downloadLink.download = 'screenshot.png';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
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
            title="Mời các thành viên"
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
          placeholder="Tên bảng"
          value={currentTitle}
          onChange={(e) => setCurrentTitle(e.target.value)}
          onBlur={handleTitleChange}
        />
      </style.LeftWrapper>

      <style.RightWrapper>
       
        <List ref={targetRef} 
        />
        <common.Button
        onClick={() => {
          handleCapture(true);
        }}
          className="btn-show"
          title="Chụp màn hình bảng công việc"
        >
          <ScreenshotMonitorIcon />
        </common.Button>
        {imageData
          && <common.Button
          onClick={() => {
            handleDownload(true);
          }}
            title="Tải xuống ảnh đã chụp"
          >
            <FileDownloadIcon />
          </common.Button>
        }

        <AvatarGroup className="members-avatar-group ">
          {board.members.map((item, index) => {
            return (
              <Avatar
                className="avatar-member-nav"
                direction="row"
                alignItems="center"
                key={index}
                title={`${item.name}`}
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
          <style.TextSpan>Menu</style.TextSpan>
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
