import "react";
import { useLogin } from "../../hooks/useLogin";
import LoginHeader from "./components/LoginHeader";
import InputField from "./components/InputField";
import RememberMeToggle from "./components/RememberMeToggle";

const LoginPage = () => {
  // جلب المنطق بالكامل من الهوك بأسطر نظيفة
  const {
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
  } = useLogin();

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center bg-no-repeat relative px-4"
      style={{ backgroundImage: `url('src/assets/images/bg.png')` }}
    >
      <div className="absolute inset-0 bg-[#f4f1eb]/80 backdrop-blur-sm"></div>

      <div className="relative z-10 w-full max-w-[480px] bg-white rounded-xl shadow-2xl overflow-hidden border border-[#eae6df]">
        {/* 1. استدعاء الهيدر المفصول */}
        <LoginHeader error={error} />

        {/* نموذج تسجيل الدخول */}
        <form onSubmit={handleLoginSubmit} className="px-8 pb-8 space-y-5">
          {/* 2. استدعاء حقل الإيميل المفصول */}
          <InputField
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@foundation.org"
            icon="mail"
          />

          {/* 3. استدعاء حقل الباسورد المفصول مع تمرير زر العين بداخله */}
          <InputField
            label="Secure Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            icon="lock"
            autoComplete="current-password"
          >
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 text-[#aca599] hover:text-[#7c766c] flex items-center"
            >
              <span className="material-symbols-outlined text-[20px]">
                {showPassword ? "visibility_off" : "visibility"}
              </span>
            </button>
          </InputField>

          {/* 4. استدعاء زر التذكر المخصص المفصول */}
          <RememberMeToggle checked={rememberMe} onToggle={toggleRememberMe} />

          {/* زر تقديم الفورم الرئيسي */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 bg-[#fbd460] hover:bg-[#ebd052] text-[#544e3b] font-semibold py-3 px-4 rounded-lg flex items-center justify-center space-x-2 shadow-md transition-colors duration-200 disabled:opacity-50"
          >
            <span className="text-sm">
              {isLoading ? "Accessing..." : "Sign In & Access Dashboard"}
            </span>
            <span className="material-symbols-outlined text-[18px]">login</span>
          </button>
        </form>

        {/* الفوتر الثابت */}
        <div className="bg-[#fcfbfa] border-t border-[#eae6df] py-4 px-8 text-center">
          <p className="text-[10px] leading-relaxed text-[#a39c90] max-w-[320px] mx-auto">
            Access Restricted. For password retrieval or account inquiries,
            please contact the System Super Administrator directly.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
