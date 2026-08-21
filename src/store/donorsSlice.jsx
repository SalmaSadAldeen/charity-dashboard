import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { donorService } from "@/services/donorService";

import { sponsorshipsService } from "@/services/sponsorshipsService.jsx";

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

export const fetchDonors = createAsyncThunk(
  "donors/fetchAll",
  async (params = {}, { rejectWithValue }) => {
    try {
      return (
        await donorService.getDonors(
          params.page || 1,
          params.limit || 10,
          params.isSponsor,
        )
      ).data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  },
);

export const fetchDonorHistory = createAsyncThunk(
  "donors/fetchOne",
  async ({ id }, { rejectWithValue }) => {
    try {
      if (id.type === "history") {
        return (await donorService.fetchDonorHistory(id.donorId)).data;
      }

      if (id.type === "sponsorships") {
        return (
          await sponsorshipsService.fetchDonorSponsorshipHistory(id.donorId)
        ).data;
      }

      const actualId = typeof id === "object" ? id.donorId : id;

      return (await donorService.fetchDonorHistory(actualId)).data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  },
);

const donorsSlice = createSlice({
  name: "donors",
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

      .addCase(fetchDonors.pending, (state) => {
        state.status = state.items.length > 0 ? "succeeded" : "loading";

        state.error = null;
      })

      .addCase(fetchDonors.fulfilled, (state, action) => {
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

      .addCase(fetchDonors.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      .addCase(fetchDonorHistory.pending, (state) => {
        state.detailsStatus = state.selectedDetails ? "succeeded" : "loading";
      })

      .addCase(fetchDonorHistory.fulfilled, (state, action) => {
        state.selectedDetails = action.payload?.data || action.payload;

        state.detailsStatus = "succeeded";
      })

      .addCase(fetchDonorHistory.rejected, (state, action) => {
        state.detailsStatus = "failed";

        state.error = action.payload;
      });
  },
});

export const {
  setSelectedItem: setDonor,
  clearSelected: clearDonor,
  clearSelectedDetails: clearDonorDetails,
} = donorsSlice.actions;

export default donorsSlice.reducer;
