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

export const { setTab, setSearch } = layoutSlice.actions;

export default layoutSlice.reducer;
