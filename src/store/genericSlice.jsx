import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { adminService } from "@/services/adminService";
import { orphanService } from "@/services/orphanService";
import { beneficiaryService } from "@/services/beneficiaryService";
import { requestsService } from "@/services/requestsService";
import { donorService } from "@/services/donorService"; // <--- 1. استيراد خدمة المتبرعين
// استيراد الخدمة الجديدة
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

        // داخل createGenericActions
        if (resource === "orphans")
          return (
            await orphanService.getOrphans(
              params.page || 1,
              params.limit || 10,
              params.supported, // تمرير قيمة الفلتر
            )
          ).data;
        if (resource === "beneficiaries") {
          return (
            await beneficiaryService.getBeneficiaries(
              params.page || 1,
              params.limit || 10,
              params.status, // نمرر الـ status مباشرة
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
            await donorService.getDonors(params.page || 1, params.limit || 10)
          ).data;
        }
        if (resource === "profile") {
          return (await adminService.getProfile()).data;
        }
        throw new Error(`Fetch action not defined for ${resource}`);
      } catch (err) {
        return rejectWithValue(err.response?.data?.message || err.message);
      }
    },
  ),

  // في genericSlice.jsx
  fetchItemById: createAsyncThunk(
    `${resource}/fetchOne`,
    async ({ id }, { rejectWithValue }) => {
      // استقبال id و lang
      try {
        if (resource === "employees") {
          // إرسال الطلب، الـ Interceptor سيلتقط اللغة المحدثة تلقائياً
          return (await adminService.fetchEmployeeById(id)).data;
        }
        if (resource === "orphans") {
          return (await orphanService.fetchOrphanById(id)).data;
        }
        if (resource === "beneficiaries") {
          return (await beneficiaryService.fetchBeneficiaryById(id)).data;
        }
        if (resource === "helpRequests") {
          return (await requestsService.fetchHelpRequestById(id)).data; // تأكدي من وجود هذه الدالة في requestsService
        }
        if (resource === "donors") {
          return (await donorService.fetchDonorById(id)).data;
        }
        if (resource === "roles") {
          // <--- أضيفي هذه
          return (await adminService.getRoleById(id)).data;
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
          // <--- أضيفي هذه
          response = await adminService.addRole(data);
        else throw new Error(`Add action not defined for ${resource}`);
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response?.data?.message || err.message);
      }
    },
  ),

  // في ملف الـ slice، عدلي دالة deleteItem:
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
          // <--- أضيفي هذه
          response = await adminService.deleteRole(id);
        else throw new Error(`Delete action not defined for ${resource}`);

        // هنا التعديل: نرجع الاستجابة كاملة (response.data) بدلاً من id فقط
        return { id, message: response.data.message };
      } catch (err) {
        return rejectWithValue(err.response?.data?.message || err.message);
      }
    },
  ),

  updateItem: createAsyncThunk(
    `${resource}/update`,
    async ({ id, data }, { rejectWithValue }) => {
      try {
        let response;
        if (resource === "employees")
          response = await adminService.updateEmployee(id, data);
        else if (resource === "orphans")
          response = await orphanService.updateOrphan(id, data);
        else if (resource === "roles")
          // <--- أضيفي هذه
          response = await adminService.updateRole(id, data);
        else throw new Error(`Update action not defined for ${resource}`);
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response?.data?.message || err.message);
      }
    },
  ),

  // أضف هذا داخل createGenericActions أو كـ Thunk مستقل:
  // داخل createGenericActions:
  updateItemStatus: createAsyncThunk(
    `${resource}/updateStatus`,
    async ({ id, data }, { rejectWithValue }) => {
      try {
        let response;
        console.log(
          `🟢 [Thunk Start] Current Resource is: "${resource}", ID:`,
          id,
        );

        if (resource === "helpRequests") {
          response = await requestsService.updateRequestStatus(id, data);
        } else if (resource === "beneficiaries" || resource === "beneficiary") {
          response = await beneficiaryService.updateBeneficiaryStatus(id, data);
        } else {
          throw new Error(`Update status action not defined for ${resource}`);
        }

        console.log(`✅ [Thunk Success] Response:`, response.data);
        return response.data;
      } catch (err) {
        console.error(`❌ [Thunk Error Catch]:`, err);
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
  } = createGenericActions(resource);

  return {
    actions: {
      fetchItems,
      deleteItem,

      updateItem,
      addItem,
      fetchItemById,
      updateItemStatus,
    },
    slice: createSlice({
      name: resource,
      initialState: {
        items: [],
        status: "idle",
        selectedItem: null,
        selectedDetails: null, // <--- أضيفي هذا
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
          // --- حالات الجلب ---
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

            // 1. تحديد البيانات الخام (المصفوفة):
            // إذا كان الـ payload نفسه مصفوفة نأخذه، وإلا نبحث عن مفتاح 'data'
            const itemsData = Array.isArray(payload)
              ? payload
              : payload?.data || [];

            // 2. تحويل البيانات (تحويل الـ id إلى رقم):
            state.items = itemsData.map((item) => ({
              ...item,
              id: Number(item.id || item.donorId),
            }));

            // 3. تحديث الـ pagination (فقط إذا وجد meta في الـ payload):
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

          // --- حالات الحذف ---
          .addCase(deleteItem.pending, (state) => {
            state.status = "loading";
          })
          .addCase(deleteItem.fulfilled, (state, action) => {
            // بما أننا نرجع {id, message} من الـ Thunk، نستخدم action.payload.id
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

          // --- حالات الإضافة ---
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

          // --- حالات التحديث ---
          .addCase(updateItem.pending, (state) => {
            state.status = "loading";
          })
          .addCase(updateItem.fulfilled, (state, action) => {
            const updatedItem = action.payload.data;
            state.items = state.items.map((item) =>
              item.id === updatedItem.id ? updatedItem : item,
            );
            if (state.selectedItem?.id === updatedItem.id)
              state.selectedItem = updatedItem;
            state.status = "succeeded";
          })
          .addCase(updateItem.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
          })

          // --- حالات الجلب المفرد ---
          // داخل الـ extraReducers:
          .addCase(fetchItemById.pending, (state) => {
            state.detailsStatus = "loading";
            state.selectedDetails = null;
            // استخدمنا حالة التفاصيل
          })
          .addCase(fetchItemById.fulfilled, (state, action) => {
            state.selectedDetails = action.payload?.data || action.payload; // خزنّا في الـ Details
            state.detailsStatus = "succeeded";
          })
          .addCase(fetchItemById.rejected, (state, action) => {
            state.detailsStatus = "failed";
            state.error = action.payload;
          })
          .addCase(updateItemStatus.pending, (state) => {
            state.status = "loading";
          })
          .addCase(updateItemStatus.fulfilled, (state, action) => {
            const updated = action.payload?.data || action.payload;
            // تحديث العنصر في القائمة إن وجد
            state.items = state.items.map((item) =>
              item.id === updated.id ? updated : item,
            );
            // تحديث التفاصيل المحددة إذا كانت مفتوحة
            if (state.selectedDetails?.id === updated.id) {
              state.selectedDetails = updated;
            }
            state.status = "succeeded";
          })
          .addCase(updateItemStatus.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
          });
      },
    }),
  };
};
