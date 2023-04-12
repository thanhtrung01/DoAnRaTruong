import React from "react";
import styled from "styled-components";
import LeftImage from "../Images/login1.png";
import RightImage from "../Images/login2.webp";

const Container = styled.div`
  height: 100vh;
  width: 100%;
  position: fixed;
  z-index: -900;
`;

const LeftSide = styled.div`
  position: absolute;
  top: 15px;
  left: 2px;
  z-index: -999;
  width: 40vw;
  max-width: 500px;
`;
const RightSide = styled.div`
  position: absolute;
  bottom: 0;
  right: 10px;
  z-index: -999;
  width: 35vw;
  max-width: 450px;
`;

const Svg = styled.img`
  vertical-align: middle;
  width: 100%;
  height: 100%;
`;

const Background = () => {
  return (
    <Container>
      <LeftSide>
        <Svg src={LeftImage} />
      </LeftSide>
      <RightSide>
        <Svg src={RightImage} />
      </RightSide>
    </Container>
  );
};

export default Background;
