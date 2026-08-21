import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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

export const fetchSponsorships = createAsyncThunk(
  "sponsorships/fetchAll",
  async (params = {}, { rejectWithValue }) => {
    try {
      return (
        await sponsorshipsService.fetchSponsorships(
          params.page || 1,
          params.limit || 10,
          params.status,
        )
      ).data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  },
);

export const fetchSponsorshipById = createAsyncThunk(
  "sponsorships/fetchOne",
  async ({ id }, { rejectWithValue }) => {
    try {
      return (await sponsorshipsService.fetchSponsorshipById(id)).data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  },
);

export const updateSponsorshipStatus = createAsyncThunk(
  "sponsorships/updateStatus",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      formData.append("status", data.status);

      if (data.orphanId) {
        formData.append("orphanId", data.orphanId);
      }

      if (data.rejectionReason) {
        formData.append(
          "rejectionReason",
          JSON.stringify(data.rejectionReason),
        );
      }

      const response = await sponsorshipsService.updateSponsorshipStatus(
        id,
        formData,
      );

      return response?.data || response;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  },
);

export const sendAnnualReportAction = createAsyncThunk(
  "sponsorships/sendAnnualReport",
  async ({ sponsorshipId, formData }, { rejectWithValue }) => {
    try {
      const response = await sponsorshipsService.sendAnnualReport(
        sponsorshipId,
        formData,
      );

      return response?.data || response;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  },
);

const sponsorshipsSlice = createSlice({
  name: "sponsorships",
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

      // fetchSponsorships
      .addCase(fetchSponsorships.pending, (state) => {
        state.status = state.items.length > 0 ? "succeeded" : "loading";

        state.error = null;
      })

      .addCase(fetchSponsorships.fulfilled, (state, action) => {
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

      .addCase(fetchSponsorships.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // fetchSponsorshipById
      .addCase(fetchSponsorshipById.pending, (state) => {
        state.detailsStatus = state.selectedDetails ? "succeeded" : "loading";
      })

      .addCase(fetchSponsorshipById.fulfilled, (state, action) => {
        state.selectedDetails = action.payload?.data || action.payload;

        state.detailsStatus = "succeeded";
      })

      .addCase(fetchSponsorshipById.rejected, (state, action) => {
        state.detailsStatus = "failed";

        state.error = action.payload;
      })

      // updateSponsorshipStatus
      .addCase(updateSponsorshipStatus.pending, (state) => {
        state.status = "loading";
      })

      .addCase(updateSponsorshipStatus.fulfilled, (state, action) => {
        const updated = action.payload?.data || action.payload;

        if (Array.isArray(state.items)) {
          state.items = state.items.map((item) => {
            const itemId = item.id;

            const updatedId = updated?.id;

            const orphanId = updated?.orphan?.id;

            if (itemId === updatedId || (orphanId && itemId === orphanId)) {
              return {
                ...item,
                ...updated,
              };
            }

            return item;
          });
        }

        if (
          state.selectedDetails?.id === updated?.id ||
          state.selectedDetails?.id === updated?.orphan?.id
        ) {
          state.selectedDetails = updated;
        }

        state.status = "succeeded";
      })

      .addCase(updateSponsorshipStatus.rejected, (state, action) => {
        state.status = "failed";

        state.error = action.payload;
      })

      // sendAnnualReport
      .addCase(sendAnnualReportAction.pending, (state) => {
        state.status = "loading";
      })

      .addCase(sendAnnualReportAction.fulfilled, (state) => {
        state.status = "succeeded";
      })

      .addCase(sendAnnualReportAction.rejected, (state, action) => {
        state.status = "failed";

        state.error = action.payload;
      });
  },
});

export const {
  setSelectedItem: setSponsorship,
  clearSelected: clearSponsorship,
  clearSelectedDetails: clearSponsorshipDetails,
} = sponsorshipsSlice.actions;

export default sponsorshipsSlice.reducer;
