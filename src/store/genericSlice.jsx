import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { adminService } from "@/services/adminService";

export const createGenericActions = (resource) => ({
  fetchItems: createAsyncThunk(`${resource}/fetchAll`, async (params = {}) => {
    // 1. حالة الأدوار: لا تحتاج بارامترات (أو كما يطلب الـ API)
    if (resource === "roles") {
      return (await adminService.getRoles()).data;
    }

    // 2. حالة الموظفين: نمرر الـ params (page, limit)
    if (resource === "employees") {
      return (
        await adminService.getEmployees(params.page || 1, params.limit || 10)
      ).data;
    }

    // 3. حالة الأيتام: نمرر الـ params إذا كانت مدعومة
    if (resource === "orphans") {
      // افترضي أن لديك دالة getOrphans في الـ adminService
      return (
        await adminService.getOrphans(params.page || 1, params.limit || 10)
      ).data;
    }

    throw new Error(`Fetch action not defined for ${resource}`);
  }),

  // أضيفي هذا داخل الدالة createGenericActions
  fetchItemById: createAsyncThunk(`${resource}/fetchOne`, async (id) => {
    if (resource === "employees") {
      return (await adminService.getOneEmployee(id)).data;
    }
    // يمكنك إضافة حالات أخرى للأيتام لاحقاً
    throw new Error(`Fetch single action not defined for ${resource}`);
  }),

  // 1. إضافة عنصر جديد (addItem)
  addItem: createAsyncThunk(`${resource}/add`, async (data) => {
    let response;
    if (resource === "employees")
      response = await adminService.addEmployee(data);
    else if (resource === "orphans")
      response = await adminService.addOrphan(data);
    else throw new Error(`Add action not defined for ${resource}`);
    return response.data;
  }),

  deleteItem: createAsyncThunk(`${resource}/delete`, async (id) => {
    if (resource === "employees") await adminService.deleteEmployee(id);
    else if (resource === "orphans") await adminService.deleteOrphan(id);
    else throw new Error(`Delete action not defined for ${resource}`);
    return id;
  }),

  updateItem: createAsyncThunk(`${resource}/update`, async ({ id, data }) => {
    let response;
    if (resource === "employees")
      response = await adminService.updateEmployee(id, data);
    else if (resource === "orphans")
      response = await adminService.updateOrphan(id, data);
    else throw new Error(`Update action not defined for ${resource}`);
    return response.data;
  }),
});

export const createGenericSlice = (resource) => {
  const { fetchItems, deleteItem, updateItem, addItem, fetchItemById } =
    createGenericActions(resource);

  return {
    actions: { fetchItems, deleteItem, updateItem, addItem, fetchItemById },
    slice: createSlice({
      name: resource,
      initialState: {
        items: [],
        status: "idle",
        selectedEmployee: null, // أضيفي هذا
        pagination: { currentPage: 1, lastPage: 1 },
        error: null,
      },
      reducers: {},
      extraReducers: (builder) => {
        builder
          // --- حالات الجلب ---
          .addCase(fetchItems.pending, (state) => {
            state.status = "loading";
          })
          .addCase(fetchItems.fulfilled, (state, action) => {
            const payload = action.payload; // payload هنا هو الكائن الذي يحتوي على data و meta

            state.items = payload.data || [];

            // تحديث الـ pagination بناءً على الهيكلية المرسلة في الـ JSON الخاص بكِ
            state.pagination = {
              currentPage: payload.meta?.page || 1,
              lastPage: payload.meta?.totalPages || 1,
              total: payload.meta?.totalCount || 0,
              hasNextPage: payload.meta?.hasNextPage || false,
              hasPreviousPage: payload.meta?.hasPreviousPage || false,
            };

            state.status = "succeeded";
          })
          .addCase(fetchItems.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
          })

          // --- حالات الحذف ---
          .addCase(deleteItem.pending, (state) => {
            state.status = "loading";
          })
          .addCase(deleteItem.fulfilled, (state, action) => {
            state.items = state.items.filter(
              (item) => item.id !== action.payload,
            );
            state.status = "succeeded";
          })
          .addCase(deleteItem.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
          })
          // داخل extraReducers
          // --- حالات الإضافة (addItem) ---
          .addCase(addItem.pending, (state) => {
            state.status = "loading"; // المستخدم يرى دائرة تحميل
          })
          .addCase(addItem.fulfilled, (state, action) => {
            state.items.push(action.payload);
            state.status = "succeeded";
          })
          .addCase(addItem.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message; // المستخدم يرى رسالة خطأ
          })

          // --- حالات التحديث (updateItem) ---
          .addCase(updateItem.pending, (state) => {
            state.status = "loading";
          })
          .addCase(updateItem.fulfilled, (state, action) => {
            const index = state.items.findIndex(
              (item) => item.id === action.payload.id,
            );
            if (index !== -1) {
              // التأكد من دمج التعديلات مع الـ roles الجديدة
              state.items[index] = { ...state.items[index], ...action.payload };
            }
            state.status = "succeeded";
          })
          .addCase(updateItem.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
          })
          .addCase(fetchItemById.pending, (state) => {
            state.status = "loading";
          })
          .addCase(fetchItemById.fulfilled, (state, action) => {
            state.selectedEmployee = action.payload; // حفظ الموظف المجلوب
            state.status = "succeeded";
          })
          .addCase(fetchItemById.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
          });
      },
    }),
  };
};
