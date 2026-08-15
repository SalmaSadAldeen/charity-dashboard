import { useLayout } from "../../../hooks/useLayout";
import { useDispatch, useSelector } from "react-redux";
import { toggleLanguage } from "../../../store/languageSlice";
import { useTranslation } from "@/hooks/useTranslation";
import NotificationBell from "@/pages/NotificationBell/NotificationBell"; // 1. استيراد مكون الجرس
export default function TopBar() {
  const { searchQuery, handleSearch } = useLayout();
  const { t, lang } = useTranslation();
  const dispatch = useDispatch();
  const handleLangChange = () => {
    dispatch(toggleLanguage());
  };
  const getDisplayUserType = (type) => {
    if (lang !== "ar") return type; // إذا كان إنجليزي يعرض القيمة كما هي تماماً (مثل Admin أو Employee)

    // إذا كان عربي، نقوم بالترجمة حسب القيمة القادمة من الـ API
    switch (type?.toLowerCase()) {
      case "admin":
        return "مدير نظام";
      case "employee":
      case "staff":
        return "موظف";
      default:
        return type; // لو كان شي تاني يعرضه كما هو احتياطاً
    }
  };
  const { userType } = useSelector((state) => state.auth);
  return (
    <header
      className="h-16 px-8 flex items-center justify-between shadow-lg z-10 backdrop-blur-md"
      style={{
        backgroundColor: "#4d4636E6",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <div></div>
      <div className="flex items-center gap-4">
        <NotificationBell />
        <button
          onClick={handleLangChange}
          className="w-12 h-10 rounded-2xl font-bold text-xs transition-all duration-300 flex items-center justify-center border border-white/10 bg-surface-lowest/5 hover:bg-surface-lowest/10 active:scale-90"
          style={{ color: "#fad564" }}
        >
          {lang === "ar" ? "EN" : "AR"}
        </button>

        <div className="flex items-center gap-3 ps-4 border-s border-white/10">
          <div className="text-start">
            <p className="text-sm font-bold text-white leading-tight">
              {getDisplayUserType(userType)}
            </p>
          </div>
          <div
            className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg border border-white/10"
            style={{ backgroundColor: "#fad564" }}
          >
            <span className="material-symbols-outlined text-on-surface-variant">
              person
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
