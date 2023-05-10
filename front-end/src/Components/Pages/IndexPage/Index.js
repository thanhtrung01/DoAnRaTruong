import React, { useEffect } from "react";
import IndexNav from "../../IndexNav";
import { useHistory } from "react-router-dom";
import imgHomePage from "../../../Images/Earth.png";

import {
  Container,
  Content,
  LeftSide,
  RightSide,
  LeftWrapper,
  Title,
  Text,
  Button,
  SvgItem,
} from "./Styled";

const Index = () => {
  let history = useHistory();
  useEffect(() => {
    document.title = "Todoweb";
  }, []);
  return (
    <>
      <IndexNav />
      <Container>
        <Content>
          <LeftSide>
            <LeftWrapper>
              <Title>Todoweb giúp làm việc nhóm hiểu quả.</Title>
              <Text>
                Hợp tác, quản lý dự án, hướng đến năng suất làm việc cao. Dễ sử
                dụng, thích hợp với cả cá nhân và doanh nghiệp
              </Text>
              <Button onClick={() => history.push("/register")}>Đăng ký</Button>
            </LeftWrapper>
          </LeftSide>
          <RightSide>
            <SvgItem src={imgHomePage} />
          </RightSide>
        </Content>
      </Container>
    </>
  );
};

export default Index;
