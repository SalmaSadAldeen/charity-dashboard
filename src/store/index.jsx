import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import layoutReducer from "./layoutSlice";
import languageReducer from "./languageSlice";
import dashboardReducer from "./dashboardSlice";

import { createGenericSlice } from "./genericSlice";
const employees = createGenericSlice("employees");
const orphans = createGenericSlice("orphans");
const rolesData = createGenericSlice("roles");

// تصدير الـ Actions
export const {
  addItem: addEmployee,
  fetchItems: fetchEmployees,
  deleteItem: deleteEmployee,
  updateItem: updateEmployee,
  fetchItemById: fetchEmployeeById, // أضيفي هذا السطر
} = employees.actions;

export const {
  addItem: addOrphan,
  fetchItems: fetchOrphan,
  deleteItem: deleteOrphan,
  updateItem: updateOrphan,
} = orphans.actions;

export const { fetchItems: fetchRoles } = rolesData.actions; // للأدوار
export const store = configureStore({
  reducer: {
    auth: authReducer,
    layout: layoutReducer,
    language: languageReducer,
    dashboard: dashboardReducer,

    employees: employees.slice.reducer,
    orphans: orphans.slice.reducer,
    roles: rolesData.slice.reducer,
  },
});
