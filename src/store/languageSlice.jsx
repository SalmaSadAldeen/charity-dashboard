import { createSlice } from "@reduxjs/toolkit";

const languageSlice = createSlice({
  name: "language",
  initialState: {
    lang: localStorage.getItem("preferredLang") || "ar",
  },
  reducers: {
    toggleLanguage: (state) => {
      state.lang = state.lang === "en" ? "ar" : "en";

      document.documentElement.dir = state.lang === "ar" ? "rtl" : "ltr";
      localStorage.setItem("preferredLang", state.lang);
    },
  },
});

export const { toggleLanguage } = languageSlice.actions;
export default languageSlice.reducer;
