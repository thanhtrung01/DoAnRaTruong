import React, { useState } from "react";
import NorthEastRoundedIcon from "@mui/icons-material/NorthEastRounded";
import AttachmentIcon from "@mui/icons-material/InsertLinkRounded";
import Button from "../ReUsableComponents/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  RightWrapper,
  Title,
  Row,
  FaviconWrapper,
  AttachmentRightWrapper,
  AttachmentTitleWrapper,
  AttachmentTitle,
  AttachmentTitleIconWrapper,
  AttachmentFooterWrapper,
  AttachmentDate,
  AttachmentOperations,
} from "./styled";
import { attachmentDelete } from "../../../../Services/cardService";
import BasePopover from "../ReUsableComponents/BasePopover";
import EditAttachmentPopover from "../Popovers/Attachment/EditAttachmentPopover";
import moment from "moment";
import AddAttachmentPopover from "../Popovers/Attachment/AddAttachmentPopover";

const Attachments = (props) => {
  const card = useSelector((state) => state.card);
  const dispatch = useDispatch();
  const [editPopover, setEditPopover] = useState(null);
  const [popoverComponent, setPopoverComponent] = useState(null);
  const [attachmentPopover, setAttachmentPopover] = useState(null);

  const handleDeleteClick = async (attachmentId) => {
    await attachmentDelete(
      card.cardId,
      card.listId,
      card.boardId,
      attachmentId,
      dispatch
    );
  };
  return (
    <>
      <Container>
        <AttachmentIcon fontSize="small" />
        <RightWrapper>
          <Title>Các tệp tinh đính kèm</Title>
          {card.attachments.map((attachment) => {
            const validateLink = () => {};
            validateLink();
            return (
              <Row
                key={attachment._id}
                onClick={() => window.open(attachment.link, "_blank")}
              >
                <FaviconWrapper>
                  <AttachmentIcon fontSize="large" />
                </FaviconWrapper>
                <AttachmentRightWrapper>
                  <AttachmentTitleWrapper>
                    <AttachmentTitle>
                      {attachment.name ? attachment.name : attachment.link}
                    </AttachmentTitle>
                    <AttachmentTitleIconWrapper>
                      <NorthEastRoundedIcon fontSize="inherit" />
                    </AttachmentTitleIconWrapper>
                  </AttachmentTitleWrapper>
                  <AttachmentFooterWrapper>
                    <AttachmentDate>
                      {"Đã thêm vừa xong " +
                        moment(attachment.date).format("[ngày] DD [tháng] MM [vào lúc] HH:mm")}
                      <AttachmentOperations
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteClick(attachment._id);
                        }}
                      >
                        Xóa
                      </AttachmentOperations>
                      {" - "}
                      <AttachmentOperations
                        onClick={(e) => {
                          e.stopPropagation();
                          setPopoverComponent(attachment);
                          setEditPopover(e.currentTarget);
                        }}
                      >
                        Sửa
                      </AttachmentOperations>
                    </AttachmentDate>
                  </AttachmentFooterWrapper>
                </AttachmentRightWrapper>
              </Row>
            );
          })}
          <Button
            style={{ width: "9rem", marginTop: "0.7rem" }}
            clickCallback={(event) => setAttachmentPopover(event.currentTarget)}
            title="Thêm tệp đính kèm"
          />
        </RightWrapper>
        {editPopover && (
          <BasePopover
            anchorElement={editPopover}
            closeCallback={() => {
              setEditPopover(null);
            }}
            title="Sửa"
            contents={
              <EditAttachmentPopover
                {...popoverComponent}
                closeCallback={() => {
                  setEditPopover(null);
                }}
              />
            }
          />
        )}
        {attachmentPopover && (
          <BasePopover
            anchorElement={attachmentPopover}
            closeCallback={() => {
              setAttachmentPopover(null);
            }}
            title="Gắn từ..."
            contents={
              <AddAttachmentPopover
                closeCallback={() => {
                  setAttachmentPopover(null);
                }}
              />
            }
          />
        )}
      </Container>
    </>
  );
};

export default Attachments;
