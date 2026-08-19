import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { quickAidService } from "@/services/quickAidService";

export const fetchQuickAidSummary = createAsyncThunk(
  "quickAid/fetchSummary",
  async (_, { rejectWithValue }) => {
    try {
      const response = await quickAidService.getSummary();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  },
);

export const fetchQuickAidDisbursements = createAsyncThunk(
  "quickAid/fetchDisbursements",
  async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const response = await quickAidService.getDisbursements(page, limit);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  },
);

// 3. إنشاء عملية صرف جديدة
export const createQuickAidDisbursement = createAsyncThunk(
  "quickAid/createDisbursement",
  async (data, { rejectWithValue }) => {
    try {
      const response = await quickAidService.createDisbursement(data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  },
);

const quickAidSlice = createSlice({
  name: "quickAid",
  initialState: {
    summary: null,
    disbursements: [],
    pagination: { currentPage: 1, lastPage: 1, total: 0 },
    status: "idle",
    error: null,
    successMessage: null,
  },
  reducers: {
    clearQuickAidMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // --- Summary (الإحصائيات) ---
      .addCase(fetchQuickAidSummary.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchQuickAidSummary.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.summary = action.payload?.data || action.payload;
      })
      .addCase(fetchQuickAidSummary.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // --- Disbursements List ---
      .addCase(fetchQuickAidDisbursements.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchQuickAidDisbursements.fulfilled, (state, action) => {
        state.status = "succeeded";
        const payload = action.payload;
        state.disbursements = Array.isArray(payload)
          ? payload
          : payload?.data || [];

        const meta = payload?.meta;
        if (meta) {
          state.pagination = {
            currentPage: meta.page || 1,
            totalPages: meta.totalPages || 1,
            total: meta.totalCount || 0,
            hasNextPage: meta.hasNextPage,
            hasPreviousPage: meta.hasPreviousPage,
            limit: meta.limit,
          };
        }
      })
      .addCase(fetchQuickAidDisbursements.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // --- Create Disbursement ---
      .addCase(createQuickAidDisbursement.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createQuickAidDisbursement.fulfilled, (state, action) => {
        state.status = "succeeded";
        const newDisbursement = action.payload?.data || action.payload;
        state.disbursements.unshift(newDisbursement);
        state.successMessage = "تمت عملية الصرف بنجاح";
      })
      .addCase(createQuickAidDisbursement.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearQuickAidMessages } = quickAidSlice.actions;
export default quickAidSlice.reducer;
