import { API } from "./api";

export const adminService = {
  fetchEmployees: (page, limit) =>
    API.get(`/employee?page=${page}&limit=${limit}`),
  fetchEmployeeById: (id) => API.get(`/employee/${id}`),

  addEmployee: (data) => API.post("/employee", data),

  deleteEmployee: (id) => API.delete(`/employee/${id}`),
  updateEmployee: (id, data) => API.patch(`/employee/${id}`, data),

  getDashboardStats: () => API.get("/admin/dashboard/summary"),
  getDistributionCharts: (period = "monthly") =>
    API.get(`/api/admin/dashboard/charts/distributions?period=${period}`),
  getRequestsCharts: () => API.get(`/api/admin/dashboard/charts/requests`),

  getSponsorshipsStats: () => API.get("/api/admin/dashboard/sponsorships"),
  getOrphansStats: () => API.get("/api/admin/dashboard/orphans"),
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

  getPermissions: () => {
    return API.get("/roles/permissions");
  },

  logout: () => API.post("/auth/logout"),
};
