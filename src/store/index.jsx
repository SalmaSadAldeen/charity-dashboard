import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import layoutReducer from "./layoutSlice";
import languageReducer from "./languageSlice";
import dashboardReducer from "./dashboardSlice";
import { createGenericSlice } from "./genericSlice";
// 1. التعريفات الأساسية (مرة واحدة فقط)
// ... (الاستيرادات)

const employeesSlice = createGenericSlice("employees");
const orphansSlice = createGenericSlice("orphans");
const rolesSlice = createGenericSlice("roles");

// --- 1. تصدير أctions الموظفين ---
export const {
  setSelectedItem: setEmployee,
  clearSelected: clearEmployee,
  clearSelectedDetails: clearEmployeeDetails, // أضيفيها هنا لتكون متاحة
} = employeesSlice.slice.actions;

export const {
  addItem: addEmployee,
  fetchItems: fetchEmployees,
  deleteItem: deleteEmployee,
  updateItem: updateEmployee,
  fetchItemById: fetchEmployeeById,
} = employeesSlice.actions;

// --- 2. تصدير أctions الأيتام (واضحة ومنظمة) ---
export const {
  setSelectedItem: setOrphan,
  clearSelected: clearOrphan,
  clearSelectedDetails: clearOrphanDetails, // سميناها هكذا لمنع التخبيص!
} = orphansSlice.slice.actions;

export const {
  addItem: addOrphan,
  fetchItems: fetchOrphans,
  deleteItem: deleteOrphan,
  updateItem: updateOrphan,
  fetchItemById: fetchOrphanById,
} = orphansSlice.actions;

// ... (تصدير الأدوار وبقية الـ Store) // تأكدي من أنكِ أخذتِ الـ actions من orphansSlice
export const { fetchItems: fetchRoles } = rolesSlice.actions;
// export const { setSelectedItem, clearSelected } = employeesSlice.slice.actions;
orphansSlice.slice.actions;
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
