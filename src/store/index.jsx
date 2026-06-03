import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import layoutReducer from "./layoutSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    layout: layoutReducer,
  },
});
