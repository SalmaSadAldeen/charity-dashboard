import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { adminService } from "@/services/adminService";
import { beneficiaryService } from "@/services/beneficiaryService";

export const fetchDashboardStats = createAsyncThunk(
  "dashboard/fetchStats",
  async () => {
    const response = await adminService.getDashboardStats();
    return response.data;
  },
);

export const fetchCharts = createAsyncThunk(
  "dashboard/fetchCharts",
  async (period) => {
    const response = await adminService.getDistributionCharts(period);
    return response.data;
  },
);

export const fetchRequestsCharts = createAsyncThunk(
  "dashboard/fetchRequests",
  async () => {
    const response = await adminService.getRequestsCharts();
    return response.data;
  },
);

export const fetchSponsorshipsStats = createAsyncThunk(
  "dashboard/fetchSponsorshipsStats",
  async () => {
    const response = await adminService.getSponsorshipsStats();
    return response.data;
  },
);

export const fetchOrphansStats = createAsyncThunk(
  "dashboard/fetchOrphansStats",
  async () => {
    const response = await adminService.getOrphansStats();
    return response.data;
  },
);

export const fetchBeneficiaryStats = createAsyncThunk(
  "dashboard/fetchBeneficiaryStats",
  async () => {
    const response = await beneficiaryService.getHelpRequestStats();
    return response.data;
  },
);

const initialState = {
  stats: null,
  charts: [],
  isLoading: false,
  error: null,
  beneficiariesStats: null,
  requestsCharts: [],
  sponsorshipsStats: null,
  orphansStats: null,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setDashboardData: (state, action) => {
      return { ...state, ...action.payload };
    },
  },

  extraReducers: (builder) => {
    builder
      // Dashboard Stats
      .addCase(fetchDashboardStats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.stats = action.payload;
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // Requests Charts
      .addCase(fetchRequestsCharts.fulfilled, (state, action) => {
        state.requestsCharts = action.payload;
      })

      // Distribution Charts
      .addCase(fetchCharts.fulfilled, (state, action) => {
        state.charts = action.payload;
      })

      // 🌟 Sponsorships Stats (הتم إضافتها هنا)
      .addCase(fetchSponsorshipsStats.fulfilled, (state, action) => {
        state.sponsorshipsStats = action.payload;
      })

      // 🌟 Orphans Stats (تم إضافتها هنا)
      .addCase(fetchOrphansStats.fulfilled, (state, action) => {
        state.orphansStats = action.payload;
      })

      // Beneficiary Stats
      .addCase(fetchBeneficiaryStats.fulfilled, (state, action) => {
        state.beneficiariesStats = action.payload;
      })
      .addCase(fetchBeneficiaryStats.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        console.error("خطأ في السيرفر:", action.error);
      });
  },
});

export const { setDashboardData } = dashboardSlice.actions;
export default dashboardSlice.reducer;
