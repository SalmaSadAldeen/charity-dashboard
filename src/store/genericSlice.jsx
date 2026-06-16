import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { adminService } from "@/services/adminService";
export const createGenericActions = (resource) => ({
  //   fetchItems: createAsyncThunk(`${resource}/fetchAll`, async (page) => {
  //     // إذا كان هناك صفحة، نرسلها في الـ query، وإلا نجلب الكل
  //     const url = page ? `${resource}?page=${page}` : resource;
  //     const response = await adminService.getAll(url); // تأكدي أن adminService يدعم المسار المباشر
  //     return response.data;
  //   }),

  // genericSlice.js
  fetchItems: createAsyncThunk(`${resource}/fetchAll`, async (page) => {
    // محاكاة تأخير السيرفر
    await new Promise((resolve) => setTimeout(resolve, 500));

    // مصفوفة الموظفين الخاصة بكِ
    return {
      // في genericSlice.js
      data: [
        { id: 1, name: "أحمد", email: "a@test.com", role: "مدير" },
        { id: 2, name: "سارة", email: "s@test.com", role: "موظفة" },
        { id: 3, name: "ببب", email: "s@test.com", role: "موظفة" },
        { id: 4, name: "لسس", email: "s@test.com", role: "موظفة" },
        {
          id: 5,
          name: "للل",
          email: "s@test.com",
          role: "موظفة",
          status: "active",
        },
      ],
      meta: { currentPage: 1, lastPage: 1 },
    };
  }),
  addItem: createAsyncThunk(`${resource}/add`, async (data) => {
    // إذا كنتِ تستخدمين السيرفر، استبدلي السطر التالي بـ adminService.addRecord
    await new Promise((resolve) => setTimeout(resolve, 500));
    return data; // نرجع البيانات لنضيفها في الـ extraReducers
  }),

  //   deleteItem: createAsyncThunk(`${resource}/delete`, async (id) => {
  //     await adminService.deleteRecord(resource, id);
  //     return id;
  //   }),
  // في genericSlice.js - عدلي دالة deleteItem لتصبح هكذا:
  deleteItem: createAsyncThunk(`${resource}/delete`, async (id) => {
    // محاكاة تأخير السيرفر فقط
    await new Promise((resolve) => setTimeout(resolve, 300));
    return id; // إرجاع الـ id مباشرة سيؤدي لتشغيل الـ extraReducer والحذف من المصفوفة
  }),
  updateItem: createAsyncThunk(`${resource}/update`, async ({ id, data }) => {
    const response = await adminService.updateRecord(resource, id, data);
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
            if (action.payload.data) {
              state.items = action.payload.data;
              state.pagination = action.payload.meta;
            } else {
              // إذا كان الـ payload هو المصفوفة مباشرة (مثل الأدوار)
              state.items = action.payload;
              state.pagination = { currentPage: 1, lastPage: 1 }; // لا يوجد ترقيم
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
          .addCase(addItem.fulfilled, (state, action) => {
            state.items.push(action.payload); // إضافة الموظف الجديد للمصفوفة
            state.status = "succeeded";
            console.log("تم استلام البيانات في الـ Slice:", action.payload);
          })
          .addCase(addItem.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
          })
          // --- حالات التحديث ---
          .addCase(updateItem.fulfilled, (state, action) => {
            const index = state.items.findIndex(
              (item) => item.id === action.payload.id,
            );
            if (index !== -1) state.items[index] = action.payload;
            state.status = "succeeded";
          });
      },
    }),
  };
};
