import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/redux/auth";

export default configureStore({
  reducer: authReducer,
});
