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

export const fetchRoles = createAsyncThunk(
  "roles/fetchAll",
  async (_params = {}, { rejectWithValue }) => {
    try {
      return await adminService.getRoles();
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  },
);

export const fetchRoleById = createAsyncThunk(
  "roles/fetchOne",
  async ({ id }, { rejectWithValue }) => {
    try {
      return (await adminService.getRoleById(id)).data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  },
);

export const addRole = createAsyncThunk(
  "roles/add",
  async (data, { rejectWithValue }) => {
    try {
      return (await adminService.addRole(data)).data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  },
);

export const deleteRole = createAsyncThunk(
  "roles/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await adminService.deleteRole(id);

      return {
        id,
        message: response.data.message,
      };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  },
);

export const updateRole = createAsyncThunk(
  "roles/update",
  async (arg, { rejectWithValue }) => {
    try {
      const id =
        arg?.id !== undefined ? arg.id : arg?._id !== undefined ? arg._id : arg;

      const data = arg?.data !== undefined ? arg.data : arg;

      return (await adminService.updateRole(id, data)).data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  },
);

const rolesSlice = createSlice({
  name: "roles",
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

      .addCase(fetchRoles.pending, (state) => {
        state.status = state.items.length > 0 ? "succeeded" : "loading";

        state.error = null;
      })

      .addCase(fetchRoles.fulfilled, (state, action) => {
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

      .addCase(fetchRoles.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      .addCase(deleteRole.pending, (state) => {
        state.status = "loading";
      })

      .addCase(deleteRole.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id,
        );

        if (state.selectedItem?.id === action.payload.id) {
          state.selectedItem = null;
        }

        state.status = "succeeded";
      })

      .addCase(deleteRole.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      .addCase(addRole.pending, (state) => {
        state.status = "loading";
      })

      .addCase(addRole.fulfilled, (state, action) => {
        state.items.push(action.payload.data || action.payload);

        state.status = "succeeded";
      })

      .addCase(addRole.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      .addCase(updateRole.pending, (state) => {
        state.status = "loading";
      })

      .addCase(updateRole.fulfilled, (state, action) => {
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

      .addCase(updateRole.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      .addCase(fetchRoleById.pending, (state) => {
        state.detailsStatus = state.selectedDetails ? "succeeded" : "loading";
      })

      .addCase(fetchRoleById.fulfilled, (state, action) => {
        state.selectedDetails = action.payload?.data || action.payload;

        state.detailsStatus = "succeeded";
      })

      .addCase(fetchRoleById.rejected, (state, action) => {
        state.detailsStatus = "failed";
        state.error = action.payload;
      });
  },
});

export const {
  setSelectedItem: setRole,
  clearSelected: clearRole,
  clearSelectedDetails: clearRoleDetails,
} = rolesSlice.actions;

export default rolesSlice.reducer;
