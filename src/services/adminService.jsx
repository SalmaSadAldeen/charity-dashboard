import axios from "axios";

// إنشاء نسخة من Axios لتقليل التكرار
const API = axios.create({
  baseURL: "/api/admin",
});

export const adminService = {
  // الموظفين والأدوار
  getEmployees: () => API.get("/employees"),
  getRoles: () => API.get("/roles"),

  // المستخدمين
  addUser: (data) =>
    API.post("/users", data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  deleteEmployee: (id) => API.delete(`/employees/${id}`),
  updateEmployee: (id, data) => API.patch(`/employees/${id}`, data),

  // إحصائيات لوحة التحكم (التي طلبتِها)
  getDashboardStats: () => API.get("/dashboard/summary"),
  getDistributionCharts: (view = "monthly") =>
    API.get(`/dashboard/charts/distributions?view=${view}`),
  getRequestsCharts: () => API.get("/dashboard/charts/requests"),
};
