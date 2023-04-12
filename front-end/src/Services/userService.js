import axios from "axios";
// import Cookies from 'js-cookie';
import {
  registrationStart,
  registrationEnd,
  loginStart,
  loginFailure,
  loginSuccess,
  loadSuccess,
  loadFailure,
  loadStart,
  fetchingStart,
  fetchingFinish,
} from "../Redux/Slices/userSlice";
import { openAlert } from "../Redux/Slices/alertSlice";
import setBearer from "../Utils/setBearer";

const apiURL = process.env.REACT_APP_SERVER_API;
const authUrl = apiURL + `auth/`;
const baseUrl = apiURL + `user/`;

export const register = async (
  { name, username, email, password, repassword },
  dispatch
) => {
  dispatch(registrationStart());
  if (password !== repassword) {
    dispatch(
      openAlert({
        message: "Your passwords does not match!",
        severity: "error",
      })
    );
  } else {
    try {
      const res = await axios.post(`${authUrl}register`, {
        name,
        username,
        email,
        password,
      });
      dispatch(
        openAlert({
          message: res.data.message,
          severity: "success",
          nextRoute: "/login",
          duration: 1500,
        })
      );
    } catch (error) {
      dispatch(
        openAlert({
          message: error?.response?.data?.errMessage
            ? error.response.data.errMessage
            : error.message,
          severity: "error",
        })
      );
    }
  }
  dispatch(registrationEnd());
};

export const login = async ({ email, password }, dispatch) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(authUrl + "login", { email, password });
    const { user, message, token, expires_in } = res.data;
    localStorage.setItem('token', token);
    localStorage.setItem('expires_in', expires_in);
    const intervalId = setInterval(() => {
      const expires_in = localStorage.getItem('expires_in');
      if (token && expires_in) {
        const now = new Date().getTime();
        // const expiration = now + 3600 * 1000; 
        if (now >= expires_in) {
          localStorage.removeItem('token');
          localStorage.removeItem('expires_in');
          clearInterval(intervalId);
        }
      }
    }, 1000);
    // Cookies.set('token', user.token, { 
    //   expires: 7 ,
    //   httpOnly: true,
    // });
    // localStorage.setItem('expirationDate', generateToken(expiresIn));
    setBearer(token);
    dispatch(loginSuccess({ user, token }));
    dispatch(
      openAlert({
        message,
        severity: "success",
        duration: 500,
        nextRoute: "/boards",
      })
    );
  } catch (error) {
    dispatch(loginFailure());
    dispatch(
      openAlert({
        message: error?.response?.data?.errMessage
          ? error.response.data.errMessage
          : error.message,
        severity: "error",
      })
    );
  }
};

export const loadUser = async (dispatch) => {
  dispatch(loadStart());
  if (!localStorage.token) return dispatch(loadFailure());
  setBearer(localStorage.token);
  try {
    const res = await axios.get(baseUrl + "get-user");
    dispatch(loadSuccess({ user: res.data, token: res.data }));
  } catch (error) {
    dispatch(loadFailure());
  }
};

export const getUserFromEmail = async (email, dispatch) => {
  dispatch(fetchingStart());
  if (!email) {
    dispatch(
      openAlert({
        message: "Please write an email to invite",
        severity: "warning",
      })
    );
    dispatch(fetchingFinish());
    return null;
  }

  try {
    const res = await axios.post(baseUrl + "get-user-with-email", { email });
    dispatch(fetchingFinish());
    return res.data;
  } catch (error) {
    dispatch(
      openAlert({
        message: error?.response?.data?.errMessage
          ? error.response.data.errMessage
          : error.message,
        severity: "error",
      })
    );
    dispatch(fetchingFinish());
    return null;
  }
};
