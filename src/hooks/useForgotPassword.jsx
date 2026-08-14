import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";
import { requestOtpUser, resetPasswordUser } from "@/store/authSlice";
import toast from "react-hot-toast";

export function useForgotPassword() {
  const { t, lang } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const isArabic = lang === "ar";

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    if (!phoneNumber) {
      toast.error(t("enterPhoneNumber") || "يرجى إدخال رقم الهاتف");
      return;
    }

    setLoading(true);
    try {
      await dispatch(requestOtpUser(phoneNumber)).unwrap();
      toast.success(t("otpSentSuccess") || "تم إرسال رمز التحقق بنجاح");
      setStep(2);
    } catch (error) {
      // إذا كان السيرفر يرد برسالة خطأ مثل "لم يتم العثور على المستخدم" أو خطأ 404
      const errorMessage =
        typeof error === "string"
          ? error
          : error?.message ||
            t("phoneNotFound") ||
            "رقم الهاتف غير مسجل في النظام";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!code || code.length < 4) {
      toast.error(t("enterValidCode"));
      return;
    }
    if (!newPassword || newPassword.length < 6) {
      toast.error(t("passwordMinLength"));
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error(t("passwordsNotMatch"));
      return;
    }

    setLoading(true);
    try {
      await dispatch(resetPasswordUser({ code, newPassword })).unwrap();
      toast.success(t("passwordResetSuccess"));
      navigate("/login");
    } catch (error) {
      toast.error(typeof error === "string" ? error : t("errorOccurred"));
    } finally {
      setLoading(false);
    }
  };

  return {
    step,
    setStep,
    loading,
    phoneNumber,
    setPhoneNumber,
    code,
    setCode,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    handleRequestOtp,
    handleResetPassword,
    isArabic,
    t,
    navigate,
  };
}
