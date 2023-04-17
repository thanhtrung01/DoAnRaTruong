import { createSlice } from "@reduxjs/toolkit";
// import Cookies from 'js-cookie';

const initialState = {
  userInfo: null,
  isAuthenticated: null,
  pending: true,
  loading: false,
  token: localStorage.getItem('token'),
  expires_in: localStorage.getItem('expires_in'),
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    registrationStart: (state) => {
      state.pending = true;
    },
    registrationEnd: (state) => {
      state.pending = false;
    },
    loginStart: (state) => {
      state.pending = true;
    },
    loginSuccess: (state, action) => {
      state.pending = false;
      state.isAuthenticated = true;
      state.userInfo = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
    },
    loginFailure: (state) => {
      state.pending = false;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
      // localStorage.removeItem('expiration');
    },
    loadStart: (state) => {
      state.pending = true;
    },
    updateStart: (state) => {
      state.loading = true;
      // state.userInfo = action.payload.user;
    },
    loadSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.userInfo = action.payload.user;
      state.token = localStorage.getItem('token');
      state.expires_in = localStorage.getItem('expires_in');
      state.pending = false;
    },
    loadFailure: (state) => {
      state.pending = false;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userInfo = null;
      state.token = null;
      state.expires_in = null;
      localStorage.removeItem('token');
      localStorage.removeItem('expires_in');
    },
    fetchingStart: (state)=>{
      state.loading = true;
    },
    fetchingFinish: (state) => {
      state.loading = false;
    },
    addNewBoard: (state,action) => {
      state.userInfo.boards.unshift(action.payload);
    }
  },
});

export const {
  registrationStart,
  registrationEnd,
  loginStart,
  loginFailure,
  loginSuccess,
  loadStart,
  updateStart,
  loadSuccess,
  loadFailure,
  logout,
  fetchingStart,
  fetchingFinish,
  addNewBoard
} = userSlice.actions;
export default userSlice.reducer;
