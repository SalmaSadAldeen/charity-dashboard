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
    // التحقق هل الخطأ جاء من مسار تغيير كلمة المرور؟
    const isPasswordRoute = error.config?.url?.includes("/api/profile/password");

    // إذا كان الخطأ 401 ولم يكن بسبب تغيير كلمة المرور، نقوم بتسجيل الخروج وتحويله للوجن
    if (error.response?.status === 401 && !isPasswordRoute) {
      const savedLang = localStorage.getItem("preferredLang") || "ar";

      localStorage.removeItem("token");
      localStorage.removeItem("userType");
      localStorage.removeItem("roles");
      localStorage.setItem("preferredLang", savedLang);

      if (!window.location.pathname.includes("/login")) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  },
);

export { API };