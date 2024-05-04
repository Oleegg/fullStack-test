import { createSlice } from "@reduxjs/toolkit";
import {
  ChangeAuth,
  ChangeUser,
  StateItem,
  CreateUser,
  emptyUser,
  Item,
  DeleteStateItem,
  StateItems,
} from "./types";

export const stateSlice = createSlice({
  name: "state",
  initialState: {
    isAuth: false,
    user: emptyUser,
    list: <Item[]>[],
  },
  reducers: {
    changeStateAuth: (state, action: ChangeAuth) => {
      state.isAuth = action.payload;
    },

    //----------user-----------
    createStateUser: (state, action: CreateUser) => {
      state.user = { ...action.payload };
    },

    changeStateUser: (state, action: ChangeUser) => {
      state.user = { ...state.user, ...action.payload };
    },

    //----------list-------------

    addStateItems: (state, action: StateItems) => {
      state.list = action.payload;
    },

    addStateItem: (state, action: StateItem) => {
      state.list = [...state.list, action.payload];
    },

    changeStateItems: (state, action: StateItem) => {
      state.list = state.list.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, todo: action.payload.todo };
        }
        return item;
      });
    },

    deleteStateItem: (state, action: DeleteStateItem) => {
      state.list = state.list.filter((item) => item.id !== action.payload);
    },
  },
});

export const {
  changeStateAuth,
  createStateUser,
  changeStateUser,
  addStateItem,
  addStateItems,
  changeStateItems,
  deleteStateItem,
} = stateSlice.actions;

export default stateSlice.reducer;
