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
          title="Thay đổi hình nền"
          description="Chọn hình nền cho bảng"
          clickCallback={() => props.menuCallback("Thay đổi phông nền")}
        />
      </ButtonContainer>
      <Hr />
      <ActivitySection />
    </Container>
  );
};

export default MainMenu;
