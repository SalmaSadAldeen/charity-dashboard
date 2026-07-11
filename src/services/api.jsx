import axios from "axios";
const API = axios.create({
  baseURL: "http://localhost:3000",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  const lang = localStorage.getItem("preferredLang") || "ar";
  config.headers["Accept-Language"] = lang;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
// التعامل مع الخطأ 401 (Unauthorized) تلقائياً
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // إذا انتهى التوكن، امسحي كل شيء ووجهي المستخدم لصفحة اللوجن
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);
export { API };
