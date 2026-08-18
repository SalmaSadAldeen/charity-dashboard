import { useNavigate } from "react-router-dom";
import { hasPermission } from "@/utils/permissions";
import { useSelector } from "react-redux";

export default function RolesTable({
  roles,
  status,
  onEdit,
  onDelete,
  t,
  lang,
}) {
  const navigate = useNavigate();
  const isLoading = status === "loading";
  const isEmpty = !roles || roles.length === 0;
  const { roles: userRoles } = useSelector((state) => state.auth);
  const canUpdateAny = hasPermission(userRoles, "update:roles");
  const canDeleteAny = hasPermission(userRoles, "delete:roles");
  const showActionsColumn = canUpdateAny || canDeleteAny;

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-border shadow-sm relative bg-surface-lowest backdrop-blur-md flex flex-col">
      <table className="w-full border-collapse table-fixed">
        <thead className="bg-[#f9f7f4] border-b border-border">
          <tr className="text-on-surface-variant/90 text-sm">
            <th className="py-4 px-6 font-semibold w-20 text-start">
              {t("tableId") || "# ID"}
            </th>
            <th className="py-4 px-6 font-semibold text-start">
              {t("roleLabel") || "التسمية (Role Name)"}
            </th>
            <th className="py-4 px-6 font-semibold text-start">
              {t("createdAt") || "تاريخ الإنشاء"}
            </th>
            {showActionsColumn && (
              <th className="py-4 px-6 font-semibold text-center w-36">
                {t("actions") || "الإجراءات"}
              </th>
            )}
          </tr>
        </thead>

        <tbody className="divide-y divide-border/40 bg-white">
          {isLoading ? (
            [...Array(5)].map((_, index) => (
              <tr key={`skeleton-${index}`} className="animate-pulse">
                <td className="py-4 px-6">
                  <div className="h-4 bg-slate-200 rounded-md w-8"></div>
                </td>
                <td className="py-4 px-6">
                  <div className="h-4 bg-slate-200 rounded-md w-36"></div>
                </td>
                <td className="py-4 px-6">
                  <div className="h-4 bg-slate-200 rounded-md w-28"></div>
                </td>
                {showActionsColumn && (
                  <td className="py-4 px-6 flex justify-center items-center gap-2.5">
                    <div className="w-9 h-9 bg-slate-200 rounded-xl"></div>
                    <div className="w-9 h-9 bg-slate-200 rounded-xl"></div>
                  </td>
                )}
              </tr>
            ))
          ) : isEmpty ? (
            <tr>
              <td
                colSpan={showActionsColumn ? "4" : "3"}
                className="text-center py-16 text-gray-400 font-medium text-base"
              >
                {t("noRolesFound") ||
                  (lang === "ar" ? "لا توجد أدوار مضافة" : "No roles found")}
              </td>
            </tr>
          ) : (
            roles.map((role) => {
              const isProtected = role.id <= 8;

              const displayLabel =
                typeof role.label === "object"
                  ? lang === "ar"
                    ? role.label.ar || role.label.en
                    : role.label.en || role.label.ar
                  : role.label;

              const formattedDate = role.createdAt
                ? new Date(role.createdAt).toLocaleDateString(
                    lang === "ar" ? "ar-EG" : "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    },
                  )
                : "-";

              return (
                <tr
                  key={role.id}
                  onClick={() => navigate(`/dashboard/roles/${role.id}`)}
                  className="group transition-all duration-200 hover:bg-primary/[0.04] text-sm cursor-pointer"
                >
                  <td className="py-4 px-6 font-bold text-primary text-start">
                    {role.id}
                  </td>
                  <td className="py-4 px-6 font-medium text-on-surface text-start">
                    {displayLabel}
                  </td>
                  <td className="py-4 px-6 text-xs text-on-surface-variant/70 text-start">
                    {formattedDate}
                  </td>

                  {showActionsColumn && (
                    <td
                      className="py-4 px-6 flex justify-center items-center gap-2.5"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {/* زر التعديل */}
                      {hasPermission(userRoles, "update:roles") &&
                        (isProtected ? (
                          <span
                            className="p-2 bg-surface-container text-on-surface-variant/40 rounded-xl cursor-not-allowed shadow-sm border border-border/40"
                            title={
                              t("protectedRoleEditTooltip") ||
                              "دور محمي من النظام لا يمكن تعديله"
                            }
                          >
                            <span className="material-symbols-outlined text-lg leading-none">
                              lock
                            </span>
                          </span>
                        ) : (
                          <button
                            onClick={() => onEdit(role)}
                            className="p-2 bg-primary/10 text-primary rounded-xl hover:bg-primary hover:text-white hover:scale-105 transition-all shadow-sm cursor-pointer"
                            title={t("edit") || "تعديل"}
                          >
                            <span className="material-symbols-outlined text-lg leading-none">
                              edit
                            </span>
                          </button>
                        ))}

                      {/* زر الحذف */}
                      {hasPermission(userRoles, "delete:roles") &&
                        (isProtected ? (
                          <span
                            className="p-2 bg-surface-container text-on-surface-variant/40 rounded-xl cursor-not-allowed shadow-sm border border-border/40"
                            title={
                              t("protectedRoleDeleteTooltip") ||
                              "دور محمي من النظام لا يمكن حذفه"
                            }
                          >
                            <span className="material-symbols-outlined text-lg leading-none">
                              lock
                            </span>
                          </span>
                        ) : (
                          <button
                            onClick={() => onDelete(role.id)}
                            className="p-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white hover:scale-105 transition-all shadow-sm cursor-pointer"
                            title={t("delete") || "حذف"}
                          >
                            <span className="material-symbols-outlined text-lg leading-none">
                              delete
                            </span>
                          </button>
                        ))}
                    </td>
                  )}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
