import { createSlice } from "@reduxjs/toolkit";

const languageSlice = createSlice({
  name: "language",
  initialState: { lang: "en" }, // اللغة الافتراضية
  reducers: {
    toggleLanguage: (state) => {
      // تبديل القيمة فقط
      state.lang = state.lang === "en" ? "ar" : "en";

      // تحديث الاتجاه في المتصفح فوراً
      document.documentElement.dir = state.lang === "ar" ? "rtl" : "ltr";
    },
  },
});

export const { toggleLanguage } = languageSlice.actions;
export default languageSlice.reducer;
