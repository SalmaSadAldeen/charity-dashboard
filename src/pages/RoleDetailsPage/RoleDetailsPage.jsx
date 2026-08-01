import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoleById } from "@/store/index";
import { useTranslation } from "@/hooks/useTranslation";

import RoleDetailsHeader from "./components/RoleDetailsHeader";
import RolePermissionsCard from "./components/RolePermissionsCard";
import RoleEmployeesCard from "./components/RoleEmployeesCard";

export default function RoleDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t, lang } = useTranslation();

  const { selectedDetails: role, detailsStatus } = useSelector(
    (state) => state.roles,
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchRoleById({ id }));
    }
  }, [dispatch, id, lang]); // <--- ضفنا lang جوا المصفوفة هون بشكل صحيح

  if (detailsStatus === "loading") {
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-on-surface-variant">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary animate-bounce"></span>
          <span className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:0.2s]"></span>
          <span className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:0.4s]"></span>
          <span className="ms-2">{t("loading") || "جاري التحميل..."}</span>
        </div>
      </div>
    );
  }

  if (!role) return null;

  return (
    <main
      className="p-8 bg-surface-container text-on-surface-variant min-h-screen"
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* زر العودة */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2 bg-surface-lowest text-on-surface rounded-xl shadow-sm border border-border/60 hover:bg-surface-container/50 transition"
        >
          <span className="material-symbols-outlined text-lg leading-none">
            {lang === "ar" ? "arrow_forward" : "arrow_back"}
          </span>
          <span className="text-sm font-medium">{t("back") || "العودة"}</span>
        </button>

        {/* بطاقة رأس الصفحة والمعلومات الأساسية */}
        <RoleDetailsHeader role={role} lang={lang} t={t} />

        {/* قسم الصلاحيات */}
        <RolePermissionsCard permissions={role.permissions} t={t} lang={lang} />

        {/* قسم الموظفين المرتبطين */}
        <RoleEmployeesCard employees={role.employees} t={t} lang={lang} />
      </div>
    </main>
  );
}
