import { useLayout } from "../../../hooks/useLayout";
import { useLanguage } from "../../../context/LanguageContext";
import { THEME_COLORS } from "../../../config/themeConstants";

export default function TopBar() {
  const { searchQuery, handleSearch } = useLayout();
  const { lang, toggleLanguage, t } = useLanguage();

  return (
    <header
      className="h-16 px-8 flex items-center justify-between shadow-lg z-10 backdrop-blur-md"
      style={{
        backgroundColor: `${THEME_COLORS.bgCard}E6`, // إضافة شفافية خفيفة (E6) للـ Glassmorphism
        borderBottom: `1px solid rgba(255, 255, 255, 0.05)`,
      }}
    >
      {/* 1. البحث: تصميم انسيابي */}
      <div className="flex items-center bg-white/5 rounded-2xl px-4 py-2 flex-1 max-w-xl transition-all duration-300 border border-white/5 hover:bg-white/10 focus-within:border-accent/50 focus-within:bg-white/10">
        <span className="material-symbols-outlined text-white/40 ml-3">
          search
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder={t("search")}
          className="bg-transparent border-none outline-none text-sm text-white w-full placeholder-white/30"
        />
      </div>

      {/* 2. جهة اللغة والبروفايل */}
      <div className="flex items-center gap-4">
        {/* زر اللغة: تصميم أيقوني أنيق */}
        <button
          onClick={toggleLanguage}
          className="w-12 h-10 rounded-2xl font-bold text-xs transition-all duration-300 flex items-center justify-center border border-white/10 bg-white/5 hover:bg-white/10 active:scale-90"
          style={{ color: THEME_COLORS.accent }}
        >
          {lang === "ar" ? "EN" : "AR"}
        </button>

        {/* البروفايل: تصميم احترافي */}
        {/* البروفايل: استخدام border-s (يعني Start) ليكون ذكياً في الـ RTL والـ LTR */}
        <div className="flex items-center gap-3 ps-4 border-s border-white/10">
          <div className="text-start">
            <p className="text-sm font-bold text-white leading-tight">
              مدير النظام
            </p>
            <p className="text-[10px] text-white/50">Admin</p>
          </div>
          <div
            className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg border border-white/10"
            style={{ backgroundColor: THEME_COLORS.accent }}
          >
            <span className="material-symbols-outlined text-white">person</span>
          </div>
        </div>
      </div>
    </header>
  );
}
