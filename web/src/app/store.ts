import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/redux/state";

export default configureStore({
  reducer: authReducer,
});
