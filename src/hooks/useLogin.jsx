import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginStart, loginSuccess, loginFailure } from "@/store/authSlice";
export const useLogin = () => {
  const dispatch = useDispatch();

  // جلب حالة الـ Redux إذا احتجناها في التصميم (مثل إظهار Spinner أثناء التحميل)
  const { isLoading, error } = useSelector((state) => state.auth);

  // البحث عن إيميل محفوظ سابقاً، إن لم يوجد يبدأ الصندوق فارغاً
  const [email, setEmail] = useState(
    localStorage.getItem("rememberedEmail") || "",
  );
  const [password, setPassword] = useState(
    localStorage.getItem("rememberedPassword") || "",
  );
  const [showPassword, setShowPassword] = useState(false);

  // إذا كان هناك إيميل محفوظ، نجعل الزر مفعلاً تلقائياً منذ البداية
  const [rememberMe, setRememberMe] = useState(
    localStorage.getItem("rememberMe") === "true",
  );

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleRememberMe = () => setRememberMe(!rememberMe);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    dispatch(loginStart());

    try {
      // هنا سيتم استدعاء الـ API لاحقاً، حالياً سنحاكي اتصالاً ناجحاً
      if (email === "admin@foundation.org" && password === "12345678") {
        const mockUserData = {
          name: "Admin User",
          email: email,
          role: "Super Administrator",
        };
        dispatch(loginSuccess(mockUserData));
        // إذا كان المستخدم مفعّلاً لزر التذكر، نحفظ بياناته في ذاكرة المتصفح
        if (rememberMe) {
          localStorage.setItem("rememberedEmail", email);
          localStorage.setItem("rememberedPassword", password);
          localStorage.setItem("rememberMe", "true");
        } else {
          // إذا لم يفعّله، نمسح أي بيانات قديمة لكي لا تظهر مرة أخرى
          localStorage.removeItem("rememberedEmail");
          localStorage.removeItem("rememberedPassword");
          localStorage.removeItem("rememberMe");
        }
        alert("Login Successful!");
      } else {
        dispatch(loginFailure("Invalid authorized credentials."));
      }
    } catch (err) {
      dispatch(loginFailure("Network error, please try again."));
    }
  };

  // نُرجع فقط البيانات والدوال التي تحتاجها واجهة التصميم للعرض
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
//(Component-Based Architecture with Separation of Concerns).
