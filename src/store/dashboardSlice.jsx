import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { adminService } from "@/services/adminService";

import { beneficiaryService } from "@/services/beneficiaryService";
import { sponsorshipFundService } from "@/services/sponsorshipFundService.jsx";
export const fetchDashboardStats = createAsyncThunk(
  "dashboard/fetchStats",
  async () => {
    const response = await adminService.getDashboardStats();
    return response.data;
  },
);
export const fetchSponsorshipFundSummary = createAsyncThunk(
  "dashboard/fetchSponsorshipFundSummary",
  async (_, { rejectWithValue }) => {
    try {
      const response = await sponsorshipFundService.fetchSummary();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
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

export const fetchHelpRequestsStats = createAsyncThunk(
  "dashboard/help-requests",
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
  helpRequestsStats: null,
  requestsCharts: [],
  sponsorshipsStats: null,
  orphansStats: null,
  sponsorshipFundSummary: null,
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

      //  Sponsorships Stats (הتم إضافتها هنا)
      .addCase(fetchSponsorshipsStats.fulfilled, (state, action) => {
        state.sponsorshipsStats = action.payload;
      })

      //  Orphans Stats (تم إضافتها هنا)
      .addCase(fetchOrphansStats.fulfilled, (state, action) => {
        state.orphansStats = action.payload;
      })

      // Beneficiary Stats
      .addCase(fetchHelpRequestsStats.fulfilled, (state, action) => {
        state.helpRequestsStats = action.payload;
      })
      .addCase(fetchSponsorshipFundSummary.fulfilled, (state, action) => {
        state.sponsorshipFundSummary = action.payload?.data || action.payload;
      })
      .addCase(fetchHelpRequestsStats.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        console.error("خطأ في السيرفر:", action.error);
      });
  },
});

export const { setDashboardData } = dashboardSlice.actions;
export default dashboardSlice.reducer;
