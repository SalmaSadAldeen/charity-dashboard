import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { adminService } from "@/services/adminService";
import { orphanService } from "@/services/orphanService";
import { beneficiaryService } from "@/services/beneficiaryService";
import { requestsService } from "@/services/requestsService";
import { donorService } from "@/services/donorService";
import { sponsorshipsService } from "@/services/sponsorshipsService.jsx";
import { sponsorshipFundService } from "@/services/sponsorshipFundService.jsx"; // حسب مسارك الصحيح
export const createGenericActions = (resource) => ({
  fetchItems: createAsyncThunk(
    `${resource}/fetchAll`,
    async (params = {}, { rejectWithValue }) => {
      try {
        if (resource === "roles") return await adminService.getRoles();
        if (resource === "employees")
          return (
            await adminService.fetchEmployees(
              params.page || 1,
              params.limit || 10,
              params.isSponsor,
            )
          ).data;

        if (resource === "orphans")
          return (
            await orphanService.getOrphans(
              params.page || 1,
              params.limit || 10,
              params.supported,
            )
          ).data;
        if (resource === "beneficiaries") {
          return (
            await beneficiaryService.getBeneficiaries(
              params.page || 1,
              params.limit || 10,
              params.status,
            )
          ).data;
        }
        if (resource === "helpRequests")
          return (
            await requestsService.fetchHelpRequests(
              params.page || 1,
              params.limit || 10,
              params.status,
            )
          ).data;
        if (resource === "donors") {
          return (
            await donorService.getDonors(
              params.page || 1,
              params.limit || 10,
              params.isSponsor,
            )
          ).data;
        }
        if (resource === "profile") {
          return (await adminService.getProfile()).data;
        }
        if (resource === "permissions") {
          return (await adminService.getPermissions()).data;
        }

        if (resource === "sponsorships") {
          return (
            await sponsorshipsService.fetchSponsorships(
              params.page || 1,
              params.limit || 10,
              params.status,
            )
          ).data;
        }
        if (resource === "sponsorshipFundCoverages") {
          return (
            await sponsorshipFundService.fetchCoverages(
              params.page || 1,
              params.limit || 10,
              params.status,
            )
          ).data;
        }

        if (resource === "sponsorshipFundSupports") {
          return (
            await sponsorshipFundService.fetchSupports(
              params.page || 1,
              params.limit || 10,
            )
          ).data;
        }
        throw new Error(`Fetch action not defined for ${resource}`);
      } catch (err) {
        return rejectWithValue(err.response?.data?.message || err.message);
      }
    },
  ),

  fetchItemById: createAsyncThunk(
    `${resource}/fetchOne`,
    async ({ id }, { rejectWithValue }) => {
      try {
        if (resource === "employees") {
          return (await adminService.fetchEmployeeById(id)).data;
        }
        if (resource === "orphans") {
          return (await orphanService.fetchOrphanById(id)).data;
        }
        if (resource === "beneficiaries") {
          return (await beneficiaryService.fetchBeneficiaryById(id)).data;
        }
        if (resource === "helpRequests") {
          return (await requestsService.fetchHelpRequestById(id)).data;
        }

        if (resource === "donors") {
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
        }

        if (resource === "roles") {
          return (await adminService.getRoleById(id)).data;
        }
        if (resource === "sponsorships") {
          return (await sponsorshipsService.fetchSponsorshipById(id)).data;
        }

        throw new Error(`Fetch single action not defined for ${resource}`);
      } catch (err) {
        return rejectWithValue(err.response?.data?.message || err.message);
      }
    },
  ),

  addItem: createAsyncThunk(
    `${resource}/add`,
    async (data, { rejectWithValue }) => {
      try {
        let response;
        if (resource === "employees")
          response = await adminService.addEmployee(data);
        else if (resource === "orphans")
          response = await orphanService.addOrphan(data);
        else if (resource === "roles")
          response = await adminService.addRole(data);
        else throw new Error(`Add action not defined for ${resource}`);
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response?.data?.message || err.message);
      }
    },
  ),

  deleteItem: createAsyncThunk(
    `${resource}/delete`,
    async (id, { rejectWithValue }) => {
      try {
        let response;
        if (resource === "employees")
          response = await adminService.deleteEmployee(id);
        else if (resource === "orphans")
          response = await orphanService.deleteOrphan(id);
        else if (resource === "roles")
          response = await adminService.deleteRole(id);
        else throw new Error(`Delete action not defined for ${resource}`);

        return { id, message: response.data.message };
      } catch (err) {
        return rejectWithValue(err.response?.data?.message || err.message);
      }
    },
  ),

  updateItem: createAsyncThunk(
    `${resource}/update`,
    async (arg, { rejectWithValue }) => {
      try {
        const id =
          arg?.id !== undefined
            ? arg.id
            : arg?._id !== undefined
              ? arg?._id
              : arg;
        const data = arg?.data !== undefined ? arg.data : arg;

        let response;
        if (resource === "employees") {
          response = await adminService.updateEmployee(id, data);
        } else if (resource === "orphans") {
          response = await orphanService.updateOrphan(id, data);
        } else if (resource === "roles") {
          response = await adminService.updateRole(id, data);
        } else if (resource === "beneficiaries") {
          response = await beneficiaryService.updateBeneficiary(id, data);
        } else if (resource === "sponsorships") {
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

          response = await sponsorshipsService.updateSponsorshipStatus(
            id,
            formData,
          );
        } else {
          throw new Error(`Update action not defined for ${resource}`);
        }

        return response.data;
      } catch (err) {
        return rejectWithValue(err.response?.data?.message || err.message);
      }
    },
  ),

  updateItemStatus: createAsyncThunk(
    `${resource}/updateStatus`,
    async ({ id, data }, { rejectWithValue }) => {
      try {
        let response;
        if (resource === "helpRequests") {
          response = await requestsService.updateRequestStatus(id, data);
        } else if (resource === "beneficiaries" || resource === "beneficiary") {
          response = await beneficiaryService.updateBeneficiaryStatus(id, data);
        } else if (resource === "sponsorships") {
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

          response = await sponsorshipsService.updateSponsorshipStatus(
            id,
            formData,
          );

          return response?.data || response;
        } else {
          throw new Error(`Update status action not defined for ${resource}`);
        }

        return response.data;
      } catch (err) {
        return rejectWithValue(err.response?.data?.message || err.message);
      }
    },
  ),

  sendAnnualReport: createAsyncThunk(
    `${resource}/sendAnnualReport`,
    async ({ sponsorshipId, formData }, { rejectWithValue }) => {
      try {
        if (resource !== "sponsorships") {
          throw new Error("Action only defined for sponsorships");
        }
        const response = await sponsorshipsService.sendAnnualReport(
          sponsorshipId,
          formData,
        );
        return response?.data || response;
      } catch (err) {
        return rejectWithValue(err.response?.data?.message || err.message);
      }
    },
  ),
});

