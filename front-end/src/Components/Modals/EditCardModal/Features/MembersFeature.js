import React from "react";
import { useSelector } from "react-redux";
import MembersPopover from "../Popovers/Members/MembersPopover";
import BasePopover from "../ReUsableComponents/BasePopover";
import { Title, RowContainer, AddAvatar } from "./styled";
import { Avatar } from "@mui/material";
const MembersFeature = (props) => {
  const card = useSelector((state) => state.card);
  const [memberPopover, setMemberPopover] = React.useState(null);
  return (
    <>
      <Title>Thành viên</Title>
      <RowContainer>
        {card.members.map((i, index) => {
          return (
            <Avatar
              key={index}
              title={i.name}
              src={i.avatar && i.avatar.length > 0 ? i.avatar[0] : ""}
              sx={{
                width: 32,
                height: 32,
                bgcolor: i.color,
                fontSize: "0.875rem",
                fontWeight: "800",
              }}
            >
              {/* {member.name[0].toUpperCase()} */}
            </Avatar>
          );
        })}
        <AddAvatar onClick={(event) => setMemberPopover(event.currentTarget)}>
          +
        </AddAvatar>
      </RowContainer>
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
    </>
  );
};

export default MembersFeature;
