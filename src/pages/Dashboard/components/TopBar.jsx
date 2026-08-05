import { useLayout } from "../../../hooks/useLayout";
import { useDispatch } from "react-redux";
import { toggleLanguage } from "../../../store/languageSlice";
import { useTranslation } from "@/hooks/useTranslation";
export default function TopBar() {
  const { searchQuery, handleSearch } = useLayout();
  const { t, lang } = useTranslation();
  const dispatch = useDispatch();
  const handleLangChange = () => {
    dispatch(toggleLanguage());
  };
  return (
    <header
      className="h-16 px-8 flex items-center justify-between shadow-lg z-10 backdrop-blur-md"
      style={{
        backgroundColor: "#4d4636E6",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      {/* 1. البحث */}
      <div className="flex items-center bg-surface-lowest/10 rounded-2xl px-4 py-2 flex-1 max-w-xl transition-all duration-300 border border-white/5 hover:bg-surface-lowest/20 focus-within:border-[#fad564]/50 focus-within:bg-surface-lowest/20">
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

      <div className="flex items-center gap-4">
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
              مدير النظام
            </p>
            <p className="text-[10px] text-white/50">Admin</p>
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
