import { useTranslation } from "@/hooks/useTranslation";
import { NavLink, useLocation } from "react-router-dom";

export default function Sidebar() {
  const { t, lang } = useTranslation();
  const isRtl = lang === "ar";
  const { pathname } = useLocation();

  // منطق: إذا كنا في صفحة التعديل، لا نعتبر زر الأيتام "نشطاً"
  const isEditing = pathname.includes("/edit");

  // تعريف المجموعات خارج الـ map لتحسين الأداء
  const pathGroups = {
    orphans: [
      "/dashboard/orphans",
      "/dashboard/orphan/details",
      "/dashboard/add-orphan",
      "/dashboard/orphans/edit",
    ],
    beneficiaries: ["/dashboard/beneficiaries"],
    requests: ["/dashboard/requests"],
    roles: ["/dashboard/roles"],
  };

  const menuItems = {
    operational: [
      {
        id: "dashboard",
        name: t("dashboard"),
        icon: "dashboard",
        path: "/dashboard",
      },
      {
        id: "requests",
        name: t("requests"),
        icon: "volunteer_activism",
        path: "/dashboard/requests",
      },
      {
        id: "beneficiaries",
        name: t("beneficiaries"),
        icon: "groups",
        path: "/dashboard/beneficiaries",
      },
      {
        id: "orphans",
        name: t("orphans"),
        icon: "child_care",
        path: "/dashboard/orphans",
      },
    ],
    administrative: [
      {
        id: "donors",
        name: t("donors"),
        icon: "favorite",
        path: "/dashboard/donors",
      },
      {
        id: "employees",
        name: t("employees"),
        icon: "badge",
        path: "/dashboard/employees",
      },
      {
        id: "roles",
        name: t("rolesAndPermissions") || "الأدوار والصلاحيات",
        icon: "admin_panel_settings",
        path: "/dashboard/roles",
      },
    ],
    account: [
      {
        id: "profile",
        name: t("Profile"),
        icon: "account_circle",
        path: "/dashboard/profile",
      },
    ],
  };

  return (
    <aside
      className="w-64 min-w-[264px] h-full flex flex-col shadow-2xl select-none font-sans transition-all duration-300"
      style={{ backgroundColor: "#4d4636" }}
    >
      <div className="h-24 flex-shrink-0 flex flex-col items-center justify-center border-b border-white/10">
        <span className="text-xl font-bold text-white">
          Charity<span style={{ color: "#fad564" }}>OS</span>
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        {Object.entries(menuItems).map(([key, items]) => (
          <div key={key} className="mb-6">
            <p className="text-[10px] font-bold uppercase tracking-wider text-white/30 mb-2 px-3">
              {key === "operational"
                ? t("coreOps")
                : key === "administrative"
                  ? t("sysControl")
                  : t("account")}
            </p>

            {items.map((item) => {
              const isOrphansLink = item.id === "orphans";

              // المنطق: هل الرابط الحالي جزء من مجموعة هذا العنصر؟
              let isActive = false;
              if (item.id === "dashboard") {
                isActive = pathname === "/dashboard";
              } else {
                const group = pathGroups[item.id] || [item.path];
                isActive = group.some((p) => pathname.startsWith(p));
              }

              const active = isOrphansLink && isEditing ? false : isActive;

              return (
                <NavLink
                  key={item.id}
                  to={item.path}
                  end={item.id === "dashboard"}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 mb-1 
                  ${active ? "bg-surface-lowest/10 shadow-lg text-white" : "hover:bg-surface-lowest/5 text-[#e9ebef]"}`}
                  style={{
                    borderRight: active && isRtl ? `4px solid #fad564` : "none",
                    borderLeft: active && !isRtl ? `4px solid #fad564` : "none",
                  }}
                >
                  <span className="material-symbols-outlined text-xl">
                    {item.icon}
                  </span>
                  <span className="flex-1 text-start whitespace-nowrap">
                    {item.name}
                  </span>
                </NavLink>
              );
            })}
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-white/10">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-rose-300 hover:bg-rose-500/10 transition-colors">
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
