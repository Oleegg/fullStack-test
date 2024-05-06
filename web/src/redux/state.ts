import { createSlice } from "@reduxjs/toolkit";
import {
  ChangeAuth,
  ChangeUser,
  CreateUser,
  emptyUser,
  State,
  ChangeStateList,
  AddStateList,
  AddStateFriend,
} from "./types";

export const stateSlice = createSlice({
  name: "state",
  initialState: <State>{
    isAuth: false,
    user: emptyUser,
  },
  reducers: {
    changeStateAuth: (state, action: ChangeAuth) => {
      state.isAuth = action.payload;
    },

    //----------user-----------
    createStateUser: (state, action: CreateUser) => {
      const payload = {
        ...action.payload,
        list: action.payload.list || [],
        friend: action.payload.friend || [],
      };
      state.user = { ...emptyUser, ...payload };
    },

    changeStateUser: (state, action: ChangeUser) => {
      state.user = { ...state.user, ...action.payload };
    },

    //--------list--------------
    addStateList: (state, action: AddStateList) => {
      state.user.list = [...state.user.list, action.payload];
    },

    changeStateList: (state, action: ChangeStateList) => {
      state.user.list = action.payload;
    },

    //--------friend--------------
    addStateFriend: (state, action: AddStateFriend) => {
      state.user.friend.push(action.payload);
    },

    changeStateFriend: (state, action: ChangeStateList) => {
      state.user.friend = action.payload;
    },
  },
});

export const {
  changeStateAuth,
  createStateUser,
  changeStateUser,
  addStateList,
  changeStateList,
  addStateFriend,
  changeStateFriend,
} = stateSlice.actions;

export default stateSlice.reducer;
