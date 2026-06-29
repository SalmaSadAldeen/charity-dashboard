import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import layoutReducer from "./layoutSlice";
import languageReducer from "./languageSlice";
import dashboardReducer from "./dashboardSlice";
import { createGenericSlice } from "./genericSlice";

// 1. التعريفات الأساسية (مرة واحدة فقط)
const employeesSlice = createGenericSlice("employees");
const orphansSlice = createGenericSlice("orphans");
const rolesSlice = createGenericSlice("roles");

// 2. تصدير الـ Actions (بدون تكرار)
export const {
  addItem: addEmployee,
  fetchItems: fetchEmployees,
  deleteItem: deleteEmployee,
  updateItem: updateEmployee,
  fetchItemById: fetchEmployeeById,
} = employeesSlice.actions;

export const {
  addItem: addOrphan,
  fetchItems: fetchOrphan,
  deleteItem: deleteOrphan,
  updateItem: updateOrphan,
} = orphansSlice.actions;

export const { fetchItems: fetchRoles } = rolesSlice.actions;
export const { setSelectedItem, clearSelected } = employeesSlice.slice.actions;

// 3. إعداد الـ Store
export const store = configureStore({
  reducer: {
    auth: authReducer,
    layout: layoutReducer,
    language: languageReducer,
    dashboard: dashboardReducer,
    employees: employeesSlice.slice.reducer,
    orphans: orphansSlice.slice.reducer,
    roles: rolesSlice.slice.reducer, // هذا هو الاسم الذي يجب أن تستخدميه في الـ useSelector
  },
});
