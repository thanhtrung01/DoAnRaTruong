import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { login } from "../../../Services/userService";
import Background from "../../Background";

import {
  BgContainer,
  Container,
  TrelloIconContainer,
  FormSection,
  FormCard,
  Form,
  Title,
  Input,
  Button,
  Icon,
  Hr,
  Link,
} from "./Styled";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";

const Login = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const [userInformations, setUserInformations] = useState({
    email: "",
    password: "",
  });

  const [loginData, setLoginData] = useState(
    localStorage.getItem("loginData")
      ? JSON.parse(localStorage.getItem("loginData"))
      : null
  );

  useEffect(() => {
    document.title = "Log in to Trello Clone";
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const loginWithUser = () => {
    login(userInformations, dispatch);
  };

  // handle fail google login
  const handleFailure = (result) => {
    console.log(result);
  };

  useEffect(() => {
    gapi.load("client:auth2", () => {
      gapi.auth2.init({ clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID });
    });
  });

  const loginWithGoogle = async (response) => {
    // const res = await axios.post("api/google-login", {
    //   token: googleData.tokenId,
    // });
    // const data = await res.json();

    // setLoginData(data);
    // localStorage.setItem("loginData", JSON.stringify(data));
    console.log(response);
  };

  // const handleLogout = () => {
  //   localStorage.removeItem("loginData");
  //   setLoginData(null);
  // };

  return (
    <>
      <BgContainer>
        <Background />
      </BgContainer>
      <Container>
        <TrelloIconContainer onClick={() => history.push("/")}>
          <Icon src="https://d2k1ftgv7pobq7.cloudfront.net/meta/c/p/res/images/trello-header-logos/167dc7b9900a5b241b15ba21f8037cf8/trello-logo-blue.svg" />
        </TrelloIconContainer>
        <FormSection>
          <FormCard>
            <Form onSubmit={(e) => handleSubmit(e)}>
              <Title>Log in to Trello</Title>
              <Input
                type="email"
                placeholder="Enter email"
                required
                value={userInformations.email}
                onChange={(e) =>
                  setUserInformations({
                    ...userInformations,
                    email: e.target.value,
                  })
                }
              />
              <Input
                type="password"
                placeholder="Enter password"
                required
                value={userInformations.password}
                onChange={(e) =>
                  setUserInformations({
                    ...userInformations,
                    password: e.target.value,
                  })
                }
              />
              <Button onClick={loginWithUser}>Login</Button>
              <GoogleLogin
                className="google-btn"
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                buttonText="Log in with Google"
                onSuccess={loginWithGoogle}
                onFailure={handleFailure}
                cookiePolicy={"single_host_origin"}
              ></GoogleLogin>
              <Hr />
              <Link
                fontSize="0.85rem"
                onClick={() => history.push("/register")}
              >
                Sign up for an account
              </Link>
            </Form>
          </FormCard>
        </FormSection>
      </Container>
    </>
  );
};

export default Login;
