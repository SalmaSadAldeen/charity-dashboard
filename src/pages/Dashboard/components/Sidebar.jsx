import { useTranslation } from "@/hooks/useTranslation";
import { NavLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useRef } from "react";
import { logoutUser } from "@/store/authSlice";
import { hasPermission } from "@/utils/permissions";
export default function Sidebar() {
  const { t, lang } = useTranslation();
  const isRtl = lang === "ar";
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const { userType, roles } = useSelector((state) => state.auth);
  console.log("Full Auth State:", userType);

  // اطبعي هدول بالكونسول وشوفي شو عم يطلع معك
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const isLockedRef = useRef(false);

  const handleConfirmLogout = () => {
    if (isLockedRef.current) return;
    isLockedRef.current = true;

    localStorage.setItem("isLoggingOut", "true");
    setIsLoggingOut(true);

    setTimeout(async () => {
      try {
        await dispatch(logoutUser()).unwrap();
      } catch (error) {
        console.error(error);
      } finally {
        localStorage.clear();
        window.location.replace("/login");
      }
    }, 2000);
  };

  const isEditing = pathname.includes("/edit");
  const pathGroups = {
    orphans: [
      "/dashboard/orphans",
      "/dashboard/orphan/details",
      "/dashboard/add-orphan",
      "/dashboard/orphan/edit",
    ],
    beneficiaries: ["/dashboard/beneficiaries"],
    requests: [
      "/dashboard/requests", // صفحة عرض الطلبات الأساسية
      "/dashboard/help-requests", // مسار صفحة تفاصيل الطلب (لأنها تبدأ بهذا)
    ],
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
        permission: "read:aid_requests",
      },
      {
        id: "beneficiaries",
        name: t("beneficiaries"),
        icon: "groups",
        path: "/dashboard/beneficiaries",
        permission: "read:beneficiaries",
      },
      {
        id: "orphans",
        name: t("orphans"),
        icon: "child_care",
        path: "/dashboard/orphans",
        permission: "read:orphans",
      },
      {
        id: "sponsorships",
        name: t("sponsorships"),
        icon: "child_care",
        path: "/dashboard/sponsorships",
        permission: "read:sponsorships",
      },
    ],
    administrative: [
      {
        id: "donors",
        name: t("donors"),
        icon: "favorite",
        path: "/dashboard/donors",
        permission: "read:donors",
      },
      {
        id: "employees",
        name: t("employees"),
        icon: "badge",
        path: "/dashboard/employees",
        permission: "read:employees",
      },
      {
        id: "roles",
        name: t("rolesAndPermissions") || "الأدوار والصلاحيات",
        icon: "admin_panel_settings",
        path: "/dashboard/roles",
        permission: "read:roles",
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
  console.log(hasPermission(roles, "read:orphans"));
  return (
    <>
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
          {Object.entries(menuItems).map(([key, items]) => {
            // تصفية عناصر القائمة حسب الصلاحيات وحسب استثناء البروفايل للأدمن
            const filteredItems = items.filter((item) => {
              // 1. الشرط القديم: إخفاء البروفايل حصراً إذا كان المستخدم ADMIN
              if (userType === "ADMIN" && item.id === "profile") {
                return false;
              }

              // 2. الشرط الجديد: التحقق من وجود الصلاحية (read) إذا كانت متوفرة في العنصر
              if (item.permission) {
                return hasPermission(roles, item.permission);
              }

              return true;
            });

            // إذا أصبحت القائمة فارغة بعد التصفية (مثل قسم الحساب للأدمن)، لا تعرض القسم أبداً
            if (filteredItems.length === 0) {
              return null;
            }

            return (
              <div key={key} className="mb-6">
                <p className="text-[10px] font-bold uppercase tracking-wider text-white/30 mb-2 px-3">
                  {key === "operational"
                    ? t("coreOps")
                    : key === "administrative"
                      ? t("sysControl")
                      : t("account")}
                </p>

                {filteredItems.map((item) => {
                  const isOrphansLink = item.id === "orphans";

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
                        borderRight:
                          active && isRtl ? `4px solid #fad564` : "none",
                        borderLeft:
                          active && !isRtl ? `4px solid #fad564` : "none",
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
            );
          })}
        </div>

        {/* زر تسجيل الخروج */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={() => setShowLogoutModal(true)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-rose-300 hover:bg-rose-500/10 transition-colors cursor-pointer"
          >
            <span
              className={`material-symbols-outlined text-xl ${isRtl ? "rotate-180" : ""}`}
            >
              logout
            </span>
            <span className="flex-1 text-start">{t("logout")}</span>
          </button>
        </div>
      </aside>

      {/* نافذة التأكيد */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl flex flex-col gap-4 text-center">
            <h3 className="text-lg font-bold text-slate-900">
              {t("logout_title")}{" "}
            </h3>
            <p className="text-sm text-slate-600">
              {t("logout_confirmation_message")}
            </p>
            <div className="flex gap-3 mt-2">
              <button
                onClick={() => setShowLogoutModal(false)}
                disabled={isLoggingOut}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-bold transition-colors cursor-pointer disabled:opacity-50"
              >
                {t("cancel")}{" "}
              </button>
              <button
                onClick={handleConfirmLogout}
                disabled={isLoggingOut}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-sm font-bold transition-colors cursor-pointer disabled:opacity-75 flex items-center justify-center gap-2"
              >
                {isLoggingOut ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>{t("processing")}</span>
                  </>
                ) : (
                  <span>{t("confirm")}</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
