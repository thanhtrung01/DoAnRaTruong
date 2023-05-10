import React from "react";
import { Container, ButtonContainer } from "./styled";
import MenuButton from "./MenuButton";
import { Hr } from "../../styled";
import BoardIcon from "@mui/icons-material/Dashboard";
import BackgroundIcon from "@mui/icons-material/Wallpaper";
import ActivitySection from "./ActivitySection/ActivitySection";
const MainMenu = (props) => {
  return (
    <Container>
      <ButtonContainer>
        <MenuButton
          icon={<BoardIcon fontSize="small" color="inherit" />}
          title="Thông tin mô tả"
          description="Thêm mô tả"
          clickCallback={() => props.menuCallback("About this board")}
        />
        <MenuButton
          icon={<BackgroundIcon fontSize="small" color="inherit" />}
          title="Ảnh nền"
          description="Chọn ảnh nền cho bảng"
          clickCallback={() => props.menuCallback("Change background")}
        />
      </ButtonContainer>
      <Hr />
      <ActivitySection />
    </Container>
  );
};

export default MainMenu;
