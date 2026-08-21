import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { adminService } from "@/services/adminService";

const initialState = {
  items: [],
  status: "idle",
  selectedItem: null,
  selectedDetails: null,
  detailsStatus: "idle",
  pagination: { currentPage: 1, lastPage: 1 },
  error: null,
};

export const fetchEmployees = createAsyncThunk(
  "employees/fetchAll",
  async (params = {}, { rejectWithValue }) => {
    try {
      return (
        await adminService.fetchEmployees(
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

export const fetchEmployeeById = createAsyncThunk(
  "employees/fetchOne",
  async ({ id }, { rejectWithValue }) => {
    try {
      return (await adminService.fetchEmployeeById(id)).data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  },
);

export const addEmployee = createAsyncThunk(
  "employees/add",
  async (data, { rejectWithValue }) => {
    try {
      const response = await adminService.addEmployee(data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  },
);

export const deleteEmployee = createAsyncThunk(
  "employees/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await adminService.deleteEmployee(id);

      return {
        id,
        message: response.data.message,
      };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  },
);

export const updateEmployee = createAsyncThunk(
  "employees/update",
  async (arg, { rejectWithValue }) => {
    try {
      const id =
        arg?.id !== undefined ? arg.id : arg?._id !== undefined ? arg._id : arg;

      const data = arg?.data !== undefined ? arg.data : arg;

      const response = await adminService.updateEmployee(id, data);

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  },
);

const employeesSlice = createSlice({
  name: "employees",
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

      // fetchItems
      .addCase(fetchEmployees.pending, (state) => {
        state.status = state.items.length > 0 ? "succeeded" : "loading";

        state.error = null;
      })

      .addCase(fetchEmployees.fulfilled, (state, action) => {
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

      .addCase(fetchEmployees.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // deleteItem
      .addCase(deleteEmployee.pending, (state) => {
        state.status = "loading";
      })

      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id,
        );

        if (state.selectedItem?.id === action.payload.id) {
          state.selectedItem = null;
        }

        state.status = "succeeded";
      })

      .addCase(deleteEmployee.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // addItem
      .addCase(addEmployee.pending, (state) => {
        state.status = "loading";
      })

      .addCase(addEmployee.fulfilled, (state, action) => {
        state.items.push(action.payload.data || action.payload);

        state.status = "succeeded";
      })

      .addCase(addEmployee.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // updateItem
      .addCase(updateEmployee.pending, (state) => {
        state.status = "loading";
      })

      .addCase(updateEmployee.fulfilled, (state, action) => {
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

      .addCase(updateEmployee.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // fetchItemById
      .addCase(fetchEmployeeById.pending, (state) => {
        state.detailsStatus = state.selectedDetails ? "succeeded" : "loading";
      })

      .addCase(fetchEmployeeById.fulfilled, (state, action) => {
        state.selectedDetails = action.payload?.data || action.payload;

        state.detailsStatus = "succeeded";
      })

      .addCase(fetchEmployeeById.rejected, (state, action) => {
        state.detailsStatus = "failed";
        state.error = action.payload;
      });
  },
});

export const {
  setSelectedItem: setEmployee,
  clearSelected: clearEmployee,
  clearSelectedDetails: clearEmployeeDetails,
} = employeesSlice.actions;

export default employeesSlice.reducer;
