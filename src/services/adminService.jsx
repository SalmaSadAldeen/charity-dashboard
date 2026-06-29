import axios from "axios";
import { store } from "@/store/index";
const API = axios.create({
  baseURL: "http://localhost:3000",
});

API.interceptors.request.use(
  (config) => {
    // 1. جلب التوكن
    const token = localStorage.getItem("token");

    // 2. جلب اللغة من الـ Redux Store مباشرة
    // اقرئيها من localStorage مباشرة لأنكِ تحفظينها هناك عند التبديل
    const lang = localStorage.getItem("preferredLang") || "ar";

    config.headers["Accept-Language"] = lang;
    config.headers = config.headers || {};

    // 3. إضافة التوكن إذا وجد
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // 4. إضافة اللغة إلى الـ Accept-Language ديناميكياً
    config.headers["Accept-Language"] = lang;

    // //console.log(
    //   `🚀 الطلب يخرج الآن إلى: ${config.baseURL}${config.url} باللغة: ${lang}`,
    // );

    return config;
  },
  (error) => Promise.reject(error),
);

export { API };
export const adminService = {
  // الموظفين والأدوار
  getEmployees: (page, limit) =>
    API.get(`/employee?page=${page}&limit=${limit}`),
  getOneEmployee: (id) => API.get(`/employee/${id}`),
  // في adminService.jsx
  addEmployee: (data) =>
    API.post("/employee", data, {
      headers: {
        "Content-Type": "multipart/form-data", // جربي إضافتها هنا يدوياً
      },
    }),
  deleteEmployee: (id) => API.delete(`/employee/${id}`),
  updateEmployee: (id, data) => API.patch(`/employee/${id}`, data),

  // إحصائيات لوحة التحكم (التي طلبتِها)
  getDashboardStats: () => API.get("/admin/dashboard/summary"),

  getDistributionCharts: (view = "monthly") =>
    API.get(`/admin/dashboard/charts/distributions?view=${view}`),

  getRequestsCharts: () => API.get(`/admin/dashboard/charts/requests`),
  getRoles: () => API.get("role").then((res) => res.data.data),
  // uploadImage: (formData) => API.post("/employee/upload", formData),
};
