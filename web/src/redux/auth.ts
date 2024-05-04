import { createSlice } from "@reduxjs/toolkit";
import { ChangeAuth, ChangeUser, CreateUser, emptyUser } from "./types";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuth: false,
    user: emptyUser,
  },
  reducers: {
    changeStateAuth: (state, action: ChangeAuth) => {
      state.isAuth = action.payload;
    },

    createStateUser: (state, action: CreateUser) => {
      state.user = { ...action.payload };
    },

    changeStateUser: (state, action: ChangeUser) => {
      state.user = { ...state.user, ...action.payload };
    },
  },
});

export const { changeStateAuth, createStateUser, changeStateUser } =
  authSlice.actions;

export default authSlice.reducer;
