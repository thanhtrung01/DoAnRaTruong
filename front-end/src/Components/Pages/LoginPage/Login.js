import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { login } from "../../../Services/userService";
import Background from "../../Background";
import axios from 'axios';
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
import {
  loginFailure,
  loginSuccess,
  logout,
} from '../../../Redux/Slices/userSlice';
import { openAlert } from '../../../Redux/Slices/alertSlice';
import setBearer from '../../../Utils/setBearer';
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";

const apiURL = process.env.REACT_APP_SERVER_API;
const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const authUrl = apiURL + `auth/`;
const Login = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const [userInformations, setUserInformations] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    document.title = "Log in to Todoweb";
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const loginWithUser = () => {
    login(userInformations, dispatch);
  };
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: 'profile email',
      });
    }

    gapi.load('client:auth2', start);
  }, []);
  // handle fail google login
  const handleFailure = (error) => {
    console.error(error);
    dispatch(loginFailure());
    dispatch(openAlert({
      message: error?.response?.data?.errMessage
        ? error.response.data.errMessage
        : error.message,
      severity: 'error',
    }));
  };

  const loginWithGoogle = async (response) => {
    try {
      const res = await axios.post(authUrl + 'google_login',
        {
          tokenId: response.tokenId,
          clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        });

      const { user, message, token, expires_in } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('expires_in', expires_in);
      const intervalId = setInterval(() => {
        const expires_in = localStorage.getItem('expires_in');
        if (token && expires_in) {
          const now = new Date().getTime();
          if (now >= expires_in) {
            localStorage.removeItem('token');
            localStorage.removeItem('expires_in');
            dispatch(logout());
            clearInterval(intervalId);
          }
        }
      }, 1000);
      setBearer(token);
      dispatch(loginSuccess({ user, token }));
      dispatch(
        openAlert({
          message,
          severity: 'success',
          duration: 500,
          nextRoute: '/boards',
        })
      );
    } catch (error) {
      dispatch(loginFailure());
      dispatch(
        openAlert({
          message: error?.response?.data?.errMessage
            ? error.response.data.errMessage
            : error.message,
          severity: 'error',
        })
      );
    }
  };

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
                clientId={clientId}
                buttonText="Log in with Google"
                onSuccess={loginWithGoogle}
                onFailure={handleFailure}
                scope= {"profile email"}
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
