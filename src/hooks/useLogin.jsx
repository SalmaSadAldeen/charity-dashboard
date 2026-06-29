import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginStart, loginSuccess, loginFailure } from "@/store/authSlice";
import { API } from "@/services/adminService";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.auth);

  // تخزين الإيميل فقط ليظهر في حقل الإدخال تلقائياً
  const [email, setEmail] = useState(
    localStorage.getItem("rememberedEmail") || "",
  );
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());

    try {
      // 1. استدعاء السيرفر
      const response = await API.post("/auth/login", { email, password });
      const { accessToken, user } = response.data;

      // 2. تخزين الـ token (أمان: لا تخزني كلمة المرور أبداً)
      localStorage.setItem("token", accessToken);

      // 3. تخزين الإيميل فقط لتسهيل الدخول القادم
      localStorage.setItem("rememberedEmail", email);

      // 4. تحديث الـ Redux
      dispatch(loginSuccess(user));

      // 5. التوجيه للوحة التحكم
      navigate("/dashboard/employees");
    } catch (err) {
      // التعامل مع الأخطاء
      const errorMessage = err.response?.data?.message || "Login Failed";
      dispatch(loginFailure(errorMessage));
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    isLoading,
    error,
    togglePasswordVisibility,
    handleLoginSubmit,
  };
};
