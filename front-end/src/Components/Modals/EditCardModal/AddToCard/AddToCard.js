import React from "react";
import { Container, Title } from "./styled";
import Button from "../ReUsableComponents/IconButton";
import MemberIcon from "@mui/icons-material/PersonOutlineOutlined";
import LabelIcon from "@mui/icons-material/LabelOutlined";
import CheckIcon from "@mui/icons-material/LibraryAddCheckOutlined";
import DateIcon from "@mui/icons-material/ScheduleOutlined";
import AttachmentIcon from "@mui/icons-material/AttachFileOutlined";
import CoverIcon from "@mui/icons-material/TableChartOutlined";
import BasePopover from "../ReUsableComponents/BasePopover";
import MembersPopover from "../Popovers/Members/MembersPopover";
import LabelsPopover from "../Popovers/Labels/LabelsPopover";
import ChecklistPopover from "../Popovers/Checklist/ChecklistPopover";
import DatePopover from "../Popovers/Date/DatePopover";
import AddAttachmentPopover from "../Popovers/Attachment/AddAttachmentPopover";
import CoverPopover from "../Popovers/Cover/CoverPopover";

const AddToCard = () => {
  const [memberPopover, setMemberPopover] = React.useState(null);
  const [labelPopover, setLabelPopover] = React.useState(null);
  const [checklistPopover, setChecklistPopover] = React.useState(null);
  const [datePopover, setDatePopover] = React.useState(null);
  const [attachmentPopover, setAttachmentPopover] = React.useState(null);
  const [coverPopover, setCoverPopover] = React.useState(null);
  const [labelsBackArrow, setLabelsBackArrow] = React.useState(false);
  const [labelsTitle, setLabelsTitle] = React.useState("Labels");
  return (
    <Container>
      <Title>Chức năng</Title>

      <Button
        clickCallback={(event) => setMemberPopover(event.currentTarget)}
        title="Thành viên"
        icon={<MemberIcon fontSize="small" />}
      ></Button>
      {memberPopover && (
        <BasePopover
          anchorElement={memberPopover}
          closeCallback={() => {
            setMemberPopover(null);
          }}
          title="Thành Viên"
          contents={<MembersPopover />}
        />
      )}

      <Button
        clickCallback={(event) => setLabelPopover(event.currentTarget)}
        title="Nhãn"
        icon={<LabelIcon fontSize="small" />}
      ></Button>
      {labelPopover && (
        <BasePopover
          anchorElement={labelPopover}
          closeCallback={() => {
            setLabelPopover(null);
            setLabelsTitle("Labels");
            setLabelsBackArrow(false);
          }}
          title={labelsTitle}
          backClick={() => {
            setLabelsTitle("Labels");
            setLabelsBackArrow(false);
          }}
          backArrow={labelsBackArrow}
          contents={
            <LabelsPopover
              currentPage={labelsTitle}
              titleCallback={(event) => setLabelsTitle(event)}
              arrowCallback={(event) => {
                setLabelsBackArrow(event);
              }}
            />
          }
        />
      )}

      <Button
        clickCallback={(event) => setChecklistPopover(event.currentTarget)}
        title="Việc cần làm"
        icon={<CheckIcon fontSize="small" />}
      ></Button>
      {checklistPopover && (
        <BasePopover
          anchorElement={checklistPopover}
          closeCallback={() => {
            setChecklistPopover(null);
          }}
          title="Thêm danh sách công việc"
          contents={
            <ChecklistPopover
              closeCallback={() => {
                setChecklistPopover(null);
              }}
            />
          }
        />
      )}

      <Button
        clickCallback={(event) => setDatePopover(event.currentTarget)}
        title="Ngày"
        icon={<DateIcon fontSize="small" />}
      ></Button>
      {datePopover && (
        <BasePopover
          anchorElement={datePopover}
          closeCallback={() => {
            setDatePopover(null);
          }}
          title="Ngày"
          contents={
            <DatePopover
              closeCallback={() => {
                setDatePopover(null);
              }}
            />
          }
        />
      )}

      <Button
        clickCallback={(event) => setAttachmentPopover(event.currentTarget)}
        title="Đính kèm"
        icon={<AttachmentIcon fontSize="small" />}
      ></Button>
      {attachmentPopover && (
        <BasePopover
          anchorElement={attachmentPopover}
          closeCallback={() => {
            setAttachmentPopover(null);
          }}
          title="Đính kèm từ..."
          contents={
            <AddAttachmentPopover
              closeCallback={() => {
                setAttachmentPopover(null);
              }}
            />
          }
        />
      )}

      <Button
        title="Ảnh bìa"
        clickCallback={(event) => setCoverPopover(event.currentTarget)}
        icon={<CoverIcon fontSize="small" />}
      ></Button>
      {coverPopover && (
        <BasePopover
          anchorElement={coverPopover}
          closeCallback={() => {
            setCoverPopover(null);
          }}
          title="Ảnh bìa"
          contents={
            <CoverPopover
              closeCallback={() => {
                setCoverPopover(null);
              }}
            />
          }
        />
      )}
    </Container>
  );
};

export default AddToCard;
