import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import layoutReducer from "./layoutSlice";
import languageReducer from "./languageSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    layout: layoutReducer,
    language: languageReducer,
  },
});
