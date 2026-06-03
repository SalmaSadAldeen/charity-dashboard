import { useLayout } from "../../../hooks/useLayout";
import { useLanguage } from "../../../context/LanguageContext"; // تأكدي من المسار
import { THEME_COLORS } from "../../../config/themeConstants";

export default function TopBar() {
  const { searchQuery, handleSearch } = useLayout();
  const { lang, toggleLanguage, t } = useLanguage();
  const isRtl = lang === "ar";

  return (
    <header
      className="h-16 px-8 flex items-center justify-between shadow-sm z-10"
      style={{
        backgroundColor: THEME_COLORS.bgCard,
        borderBottom: `1px solid ${THEME_COLORS.border}20`,
      }}
    >
      {/* جهة البحث */}
      <div className="flex items-center bg-white/5 rounded-xl px-4 py-2 flex-1 max-w-2xl mx-8">
        {" "}
        <span className="material-symbols-outlined text-white/50 ml-2">
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

      {/* جهة اللغة + الملف الشخصي */}
      <div className="flex items-center gap-6">
        {/* زر اللغة - الآن في مكانه الأفضل */}
        <button
          onClick={toggleLanguage}
          className="w-12 h-10 rounded-xl font-bold text-sm transition-all duration-300 hover:bg-white/20 flex items-center justify-center bg-white/10 shadow-lg border border-white/5 active:scale-95"
          style={{
            color: THEME_COLORS.accent,
            backgroundColor: THEME_COLORS.bgMain,
          }}
        >
          {lang === "ar" ? "EN" : "AR"}
        </button>

        {/* البروفايل */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-bold text-white">مدير النظام</p>
          </div>
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: THEME_COLORS.accent }}
          >
            <span className="material-symbols-outlined text-white">person</span>
          </div>
        </div>
      </div>
    </header>
  );
}
