import axios from "axios";

// 1. أولاً: إنشاء النسخة
const API = axios.create({
  baseURL: "http://localhost:3000", // الرابط المباشر
  // baseURL: "/", // هذا يضمن أن الطلبات تذهب للـ Proxy أولاً
});
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      // تعديل هنا: التأكد من إنشاء كائن headers إذا لم يكن موجوداً
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
      console.log("🚀 الطلب يخرج الآن إلى:", config.baseURL + config.url);
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// 3. ثالثاً: تصدير الـ API والخدمات
export { API }; // نحتاجها في ملف useLogin
export const adminService = {
  // الموظفين والأدوار
  getEmployees: (page = 1, limit = 10) =>
    API.get(`/employee?page=${page}&limit=${limit}`),

  addEmployee: (data) => API.post("/employee", data, {}),
  deleteEmployee: (id) => API.delete(`/employee/${id}`),
  updateEmployee: (id, data) => API.patch(`/employee/${id}`, data),

  // إحصائيات لوحة التحكم (التي طلبتِها)
  getDashboardStats: () => API.get("/admin/dashboard/summary"),

  getDistributionCharts: (view = "monthly") =>
    API.get(`/admin/dashboard/charts/distributions?view=${view}`),

  getRequestsCharts: () => API.get(`/admin/dashboard/charts/requests`),
  getRoles: () => API.get("role"),
  uploadImage: (formData) => API.post("/employee/upload", formData),
};
