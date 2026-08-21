import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { adminService } from "@/services/adminService";

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

export const fetchPermissions = createAsyncThunk(
  "permissions/fetchAll",
  async (_params = {}, { rejectWithValue }) => {
    try {
      return (
        await adminService.getPermissions()
      ).data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message,
      );
    }
  },
);

const permissionsSlice = createSlice({
  name: "permissions",
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

      .addCase(
        fetchPermissions.pending,
        (state) => {
          state.status =
            state.items.length > 0
              ? "succeeded"
              : "loading";

          state.error = null;
        },
      )

      .addCase(
        fetchPermissions.fulfilled,
        (state, action) => {
          const payload =
            action.payload;

          const itemsData =
            Array.isArray(payload)
              ? payload
              : payload?.data || [];

          state.items =
            itemsData.map((item) => ({
              ...item,
              id: Number(
                item.id ||
                  item.donorId,
              ),
            }));

          const meta =
            payload?.meta;

          if (meta) {
            state.pagination = {
              currentPage:
                meta.page || 1,
              lastPage:
                meta.totalPages || 1,
              total:
                meta.totalCount || 0,
            };
          }

          state.status =
            "succeeded";
        },
      )

      .addCase(
        fetchPermissions.rejected,
        (state, action) => {
          state.status = "failed";
          state.error = action.payload;
        },
      );
  },
});

export default permissionsSlice.reducer;