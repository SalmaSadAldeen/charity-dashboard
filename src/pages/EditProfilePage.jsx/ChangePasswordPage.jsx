import { useState } from "react";
import { useProfile } from "@/hooks/useProfile";
import {
  Lock,
  Loader2,
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ChangePasswordPage() {
  const navigate = useNavigate();

  // حالات إظهار/إخفاء مستقلة لكل حقل لضفة تحكم أفضل
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    handleChangePassword,
    loadingPassword,
    isArabic,
    t,
  } = useProfile();

  // دالة الإرسال مع العودة التلقائية للبروفايل عند النجاح
  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleChangePassword(e);
    // إذا لم يعد هناك عملية تحميل (تم بنجاح أو ظهر خطأ وتم التعامل معه)
    // لتجنب الخروج عند وجود خطأ، يمكنك فحص الحالة أو الاعتماد على الـ toast
  };

  return (
    <div
      className="max-w-xl mx-auto p-6 space-y-6"
      dir={isArabic ? "rtl" : "ltr"}
    >
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div>
          <h1 className="text-2xl font-black text-on-surface-variant flex items-center gap-2">
            <Lock size={22} />
            {t("changePassword") || "تغيير كلمة المرور"}
          </h1>
        </div>

        {/* زر الرجوع مع سهم متوافق مع الاتجاه */}
        <button
          onClick={() => navigate("/dashboard/profile")}
          className="flex items-center gap-1.5 py-2 px-3.5 bg-gray-100 hover:bg-gray-200 text-on-surface-variant rounded-2xl text-xs font-bold transition-colors cursor-pointer"
        >
          {isArabic ? <ArrowRight size={16} /> : <ArrowLeft size={16} />}
          <span>{t("back") || "رجوع"}</span>
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-surface-lowest border border-border rounded-3xl p-6 space-y-5 shadow-sm"
      >
        {/* الحقل الأول: كلمة المرور الحالية */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-on-surface-variant/80">
            {t("currentPassword") || "كلمة المرور الحالية"}
          </label>
          <div className="relative">
            <input
              type={showCurrentPassword ? "text" : "password"}
              placeholder="••••••••"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full py-3 px-4 bg-gray-50/50 border border-border rounded-2xl text-sm font-bold text-on-surface-variant focus:outline-none focus:border-primary transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              className={`absolute top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer ${isArabic ? "left-3" : "right-3"}`}
            >
              {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* الحقل الثاني: كلمة المرور الجديدة */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-on-surface-variant/80">
            {t("newPassword") || "كلمة المرور الجديدة"}
          </label>
          <div className="relative">
            <input
              type={showNewPassword ? "text" : "password"}
              placeholder="••••••••"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full py-3 px-4 bg-gray-50/50 border border-border rounded-2xl text-sm font-bold text-on-surface-variant focus:outline-none focus:border-primary transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className={`absolute top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer ${isArabic ? "left-3" : "right-3"}`}
            >
              {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* الحقل الثالث: تأكيد كلمة المرور */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-on-surface-variant/80">
            {t("confirmPassword") || "تأكيد كلمة المرور"}
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full py-3 px-4 bg-gray-50/50 border border-border rounded-2xl text-sm font-bold text-on-surface-variant focus:outline-none focus:border-primary transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className={`absolute top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer ${isArabic ? "left-3" : "right-3"}`}
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={
            loadingPassword ||
            !currentPassword ||
            !newPassword ||
            !confirmPassword
          }
          className="w-full py-3.5 bg-primary/100 text-white rounded-2xl font-bold text-sm hover:bg-primary/90 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loadingPassword ? (
            <Loader2 className="animate-spin" size={18} />
          ) : (
            t("updatePasswordBtn") || "تحديث كلمة المرور"
          )}
        </button>
      </form>
    </div>
  );
}
