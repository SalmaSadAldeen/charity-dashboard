import { useState } from "react";
import { ShieldCheck, Lock, Loader2, Eye, EyeOff } from "lucide-react";

export default function ResetPasswordStep({
  code,
  setCode,
  newPassword,
  setNewPassword,
  confirmPassword,
  setConfirmPassword,
  handleResetPassword,
  setStep,
  loading,
  isArabic,
  t,
}) {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <form
      onSubmit={handleResetPassword}
      className="space-y-5"
      dir={isArabic ? "rtl" : "ltr"}
    >
      <div className="space-y-2">
        <label className="text-xs font-black uppercase tracking-wider text-on-surface-variant/80 block">
          {t("verificationCode")}
        </label>
        <div className="relative">
          <span
            className={`absolute inset-y-0 ${isArabic ? "right-4" : "left-4"} flex items-center text-gray-400 pointer-events-none`}
          >
            <ShieldCheck size={18} />
          </span>
          <input
            type="text"
            name="otp-code" 
            autoComplete="one-time-code"
            maxLength={4}
            dir="ltr"
            placeholder="1234"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full py-3.5 bg-gray-50/50 border border-border rounded-2xl text-center text-lg font-black tracking-widest text-on-surface-variant focus:outline-none focus:border-primary focus:bg-white transition-all shadow-xs"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-black uppercase tracking-wider text-on-surface-variant/80 block">
          {t("newPassword")}
        </label>
        <div className="relative">
          <span
            className={`absolute inset-y-0 ${isArabic ? "right-4" : "left-4"} flex items-center text-gray-400 pointer-events-none`}
          >
            <Lock size={18} />
          </span>
          <input
            type={showNewPassword ? "text" : "password"}
            autoComplete="new-password"
            placeholder="••••••••"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className={`w-full py-3.5 bg-gray-50/50 border border-border rounded-2xl text-sm font-bold text-on-surface-variant focus:outline-none focus:border-primary focus:bg-white transition-all shadow-xs ${
              isArabic ? "pr-12 pl-12 text-right" : "pl-12 pr-12 text-left"
            }`}
          />
          <button
            type="button"
            onClick={() => setShowNewPassword(!showNewPassword)}
            className={`absolute inset-y-0 ${isArabic ? "left-4" : "right-4"} flex items-center text-gray-400 hover:text-gray-600 cursor-pointer`}
          >
            {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-black uppercase tracking-wider text-on-surface-variant/80 block">
          {t("confirmPassword")}
        </label>
        <div className="relative">
          <span
            className={`absolute inset-y-0 ${isArabic ? "right-4" : "left-4"} flex items-center text-gray-400 pointer-events-none`}
          >
            <Lock size={18} />
          </span>
          <input
            type={showConfirmPassword ? "text" : "password"}
            autoComplete="new-password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`w-full py-3.5 bg-gray-50/50 border border-border rounded-2xl text-sm font-bold text-on-surface-variant focus:outline-none focus:border-primary focus:bg-white transition-all shadow-xs ${
              isArabic ? "pr-12 pl-12 text-right" : "pl-12 pr-12 text-left"
            }`}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className={`absolute inset-y-0 ${isArabic ? "left-4" : "right-4"} flex items-center text-gray-400 hover:text-gray-600 cursor-pointer`}
          >
            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={() => setStep(1)}
          className="w-1/3 py-3.5 px-4 bg-gray-100 text-on-surface-variant rounded-2xl font-bold text-xs hover:bg-gray-200 transition-all cursor-pointer"
        >
          {isArabic ? "الرجوع للخلف" : "Back"}
        </button>

        <button
          type="submit"
          disabled={loading}
          className="w-2/3 py-3.5 px-6 bg-primary text-white rounded-2xl font-bold text-sm hover:opacity-90 transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="animate-spin" size={18} />
          ) : (
            <span>{t("resetPasswordBtn")}</span>
          )}
        </button>
      </div>
    </form>
  );
}
