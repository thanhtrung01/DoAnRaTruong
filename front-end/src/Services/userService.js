import axios from "axios";
import FormData from "form-data";
import {
  registrationStart,
  registrationEnd,
  loginStart,
  loginFailure,
  loginSuccess,
  loadSuccess,
  loadFailure,
  loadStart,
  loadAllStart,
  updateStart,
  fetchingStart,
  fetchingFinish,
  logout,
  getUsers,
  createStart,
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
        message: "Mật khẩu của bạn không khớp!",
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
    localStorage.setItem("token", token);
    localStorage.setItem("expires_in", expires_in);
    const intervalId = setInterval(() => {
      const expires_in = localStorage.getItem("expires_in");
      if (token && expires_in) {
        const now = new Date().getTime();
        if (now >= expires_in) {
          localStorage.removeItem("token");
          localStorage.removeItem("expires_in");
          dispatch(logout());
          clearInterval(intervalId);
        }
      }
    }, 5000);
    setBearer(token);
    dispatch(loginSuccess({ user, token }));
    res.data.user.isAdmin
      ? dispatch(
          openAlert({
            message,
            severity: "success",
            duration: 500,
            nextRoute: "/dashboard/app",
          })
        )
      : dispatch(
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
        message: "Vui lòng nhập email để mời",
        severity: "warning",
      })
    );
    dispatch(fetchingFinish());
    return null;
  }

  try {
    const res = await axios.post(baseUrl + "get-user-with-email", {
      email,
    });
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

export const createUser = async (
  dispatch,
  name,
  username,
  email,
  password,
  address,
  phone,
  avatar
) => {
  dispatch(createStart());
  if (!localStorage.token) return dispatch(loadFailure());
  setBearer(localStorage.token);
  const formData = new FormData();
  formData.append("name", name);
  formData.append("username", username);
  formData.append("email", email);
  formData.append("password", password);
  formData.append("address", address);
  formData.append("phone", phone);
  formData.append("avatar", avatar);
  formData.append("isAdmin", false);
  try {
    const res = await axios
      .post(baseUrl + `create-user`, formData)
      .then((res) => {
        console.log("Đã upload hình ảnh thành công", res.data);
      })
      .catch((error) => {
        console.error("Lỗi khi upload hình ảnh", error);
      });

    dispatch(loadSuccess({ user: res.data, token: res.data }));
  } catch (error) {
    console.log(error);
    dispatch(loadFailure());
  }
};

export const updateInfoUser = async (
  dispatch,
  id,
  name,
  avatar,
  transferData
) => {
  dispatch(updateStart());
  if (!localStorage.token) return dispatch(loadFailure());
  setBearer(localStorage.token);
  const formData = new FormData();
  formData.append("name", name);
  formData.append("avatar", avatar);
  try {
    const res = await axios
      .patch(baseUrl + `${id}`, formData)
      .then((res) => {
        console.log("Đã upload hình ảnh thành công", res.data);
        transferData(res.data);
      })
      .catch((error) => {
        console.error("Lỗi khi upload hình ảnh", error);
      });
    dispatch(loadSuccess({ user: res.data, token: res.data }));
  } catch (error) {
    dispatch(loadFailure());
  }
};

export const getAllUser = async () => {
  const res = await axios.get(baseUrl + "get-users");
  return res;
};

export const deleteUser = async (userId) => {
  axios.delete(baseUrl + `delete-user/${userId}`);
};
