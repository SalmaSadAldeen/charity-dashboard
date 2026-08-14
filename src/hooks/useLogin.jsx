import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginStart, loginSuccess, loginFailure } from "@/store/authSlice";
import { messaging } from "@/firebase";
import { API } from "@/services/api";
import { useNavigate } from "react-router-dom";
import { getToken } from "firebase/messaging";


export const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState(
    localStorage.getItem("rememberedEmail") || "",
  );
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const registerNotificationToken = async () => {
    try {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        // جلب التوكن مباشرة بدون انتظار الـ serviceWorker.ready لتجنب أي تعليق
        const token = await getToken(messaging, {
          vapidKey:
            "BD2IU2XiRhPo7K5e_kz5gvSVbTEtHqa93Kkkh8rMUbl_v9h59gEbyHIoS0N4NAIPYHRL_F68UNgWEtrWPgvplm8",
        });

        if (token) {
          console.log(
            "🔥 تم استخراج الـ Firebase Registration ID بنجاح:",
            token,
          );

          // إرسال التوكن مباشرة للباك إند بالـ PUT
          await API.put("/notifications/registration", {
            registrationId: token,
          });
          console.log(
            "🚀 تم إرسال الـ registrationId وتسجيله في السيرفر بنجاح!",
          );
        } else {
          console.log("⚠️ التحذير: التوكن رجع فارغاً");
        }
      } else {
        console.log("⚠️ المستخدم رفض إذن الإشعارات");
      }
    } catch (err) {
      console.error("❌ خطأ أثناء تسجيل التوكن في السيرفر:", err);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());

    try {
      const response = await API.post("/auth/login", { email, password });
      const { accessToken, userType, roles } = response.data;

      localStorage.setItem("token", accessToken);
      localStorage.setItem("userType", userType);
      localStorage.setItem("roles", JSON.stringify(roles));
      localStorage.setItem("rememberedEmail", email);

      dispatch(
        loginSuccess({
          userType: userType,
          roles: roles,
        }),
      );

      // الانتقال الفوري للوحة التحكم
      navigate("/dashboard/employees");

      // إرسال التوكن في الخلفية بصمت تام بدون أن يؤثر على الانتقال
      registerNotificationToken().catch((err) => {
        console.error("فشل تسجيل الإشعارات في الخلفية:", err);
      });
    } catch (err) {
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
