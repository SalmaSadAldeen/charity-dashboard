import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const addOrphan = createAsyncThunk(
  "orphan/addOrphan",
  async (orphanData, { rejectedWithValue }) => {
    try {
      const response = await axios.post("/api/orphans", orphanData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      return rejectedWithValue(error.response?.data || "Error occured");
    }
  },
);
const orphanSlice = createSlice({
  name: "orphan",
  initialState: {
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addOrphan.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addOrphan.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(addOrphan.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});
export default orphanSlice.reducer;
