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

  getProfile: () => API.get("/api/profile"),

  getRoles: () => API.get("/roles").then((res) => res.data.data),
  getRoleById: (id) => API.get(`/roles/${id}`),
  addRole: (data) => API.post("/roles", data),
  updateRole: (idOrObj, data) => {
    const id = typeof idOrObj === "object" ? idOrObj.id : idOrObj;
    const payload = typeof idOrObj === "object" ? idOrObj.data : data;
    return API.patch(`/roles/${id}`, payload);
  },
  deleteRole: (id) => API.delete(`/roles/${id}`),
  // داخل adminService.js
  getPermissions: () => {
    return API.get("/roles/permissions"); // أو المسار الصحيح لديكِ
  },
};
