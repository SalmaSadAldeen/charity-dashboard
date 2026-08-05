import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoleById } from "@/store/index";
import { useTranslation } from "@/hooks/useTranslation";
import { useDelayedLoading } from "@/hooks/useDelayedLoading";

import RoleDetailsHeader from "./components/RoleDetailsHeader";
import RolePermissionsCard from "./components/RolePermissionsCard";
import RoleEmployeesCard from "./components/RoleEmployeesCard";

export default function RoleDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t, lang } = useTranslation();

  const { selectedDetails: role, status } = useSelector((state) => state.roles);

  const hasExistingRole = role && String(role.id) === String(id);
  const [hasLoadedAtLeastOnce, setHasLoadedAtLeastOnce] =
    useState(hasExistingRole);

  const isReallyLoading = useDelayedLoading(status === "loading", 100);

  useEffect(() => {
    if (id) {
      if (!hasExistingRole) {
        setHasLoadedAtLeastOnce(false);
      }
      dispatch(fetchRoleById({ id })).then(() => {
        setHasLoadedAtLeastOnce(true);
      });
    }
  }, [dispatch, id, lang, hasExistingRole]);

  const showSkeleton =
    isReallyLoading || !role || String(role.id) !== String(id);

  if (showSkeleton) {
    return (
      <main
        className="p-8 bg-surface-container text-on-surface-variant min-h-screen"
        dir={lang === "ar" ? "rtl" : "ltr"}
      >
        <div className="max-w-4xl mx-auto space-y-6 animate-pulse">
          <div className="h-10 bg-gray-200 rounded-xl w-24"></div>
          <div className="h-48 bg-gray-200 rounded-[2rem] w-full"></div>
          <div className="h-64 bg-gray-200 rounded-[2rem] w-full"></div>
        </div>
      </main>
    );
  }

  return (
    <main
      className="p-8 bg-surface-container text-on-surface-variant min-h-screen"
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      <div className="max-w-4xl mx-auto space-y-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2 bg-surface-lowest text-on-surface rounded-xl shadow-sm border border-border/60 hover:bg-surface-container/50 transition cursor-pointer"
        >
          <span className="material-symbols-outlined text-lg leading-none">
            {lang === "ar" ? "arrow_forward" : "arrow_back"}
          </span>
          <span className="text-sm font-medium">{t("back") || "العودة"}</span>
        </button>

        <RoleDetailsHeader role={role} lang={lang} t={t} />

        <RolePermissionsCard
          permissions={role?.permissions}
          t={t}
          lang={lang}
        />

        <RoleEmployeesCard employees={role?.employees} t={t} lang={lang} />
      </div>
    </main>
  );
}
