import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  currentTab: "dashboard",
  searchQuery: "",
};
export const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    setTab: (state, action) => {
      state.currentTab = action.payload;
    },
    setSearch: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});
// تصدير الأكشنز (Actions) لاستخدامها في الـ Hooks
export const { setTab, setSearch } = layoutSlice.actions;

// تصدير الـ Reducer لربطه بالستور الرئيسي
export default layoutSlice.reducer;
