import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { adminService } from "@/services/adminService";
export const createGenericActions = (resource) => ({
  fetchItems: createAsyncThunk(`${resource}/fetchAll`, async (params = {}) => {
    // نستخدم الـ resource لتحديد الدالة الصحيحة
    if (resource === "roles") return (await adminService.getRoles()).data;
    if (resource === "employees")
      return (await adminService.getEmployees(params.page, params.limit)).data;
    // ... أضيفي بقية الموارد هنا
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
  const { fetchItems, deleteItem, updateItem, addItem } =
    createGenericActions(resource);

  return {
    actions: { fetchItems, deleteItem, updateItem, addItem },
    slice: createSlice({
      name: resource,
      initialState: {
        items: [],
        status: "idle",
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
            const payload = action.payload;

            // 1. إذا كان الـ payload يحتوي على مفتاح data (مثل استجابة الأدوار التي أرسلتِها)
            if (payload && payload.data && Array.isArray(payload.data)) {
              state.items = payload.data;
            }
            // 2. إذا كان الـ payload هو المصفوفة مباشرة
            else if (Array.isArray(payload)) {
              state.items = payload;
            }
            // 3. إذا كان هناك pagination (للموظفين)
            if (payload.meta) {
              state.pagination = payload.meta;
            }

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
            if (index !== -1) state.items[index] = action.payload;
            state.status = "succeeded";
          })
          .addCase(updateItem.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
          });
      },
    }),
  };
};
