import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { adminService } from "@/services/adminService";
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const savedLang = localStorage.getItem("preferredLang") || "ar";
      await adminService.logout();

      localStorage.removeItem("token");
      localStorage.removeItem("userType");
      localStorage.removeItem("roles");

      localStorage.setItem("preferredLang", savedLang);
      return true;
    } catch (error) {
      const savedLang = localStorage.getItem("preferredLang") || "ar";
      localStorage.removeItem("token");
      localStorage.removeItem("userType");
      localStorage.removeItem("roles");
      localStorage.setItem("preferredLang", savedLang);

      return rejectWithValue(error.response?.data?.message || "Logout failed");
    }
  },
);
export const requestOtpUser = createAsyncThunk(
  "auth/requestOtpUser",
  async (phoneNumber, { rejectWithValue }) => {
    try {
      const response = await adminService.requestOtp(phoneNumber);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to send OTP",
      );
    }
  },
);

export const resetPasswordUser = createAsyncThunk(
  "auth/resetPasswordUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await adminService.resetPassword(credentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to reset password",
      );
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
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.userType = action.payload?.userType;

      state.roles = action.payload?.roles || [];

      if (action.payload?.roles) {
        localStorage.setItem("roles", JSON.stringify(action.payload.roles));
      }
      if (action.payload?.userType) {
        localStorage.setItem("userType", action.payload.userType);
      }
      const savedLang = localStorage.getItem("preferredLang");
      if (savedLang) {
        localStorage.setItem("preferredLang", savedLang);
      }
    },
    loginFailure: (state, action) => {
      state.isLoading = false;

      state.error = action.payload;
    },
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
      })
      // Request OTP
      .addCase(requestOtpUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(requestOtpUser.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(requestOtpUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(resetPasswordUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(resetPasswordUser.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(resetPasswordUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { loginStart, loginSuccess, loginFailure } = authSlice.actions;
export default authSlice.reducer;
