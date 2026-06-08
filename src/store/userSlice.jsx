// src/store/userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchRoles = createAsyncThunk("user/fetchRoles", async () => {
  const response = await axios.get("/api/admin/roles");
  return response.data;
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    roles: [
      { id: 1, name: "System Admin" },
      { id: 2, name: "Data Entry" },
      { id: 3, name: "Sponsorship Manager" },
      { id: 4, name: "Financial Auditor" },
    ],
    status: "idle",
  },
  reducers: {},
  //   extraReducers: (builder) => {
  //     builder.addCase(fetchRoles.fulfilled, (state, action) => {
  //       state.roles = action.payload;
  //     });
  //   },
});
export default userSlice.reducer;
