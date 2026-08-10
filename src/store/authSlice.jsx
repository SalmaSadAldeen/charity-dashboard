import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { adminService } from "@/services/adminService";

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminService.logout();
      localStorage.clear();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Logout failed");
    }
  },
);
const initialState = {
  // نتأكد أولاً أن القيمة موجودة وليست نص "undefined"
  user:
    localStorage.getItem("user") && localStorage.getItem("user") !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : null,

  isAuthenticated: !!localStorage.getItem("token"),

  userType: localStorage.getItem("userType") || null,

  roles:
    localStorage.getItem("roles") &&
    localStorage.getItem("roles") !== "undefined"
      ? JSON.parse(localStorage.getItem("roles"))
      : [],

  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    // دال الـ Login تبعتك مثل ما هي تماماً بدون أي تغيير
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.userType = action.payload?.userType;

      // أضيفي هذا السطر لتحديث الـ roles بالستيت مباشرة عند تسجيل الدخول
      state.roles = action.payload?.roles || [];

      // وتأكدي أنكِ خزنتِهم بالـ localStorage وقت تسجيل الدخول (إذا ما كنتِ خزنتِهم بالكومبوننت تبع صفحة الـ Login)
      if (action.payload?.roles) {
        localStorage.setItem("roles", JSON.stringify(action.payload.roles));
      }
      if (action.payload?.userType) {
        localStorage.setItem("userType", action.payload.userType);
      }
    },
    loginFailure: (state, action) => {
      state.isLoading = false;

      state.error = action.payload;
    },
    // شلنا الـ logout العادية لأن الـ Thunk تحت صار يقوم بالمهمة لحاله!
  },
  extraReducers: (builder) => {
    builder
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.userType = null;
        state.roles = [];
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { loginStart, loginSuccess, loginFailure } = authSlice.actions;
export default authSlice.reducer;
