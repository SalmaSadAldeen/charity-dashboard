import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { requestsService } from "@/services/requestsService";

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

export const fetchHelpRequests = createAsyncThunk(
  "helpRequests/fetchAll",
  async (params = {}, { rejectWithValue }) => {
    try {
      return (
        await requestsService.fetchHelpRequests(
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

export const fetchHelpRequestById = createAsyncThunk(
  "helpRequests/fetchOne",
  async ({ id }, { rejectWithValue }) => {
    try {
      return (
        await requestsService.fetchHelpRequestById(
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

export const addHelpRequest = createAsyncThunk(
  "helpRequests/add",
  async (data, { rejectWithValue }) => {
    try {
      const {
        beneficiaryId,
        aidType,
        formData,
      } = data;

      const aidActions = {
        HEALTH:
          requestsService.createHealthAidRequest,

        FOOD:
          requestsService.createFoodAidRequest,

        EDUCATION:
          requestsService.createEducationAidRequest,

        HOUSING:
          requestsService.createHousingAidRequest,

        SMALL_PROJECTS:
          requestsService.createSmallProjectAidRequest,
      };

      const action =
        aidActions[aidType];

      if (action) {
        const response = await action(
          beneficiaryId,
          formData,
        );

        return response.data;
      }

      console.error(
        "Invalid aid type",
      );

      return undefined;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message,
      );
    }
  },
);

export const updateHelpRequestStatus =
  createAsyncThunk(
    "helpRequests/updateStatus",
    async ({ id, data }, { rejectWithValue }) => {
      try {
        return (
          await requestsService.updateRequestStatus(
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

const helpRequestsSlice = createSlice({
  name: "helpRequests",
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
        fetchHelpRequests.pending,
        (state) => {
          state.status =
            state.items.length > 0
              ? "succeeded"
              : "loading";

          state.error = null;
        },
      )

      .addCase(
        fetchHelpRequests.fulfilled,
        (state, action) => {
          const payload = action.payload;

          const itemsData =
            Array.isArray(payload)
              ? payload
              : payload?.data || [];

          state.items = itemsData.map(
            (item) => ({
              ...item,
              id: Number(
                item.id ||
                  item.donorId,
              ),
            }),
          );

          const meta = payload?.meta;

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

          state.status = "succeeded";
        },
      )

      .addCase(
        fetchHelpRequests.rejected,
        (state, action) => {
          state.status = "failed";
          state.error = action.payload;
        },
      )

      .addCase(
        addHelpRequest.pending,
        (state) => {
          state.status = "loading";
        },
      )

      .addCase(
        addHelpRequest.fulfilled,
        (state, action) => {
          if (
            action.payload !== undefined
          ) {
            state.items.push(
              action.payload.data ||
                action.payload,
            );
          }

          state.status = "succeeded";
        },
      )

      .addCase(
        addHelpRequest.rejected,
        (state, action) => {
          state.status = "failed";
          state.error = action.payload;
        },
      )

      .addCase(
        fetchHelpRequestById.pending,
        (state) => {
          state.detailsStatus =
            state.selectedDetails
              ? "succeeded"
              : "loading";
        },
      )

      .addCase(
        fetchHelpRequestById.fulfilled,
        (state, action) => {
          state.selectedDetails =
            action.payload?.data ||
            action.payload;

          state.detailsStatus =
            "succeeded";
        },
      )

      .addCase(
        fetchHelpRequestById.rejected,
        (state, action) => {
          state.detailsStatus =
            "failed";

          state.error = action.payload;
        },
      )

      .addCase(
        updateHelpRequestStatus.pending,
        (state) => {
          state.status = "loading";
        },
      )

      .addCase(
        updateHelpRequestStatus.fulfilled,
        (state, action) => {
          const updated =
            action.payload?.data ||
            action.payload;

          if (
            Array.isArray(state.items)
          ) {
            state.items =
              state.items.map(
                (item) => {
                  const itemId =
                    item.id;

                  const updatedId =
                    updated?.id;

                  const orphanId =
                    updated?.orphan?.id;

                  if (
                    itemId ===
                      updatedId ||
                    (orphanId &&
                      itemId ===
                        orphanId)
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
        updateHelpRequestStatus.rejected,
        (state, action) => {
          state.status = "failed";
          state.error = action.payload;
        },
      );
  },
});

export const {
  setSelectedItem: setHelpRequest,
  clearSelected: clearHelpRequest,
  clearSelectedDetails:
    clearHelpRequestDetails,
} = helpRequestsSlice.actions;

export default helpRequestsSlice.reducer;