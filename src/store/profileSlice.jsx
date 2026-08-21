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

export const getProfile = createAsyncThunk(
  "profile/fetchAll",
  async (_params = {}, { rejectWithValue }) => {
    try {
      return (
        await adminService.getProfile()
      ).data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message,
      );
    }
  },
);

export const updateProfile = createAsyncThunk(
  "profile/update",
  async (arg, { rejectWithValue }) => {
    try {
      const data =
        arg?.data !== undefined
          ? arg.data
          : arg;

      return (
        await adminService.updateProfile(
          data,
        )
      ).data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message,
      );
    }
  },
);

const profileSlice = createSlice({
  name: "profile",
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

      // getProfile
      .addCase(getProfile.pending, (state) => {
        state.status =
          state.items.length > 0
            ? "succeeded"
            : "loading";

        state.error = null;
      })

      .addCase(
        getProfile.fulfilled,
        (state, action) => {
          const payload =
            action.payload;

          state.selectedDetails =
            payload?.data ||
            payload;

          state.detailsStatus =
            "succeeded";

          state.status =
            "succeeded";
        },
      )

      .addCase(
        getProfile.rejected,
        (state, action) => {
          state.status = "failed";
          state.error = action.payload;
        },
      )

      // updateProfile
      .addCase(updateProfile.pending, (state) => {
        state.status = "loading";
      })

      .addCase(
        updateProfile.fulfilled,
        (state, action) => {
          const updatedItem =
            action.payload?.data ||
            action.payload;

          if (
            updatedItem &&
            updatedItem.id
          ) {
            state.items =
              state.items.map(
                (item) =>
                  item.id ===
                  Number(updatedItem.id)
                    ? {
                        ...item,
                        ...updatedItem,
                        id: Number(
                          updatedItem.id,
                        ),
                      }
                    : item,
              );

            if (
              state.selectedItem?.id ===
              Number(updatedItem.id)
            ) {
              state.selectedItem =
                updatedItem;
            }
          }

          state.status =
            "succeeded";
        },
      )

      .addCase(
        updateProfile.rejected,
        (state, action) => {
          state.status = "failed";
          state.error = action.payload;
        },
      );
  },
});

export default profileSlice.reducer;