export const createGenericSlice = (resource) => {
  const {
    fetchItems,
    deleteItem,
    updateItem,
    addItem,
    fetchItemById,
    updateItemStatus,
    sendAnnualReport,
  } = createGenericActions(resource);

  return {
    actions: {
      fetchItems,
      deleteItem,
      updateItem,
      addItem,
      fetchItemById,
      updateItemStatus,
      sendAnnualReport,
    },
    slice: createSlice({
      name: resource,
      initialState: {
        items: [],
        status: "idle",
        selectedItem: null,
        selectedDetails: null,
        detailsStatus: "idle",
        pagination: { currentPage: 1, lastPage: 1 },
        error: null,
      },
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
          // --- fetchItems ---
          .addCase(fetchItems.pending, (state) => {
            state.status = state.items.length > 0 ? "succeeded" : "loading";
            state.error = null;
          })
          .addCase(fetchItems.fulfilled, (state, action) => {
            const payload = action.payload;
            if (resource === "profile") {
              state.selectedDetails = payload?.data || payload;
              state.detailsStatus = "succeeded";
              state.status = "succeeded";
              return;
            }

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
          .addCase(fetchItems.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
          })

          // --- deleteItem ---
          .addCase(deleteItem.pending, (state) => {
            state.status = "loading";
          })
          .addCase(deleteItem.fulfilled, (state, action) => {
            state.items = state.items.filter(
              (item) => item.id !== action.payload.id,
            );
            if (state.selectedItem?.id === action.payload.id)
              state.selectedItem = null;
            state.status = "succeeded";
          })
          .addCase(deleteItem.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
          })

          // --- addItem ---
          .addCase(addItem.pending, (state) => {
            state.status = "loading";
          })
          .addCase(addItem.fulfilled, (state, action) => {
            state.items.push(action.payload.data || action.payload);
            state.status = "succeeded";
          })
          .addCase(addItem.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
          })

          // --- updateItem ---
          .addCase(updateItem.pending, (state) => {
            state.status = "loading";
          })
          .addCase(updateItem.fulfilled, (state, action) => {
            const updatedItem = action.payload?.data || action.payload;

            if (updatedItem && updatedItem.id) {
              state.items = state.items.map((item) =>
                item.id === Number(updatedItem.id)
                  ? { ...item, ...updatedItem, id: Number(updatedItem.id) }
                  : item,
              );
              if (state.selectedItem?.id === Number(updatedItem.id)) {
                state.selectedItem = updatedItem;
              }
            }
            state.status = "succeeded";
          })
          .addCase(updateItem.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
          })

          // --- fetchItemById ---
          .addCase(fetchItemById.pending, (state) => {
            state.detailsStatus = state.selectedDetails
              ? "succeeded"
              : "loading";
          })
          .addCase(fetchItemById.fulfilled, (state, action) => {
            state.selectedDetails = action.payload?.data || action.payload;
            state.detailsStatus = "succeeded";
          })
          .addCase(fetchItemById.rejected, (state, action) => {
            state.detailsStatus = "failed";
            state.error = action.payload;
          })

          // --- updateItemStatus ---
          .addCase(updateItemStatus.pending, (state) => {
            state.status = "loading";
          })
          .addCase(updateItemStatus.fulfilled, (state, action) => {
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
          .addCase(updateItemStatus.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
          })

          // --- sendAnnualReport (تمت إضافتها هنا لتكتمل الدورة) ---
          .addCase(sendAnnualReport.pending, (state) => {
            state.status = "loading";
          })
          .addCase(sendAnnualReport.fulfilled, (state) => {
            state.status = "succeeded";
          })
          .addCase(sendAnnualReport.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
          });
      },
    }),
  };
};
