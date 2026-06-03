import Sidebar from "./components/Sidebar";
import Topbar from "./components/TopBar";
import { useLanguage } from "../../context/LanguageContext";
import { THEME_COLORS } from "../../config/themeConstants";

export default function DashboardLayout({ children }) {
  const { lang } = useLanguage();
  const isRtl = lang === "ar";

  return (
    <div
      className="flex h-screen w-full font-sans overflow-hidden"
      dir={isRtl ? "rtl" : "ltr"}
      style={{ backgroundColor: THEME_COLORS.bgMain }}
    >
      {/* 1. السايد بار */}
      <Sidebar />

      {/* 2. المنطقة الرئيسية (Topbar + Content) */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-8">{children}</main>
      </div>
    </div>
  );
}
