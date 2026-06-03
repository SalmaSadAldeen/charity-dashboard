import { useLayout } from "../../../hooks/useLayout";
import { THEME_COLORS } from "../../../config/themeConstants";
import { useLanguage } from "../../../context/LanguageContext";

export default function Sidebar() {
  const { currentTab, changeTab } = useLayout();
  const { lang, t } = useLanguage();
  const isRtl = lang === "ar";

  const menuItems = {
    operational: [
      { id: "dashboard", name: t("dashboard"), icon: "dashboard" },
      { id: "requests", name: t("requests"), icon: "volunteer_activism" },
      { id: "beneficiaries", name: t("beneficiaries"), icon: "groups" },
      { id: "orphans", name: t("orphans"), icon: "child_care" },
    ],
    administrative: [
      { id: "donors", name: t("donors"), icon: "favorite" },
      { id: "employees", name: t("employees"), icon: "badge" },
      { id: "campaigns", name: t("campaigns"), icon: "campaign" },
      { id: "audit", name: t("audit"), icon: "admin_panel_settings" },
    ],
    account: [{ id: "profile", name: t("profile"), icon: "account_circle" }],
  };

  return (
    <aside
      className="w-64 min-w-[264px] h-full flex flex-col shadow-2xl select-none font-sans transition-all duration-300"
      style={{ backgroundColor: THEME_COLORS.bgCard }}
    >
      <div className="h-24 flex-shrink-0 flex flex-col items-center justify-center border-b border-white/10">
        <span className="text-xl font-bold text-white">
          Charity<span style={{ color: THEME_COLORS.accent }}>OS</span>
        </span>
        <span
          className="text-[10px] mt-0.5 opacity-60"
          style={{ color: "#e9ebef" }}
        >
          {t("logoSubtitle")}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        {Object.entries(menuItems).map(([key, items]) => (
          <div key={key} className="mb-6">
            {/* العنوان الخاص بكل مجموعة */}
            <p className="text-[10px] font-bold uppercase tracking-wider text-white/30 mb-2 px-3">
              {key === "operational"
                ? t("coreOps")
                : key === "administrative"
                  ? t("sysControl")
                  : t("account")}
            </p>{" "}
            {items.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => changeTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 mb-1 
                    ${isActive ? "bg-white/10 shadow-lg" : "hover:bg-white/5"}`}
                  style={{
                    // الشريط الجانبي الذكي: يظهر يساراً أو يميناً حسب اللغة
                    borderRight:
                      isActive && isRtl
                        ? `4px solid ${THEME_COLORS.accent}`
                        : "none",
                    borderLeft:
                      isActive && !isRtl
                        ? `4px solid ${THEME_COLORS.accent}`
                        : "none",
                    color: isActive ? "#ffffff" : "#e9ebef",
                  }}
                >
                  <span className="material-symbols-outlined text-xl">
                    {item.icon}
                  </span>
                  <span className="flex-1 text-start whitespace-nowrap">
                    {item.name}
                  </span>
                </button>
              );
            })}
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-white/10">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-rose-300 hover:bg-rose-500/10 transition-colors">
          {/* إضافة rotate-180 لقلب أيقونة الخروج في وضع الـ RTL */}
          <span
            className={`material-symbols-outlined text-xl ${isRtl ? "rotate-180" : ""}`}
          >
            logout
          </span>
          <span className="flex-1 text-start">{t("logout")}</span>
        </button>
      </div>
    </aside>
  );
}
