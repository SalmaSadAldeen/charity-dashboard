import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginStart, loginSuccess, loginFailure } from "@/store/authSlice";
import { API } from "@/services/adminService";
// تأكدي من استيراد الـ API الخاص بكِ
import { useNavigate } from "react-router-dom"; // 1. الاستيراد

export const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState(
    localStorage.getItem("rememberedEmail") || "",
  );
  const [password, setPassword] = useState(
    localStorage.getItem("rememberedPassword") || "",
  );
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(
    localStorage.getItem("rememberMe") === "true",
  );

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleRememberMe = () => setRememberMe(!rememberMe);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());

    try {
      // 1. استدعاء السيرفر
      const response = await API.post("/auth/login", { email, password });
      const { accessToken, user } = response.data;

      // 2. تخزين الـ token
      localStorage.setItem("token", accessToken);

      // 3. إدارة "تذكرني"
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", email);
        localStorage.setItem("rememberedPassword", password);
        localStorage.setItem("rememberMe", "true");
      } else {
        localStorage.removeItem("rememberedEmail");
        localStorage.removeItem("rememberedPassword");
        localStorage.removeItem("rememberMe");
      }

      // 4. تحديث الـ Redux
      dispatch(loginSuccess(user));

      // navigate("/dashboard");
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
    rememberMe,
    isLoading,
    error,
    togglePasswordVisibility,
    toggleRememberMe,
    handleLoginSubmit,
  };
};
