import axios from "axios";
import { openAlert } from "../Redux/Slices/alertSlice";
import {
  failFetchingBoards,
  startFetchingBoards,
  successFetchingBoards,
  successCreatingBoard,
  failCreatingBoard,
  startCreatingBoard,
} from "../Redux/Slices/boardsSlice";
import { addNewBoard } from "../Redux/Slices/userSlice";
import {
  setLoading,
  successFetchingBoard,
  updateTitle,
} from "../Redux/Slices/boardSlice";

const apiURL = process.env.REACT_APP_SERVER_API;
const baseUrl = apiURL + `board`;

export const getBoards = async (fromDropDown, dispatch) => {
  if (!fromDropDown) dispatch(startFetchingBoards());
  try {
    const res = await axios.get(baseUrl + "/");
    setTimeout(() => {
      dispatch(successFetchingBoards({ boards: res.data }));
    }, 1000);
  } catch (error) {
    dispatch(failFetchingBoards());
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

export const createBoard = async (props, dispatch) => {
  dispatch(startCreatingBoard());
  if (!(props.title && props.backgroundImageLink)) {
    dispatch(failCreatingBoard());
    dispatch(
      openAlert({
        message: "Vui lòng nhập một tiêu đề cho bảng!",
        severity: "warning",
      })
    );
    return;
  }
  try {
    console.log("start");
    const res = await axios.post(baseUrl + "/create", props);
    console.log("middle");
    dispatch(addNewBoard(res.data));
    dispatch(successCreatingBoard(res.data));
    dispatch(
      openAlert({
        message: `${res.data.title} Bảng làm việc đã được tạo thành công!`,
        severity: "success",
      })
    );
    console.log("success");
  } catch (error) {
    dispatch(failCreatingBoard());
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

export const getBoard = async (boardId, dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axios.get(baseUrl + "/" + boardId);
    dispatch(successFetchingBoard(res.data));
    setTimeout(() => {
      dispatch(setLoading(false));
    }, 1000);
  } catch (error) {
    dispatch(setLoading(false));
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

export const boardTitleUpdate = async (title, boardId, dispatch) => {
  try {
    dispatch(updateTitle(title));
    await axios.put(baseUrl + "/" + boardId + "/update-board-title", {
      title: title,
    });
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
};

export const getAllBoard = async () => {
  const res = await axios.get(baseUrl + "/admin/get-all");
  return res;
};

export const deleteBoard = async (boardId) => {
  axios.delete(baseUrl + `/delete/${boardId}`);
};
