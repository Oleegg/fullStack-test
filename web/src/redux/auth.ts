import { createSlice } from "@reduxjs/toolkit";
import { ChangeAction } from "./types";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuth: false,
  },
  reducers: {
    changeAuth: (state, action: ChangeAction) => {
      state.isAuth = action.payload;
    },
  },
});

export const { changeAuth } = authSlice.actions;

export default authSlice.reducer;
