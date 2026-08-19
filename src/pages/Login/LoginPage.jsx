import { useEffect } from "react"; 
import { useTranslation } from "@/hooks/useTranslation";
import { useLogin } from "../../hooks/useLogin";
import LoginHeader from "./components/LoginHeader";
import InputField from "./components/InputField";
import { Link, useNavigate } from "react-router-dom";
const LoginPage = () => {
  const { t, lang } = useTranslation();
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);
  const {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    isLoading,
    error,
    togglePasswordVisibility,
    handleLoginSubmit,
  } = useLogin();

  return (
    <div
      dir={lang === "ar" ? "rtl" : "ltr"}
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center bg-no-repeat relative px-4"
      style={{ backgroundImage: `url('src/assets/images/bg.png')` }}
    >
      <div className="absolute inset-0 bg-[#f4f1eb]/80 backdrop-blur-sm"></div>

      <div className="relative z-10 w-full max-w-[480px] bg-surface-lowest rounded-xl shadow-2xl overflow-hidden border border-[#eae6df]">
        <LoginHeader error={error} />

        <form onSubmit={handleLoginSubmit} className="px-8 pb-8 space-y-5">
          <InputField
            label={t("email")}
            autoComplete="username"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@foundation.org"
            icon="mail"
          />

          <InputField
            label={t("securePassword")}
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            icon="lock"
            autoComplete="new-password"
            minLength={6} // 👈 قيد منع الأقل من 6 خانات
          >
            {/* هنا التعديل: قمنا بإزالة absolute و right-3 */}
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="text-[#aca599] hover:text-[#7c766c] flex items-center"
            >
              <span className="material-symbols-outlined text-[20px]">
                {showPassword ? "visibility_off" : "visibility"}
              </span>
            </button>
          </InputField>

          <div
            className={`flex ${lang === "ar" ? "justify-start" : "justify-end"} -mt-2`}
          >
            <Link
              to="/forgot-password"
              className="text-xs font-semibold text-[#8c8275] hover:text-[#544e3b] transition-colors"
            >
              {t("forgotPasswordPrompt") ||
                (lang === "ar" ? "هل نسيت كلمة المرور؟" : "Forgot password?")}
            </Link>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 bg-[#fbd460] hover:bg-[#ebd052] text-[#544e3b] font-semibold py-3 px-4 rounded-lg flex items-center justify-center space-x-2 shadow-md transition-colors duration-200 disabled:opacity-50"
          >
            <span className="text-sm">
              {isLoading ? t("accessing") : t("signInAccess")}
            </span>
            <span className="material-symbols-outlined text-[18px]">login</span>
          </button>
        </form>

        <div className="bg-[#fcfbfa] border-t border-[#eae6df] py-4 px-8 text-center">
          <p className="text-[10px] leading-relaxed text-[#a39c90] max-w-[320px] mx-auto">
            {t("loginFooterNote")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
