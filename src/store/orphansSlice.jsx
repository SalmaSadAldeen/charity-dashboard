import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { orphanService } from "@/services/orphanService";

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

export const fetchOrphans = createAsyncThunk(
  "orphans/fetchAll",
  async (params = {}, { rejectWithValue }) => {
    try {
      return (
        await orphanService.getOrphans(
          params.page || 1,
          params.limit || 10,
          params.supported,
          params.priority,
        )
      ).data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  },
);

export const fetchOrphanById = createAsyncThunk(
  "orphans/fetchOne",
  async ({ id }, { rejectWithValue }) => {
    try {
      return (await orphanService.fetchOrphanById(id)).data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  },
);

export const addOrphan = createAsyncThunk(
  "orphans/add",
  async (data, { rejectWithValue }) => {
    try {
      return (await orphanService.addOrphan(data)).data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  },
);

export const deleteOrphan = createAsyncThunk(
  "orphans/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await orphanService.deleteOrphan(id);

      return {
        id,
        message: response.data.message,
      };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  },
);

export const updateOrphan = createAsyncThunk(
  "orphans/update",
  async (arg, { rejectWithValue }) => {
    try {
      const id =
        arg?.id !== undefined ? arg.id : arg?._id !== undefined ? arg._id : arg;

      const data = arg?.data !== undefined ? arg.data : arg;

      return (await orphanService.updateOrphan(id, data)).data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  },
);

const orphansSlice = createSlice({
  name: "orphans",
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

      .addCase(fetchOrphans.pending, (state) => {
        state.status = state.items.length > 0 ? "succeeded" : "loading";

        state.error = null;
      })

      .addCase(fetchOrphans.fulfilled, (state, action) => {
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

      .addCase(fetchOrphans.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      .addCase(deleteOrphan.pending, (state) => {
        state.status = "loading";
      })

      .addCase(deleteOrphan.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id,
        );

        if (state.selectedItem?.id === action.payload.id) {
          state.selectedItem = null;
        }

        state.status = "succeeded";
      })

      .addCase(deleteOrphan.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      .addCase(addOrphan.pending, (state) => {
        state.status = "loading";
      })

      .addCase(addOrphan.fulfilled, (state, action) => {
        state.items.push(action.payload.data || action.payload);

        state.status = "succeeded";
      })

      .addCase(addOrphan.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      .addCase(updateOrphan.pending, (state) => {
        state.status = "loading";
      })

      .addCase(updateOrphan.fulfilled, (state, action) => {
        const updatedItem = action.payload?.data || action.payload;

        if (updatedItem && updatedItem.id) {
          state.items = state.items.map((item) =>
            item.id === Number(updatedItem.id)
              ? {
                  ...item,
                  ...updatedItem,
                  id: Number(updatedItem.id),
                }
              : item,
          );

          if (state.selectedItem?.id === Number(updatedItem.id)) {
            state.selectedItem = updatedItem;
          }
        }

        state.status = "succeeded";
      })

      .addCase(updateOrphan.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      .addCase(fetchOrphanById.pending, (state) => {
        state.detailsStatus = state.selectedDetails ? "succeeded" : "loading";
      })

      .addCase(fetchOrphanById.fulfilled, (state, action) => {
        state.selectedDetails = action.payload?.data || action.payload;

        state.detailsStatus = "succeeded";
      })

      .addCase(fetchOrphanById.rejected, (state, action) => {
        state.detailsStatus = "failed";
        state.error = action.payload;
      });
  },
});

export const {
  setSelectedItem: setOrphan,
  clearSelected: clearOrphan,
  clearSelectedDetails: clearOrphanDetails,
} = orphansSlice.actions;

export default orphansSlice.reducer;
