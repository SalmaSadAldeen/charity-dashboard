import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { beneficiaryService } from "@/services/beneficiaryService";

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

export const fetchBeneficiaries = createAsyncThunk(
  "beneficiaries/fetchAll",
  async (params = {}, { rejectWithValue }) => {
    try {
      return (
        await beneficiaryService.getBeneficiaries(
          params.page || 1,
          params.limit || 10,
          params.status,
        )
      ).data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message,
      );
    }
  },
);

export const fetchBeneficiariesById = createAsyncThunk(
  "beneficiaries/fetchOne",
  async ({ id }, { rejectWithValue }) => {
    try {
      return (
        await beneficiaryService.fetchBeneficiaryById(
          id,
        )
      ).data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message,
      );
    }
  },
);

export const addBeneficiary = createAsyncThunk(
  "beneficiaries/add",
  async (data, { rejectWithValue }) => {
    try {
      return (
        await beneficiaryService.createBeneficiary(
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

export const updateBeneficiaryStatus =
  createAsyncThunk(
    "beneficiaries/updateStatus",
    async ({ id, data }, { rejectWithValue }) => {
      try {
        return (
          await beneficiaryService.updateBeneficiaryStatus(
            id,
            data,
          )
        ).data;
      } catch (err) {
        return rejectWithValue(
          err.response?.data?.message ||
            err.message,
        );
      }
    },
  );

const beneficiariesSlice = createSlice({
  name: "beneficiaries",
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
        fetchBeneficiaries.pending,
        (state) => {
          state.status =
            state.items.length > 0
              ? "succeeded"
              : "loading";

          state.error = null;
        },
      )

      .addCase(
        fetchBeneficiaries.fulfilled,
        (state, action) => {
          const payload = action.payload;

          const itemsData = Array.isArray(payload)
            ? payload
            : payload?.data || [];

          state.items = itemsData.map((item) => ({
            ...item,
            id: Number(
              item.id || item.donorId,
            ),
          }));

          const meta = payload?.meta;

          if (meta) {
            state.pagination = {
              currentPage: meta.page || 1,
              lastPage:
                meta.totalPages || 1,
              total:
                meta.totalCount || 0,
            };
          }

          state.status = "succeeded";
        },
      )

      .addCase(
        fetchBeneficiaries.rejected,
        (state, action) => {
          state.status = "failed";
          state.error = action.payload;
        },
      )

      .addCase(
        addBeneficiary.pending,
        (state) => {
          state.status = "loading";
        },
      )

      .addCase(
        addBeneficiary.fulfilled,
        (state, action) => {
          state.items.push(
            action.payload.data ||
              action.payload,
          );

          state.status = "succeeded";
        },
      )

      .addCase(
        addBeneficiary.rejected,
        (state, action) => {
          state.status = "failed";
          state.error = action.payload;
        },
      )

      .addCase(
        fetchBeneficiariesById.pending,
        (state) => {
          state.detailsStatus =
            state.selectedDetails
              ? "succeeded"
              : "loading";
        },
      )

      .addCase(
        fetchBeneficiariesById.fulfilled,
        (state, action) => {
          state.selectedDetails =
            action.payload?.data ||
            action.payload;

          state.detailsStatus =
            "succeeded";
        },
      )

      .addCase(
        fetchBeneficiariesById.rejected,
        (state, action) => {
          state.detailsStatus =
            "failed";

          state.error = action.payload;
        },
      )

      .addCase(
        updateBeneficiaryStatus.pending,
        (state) => {
          state.status = "loading";
        },
      )

      .addCase(
        updateBeneficiaryStatus.fulfilled,
        (state, action) => {
          const updated =
            action.payload?.data ||
            action.payload;

          if (Array.isArray(state.items)) {
            state.items = state.items.map(
              (item) => {
                const itemId = item.id;
                const updatedId =
                  updated?.id;
                const orphanId =
                  updated?.orphan?.id;

                if (
                  itemId === updatedId ||
                  (orphanId &&
                    itemId === orphanId)
                ) {
                  return {
                    ...item,
                    ...updated,
                  };
                }

                return item;
              },
            );
          }

          if (
            state.selectedDetails?.id ===
              updated?.id ||
            state.selectedDetails?.id ===
              updated?.orphan?.id
          ) {
            state.selectedDetails =
              updated;
          }

          state.status = "succeeded";
        },
      )

      .addCase(
        updateBeneficiaryStatus.rejected,
        (state, action) => {
          state.status = "failed";
          state.error = action.payload;
        },
      );
  },
});

export const {
  setSelectedItem: setBeneficiary,
  clearSelected: clearBeneficiary,
  clearSelectedDetails:
    clearBeneficiaryDetails,
} = beneficiariesSlice.actions;

export default beneficiariesSlice.reducer;