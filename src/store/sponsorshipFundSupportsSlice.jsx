import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { sponsorshipFundService } from "@/services/sponsorshipFundService.jsx";

const initialState = {
  items: [],
  status: "idle",
  selectedItem: null,
  selectedDetails: null,
  detailsStatus: "idle",
  pagination: {
    currentPage: 1,
    lastPage: 1,
  },
  error: null,
};

export const fetchSponsorshipFundSupports = createAsyncThunk(
  "sponsorshipFundSupports/fetchAll",
  async (params = {}, { rejectWithValue }) => {
    try {
      return (
        await sponsorshipFundService.fetchSupports(
          params.page || 1,
          params.limit || 10,
        )
      ).data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  },
);

const sponsorshipFundSupportsSlice = createSlice({
  name: "sponsorshipFundSupports",
  initialState,

  reducers: {
    setSelectedItem: (state, action) => {
      state.selectedItem = action.payload;
    },

    clearSelected: (state) => {
      state.selectedItem = null;
    },

    clearSelectedDetails: (state) => {
      state.selectedDetails = null;

      state.detailsStatus = "idle";
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(fetchSponsorshipFundSupports.pending, (state) => {
        state.status = state.items.length > 0 ? "succeeded" : "loading";

        state.error = null;
      })

      .addCase(fetchSponsorshipFundSupports.fulfilled, (state, action) => {
        const payload = action.payload;

        const itemsData = Array.isArray(payload)
          ? payload
          : payload?.data || [];

        state.items = itemsData.map((item) => ({
          ...item,
          id: Number(item.id || item.donorId),
        }));

        const meta = payload?.meta;

        if (meta) {
          state.pagination = {
            currentPage: meta.page || 1,
            lastPage: meta.totalPages || 1,
            total: meta.totalCount || 0,
          };
        }

        state.status = "succeeded";
      })

      .addCase(fetchSponsorshipFundSupports.rejected, (state, action) => {
        state.status = "failed";

        state.error = action.payload;
      });
  },
});

export default sponsorshipFundSupportsSlice.reducer;
