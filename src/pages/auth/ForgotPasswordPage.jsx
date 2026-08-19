import { KeyRound, ShieldCheck } from "lucide-react";
import { useForgotPassword } from "@/hooks/useForgotPassword";
import RequestOtpStep from "./components/RequestOtpStep";
import ResetPasswordStep from "./components/ResetPasswordStep";
import { Toaster } from "react-hot-toast"; 
export default function ForgotPasswordPage() {
  const {
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
  } = useForgotPassword();

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-[#f9f7f4] p-4"
      dir={isArabic ? "rtl" : "ltr"}
    >
      <Toaster position="top-center" reverseOrder={false} />
      <div className="w-full max-w-md bg-surface-lowest rounded-3xl shadow-sm border border-border p-8 space-y-8 animate-in fade-in duration-500">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto border border-primary/20 shadow-xs">
            {step === 1 ? <KeyRound size={26} /> : <ShieldCheck size={26} />}
          </div>
          <h2 className="text-2xl font-black text-on-surface-variant tracking-tight">
            {step === 1 ? t("forgotPassword") : t("verifyAndReset")}
          </h2>
          <p className="text-xs text-gray-500 font-medium">
            {step === 1
              ? t("forgotPasswordSubtitle")
              : t("resetPasswordSubtitle")}
          </p>
        </div>

        {step === 1 ? (
          <RequestOtpStep
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            handleRequestOtp={handleRequestOtp}
            loading={loading}
            isArabic={isArabic}
            t={t}
          />
        ) : (
          <ResetPasswordStep
            code={code}
            setCode={setCode}
            newPassword={newPassword}
            setNewPassword={setNewPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            handleResetPassword={handleResetPassword}
            setStep={setStep}
            loading={loading}
            isArabic={isArabic}
            t={t}
          />
        )}

        <div className="text-center pt-2 border-t border-border">
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-xs font-bold text-primary hover:underline cursor-pointer"
          >
            {t("backToLogin")}
          </button>
        </div>
      </div>
    </div>
  );
}
