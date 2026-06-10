import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 1. جلب الأدوار من السيرفر
export const fetchRoles = createAsyncThunk("user/fetchRoles", async () => {
  const response = await axios.get("/api/admin/roles");
  return response.data;
});

// 2. إرسال بيانات المستخدم الجديد للسيرفر
export const addUser = createAsyncThunk(
  "user/addUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/admin/users", userData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    roles: [
      { id: 1, name: "System Admin" },
      { id: 2, name: "Data Entry" },
      { id: 3, name: "Sponsorship Manager" },
      { id: 4, name: "Financial Auditor" },
    ], // بدأنا بمصفوفة فارغة لأننا سنجلبها من السيرفر
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // التعامل مع جلب الأدوار
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.roles = action.payload;
        state.status = "succeeded";
      })
      // التعامل مع إضافة المستخدم
      .addCase(addUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addUser.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(addUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
