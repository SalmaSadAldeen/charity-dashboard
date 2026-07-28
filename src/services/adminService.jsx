// import { API } from "./api"; // افترضت أن API مُصدرة من ملف api.js
// export const adminService = {
//   // الموظفين والأدوار
//   fetchEmployees: (page, limit) =>
//     API.get(`/employee?page=${page}&limit=${limit}`),
//   getOneEmployee: (id) => {
//     console.log("Service: Fetching ID", id); // هل تظهر هذه؟
//     return API.get(`/employee/${id}`);
//   }, // في adminService.jsx
//   addEmployee: (data) =>
//     API.post("/employee", data, {
//       headers: {
//         "Content-Type": "multipart/form-data", // جربي إضافتها هنا يدوياً
//       },
//     }),
//   deleteEmployee: (id) => API.delete(`/employee/${id}`),
//   updateEmployee: (id, data) => API.patch(`/employee/${id}`, data),

//   // إحصائيات لوحة التحكم (التي طلبتِها)
//   getDashboardStats: () => API.get("/admin/dashboard/summary"),

//   getDistributionCharts: (view = "monthly") =>
//     API.get(`/admin/dashboard/charts/distributions?view=${view}`),

//   getRequestsCharts: () => API.get(`/admin/dashboard/charts/requests`),
//   getRoles: () => API.get("role").then((res) => res.data.data),
//   // uploadImage: (formData) => API.post("/employee/upload", formData),
// };
import { API } from "./api";

export const adminService = {
  // الموظفين
  fetchEmployees: (page, limit) =>
    API.get(`/employee?page=${page}&limit=${limit}`),
  fetchEmployeeById: (id) => API.get(`/employee/${id}`),

  // لا تضعي Content-Type يدوياً، دعي Axios يفعل ذلك!
  addEmployee: (data) => API.post("/employee", data),

  deleteEmployee: (id) => API.delete(`/employee/${id}`),
  updateEmployee: (id, data) => API.patch(`/employee/${id}`, data),

  // إحصائيات لوحة التحكم
  getDashboardStats: () => API.get("/admin/dashboard/summary"),
  getDistributionCharts: (view = "monthly") =>
    API.get(`/admin/dashboard/charts/distributions?view=${view}`),
  getRequestsCharts: () => API.get(`/admin/dashboard/charts/requests`),
  getRoles: () => API.get("role").then((res) => res.data.data),

  getProfile: () => API.get("/api/profile"),
};
