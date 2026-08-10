import { Edit2, Trash2 } from "lucide-react";
import { hasPermission } from "@/utils/permissions";
import { useSelector } from "react-redux";

export default function EmployeeTable({
  data,
  status,
  onEdit,
  onSelect,
  selectedItem,
  onDeleteRequest,
  lang,
  t,
}) {
  const isLoading = status === "loading";
  const isEmpty = !data || data.length === 0;
  const { roles } = useSelector((state) => state.auth); // عدلي هذا السطر ليجلب الـ roles
  const getAvatarColor = (id) => {
    const palette = [
      "bg-[#f5ede0] text-[#735c00] border-[#d0c6b0]",
      "bg-[#5c630e]/10 text-[#5c630e] border-[#5c630e]/20",
      "bg-[#3b674c]/10 text-[#3b674c] border-[#3b674c]/20",
    ];
    return palette[(id || 0) % palette.length];
  };

  const canUpdateAny = hasPermission(roles, "update:employees");
  const canDeleteAny = hasPermission(roles, "delete:employees");
  const showActionsColumn = canUpdateAny || canDeleteAny;

  return (
    <div className="bg-[#ffffff] rounded-[2rem] border border-[#d0c6b0] shadow-sm overflow-hidden transition-all duration-300">
      <table className="w-full border-collapse">
        <thead className="bg-[#f9f7f4] border-b border-[#d0c6b0]">
          <tr className="text-[#4d4636] font-bold text-xs">
            <th className="py-4 px-6 text-right uppercase tracking-wider w-[30%]">
              {t("employee")}
            </th>
            <th className="py-4 px-6 text-right uppercase tracking-wider w-[50%]">
              {t("jobRole")}
            </th>
            {showActionsColumn && (
              <th className="py-4 px-6 text-center uppercase tracking-wider w-[20%]">
                {t("actions") || "الإجراءات"}
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#e6e0d5]">
          {isLoading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <tr key={index} className="animate-pulse">
                <td className="py-4 px-6 align-middle">
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-2xl bg-gray-200 shrink-0"></div>
                    <div className="flex flex-col gap-2 w-36">
                      <div className="h-4 bg-gray-200 rounded w-full"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6 align-middle">
                  <div className="flex gap-2">
                    <div className="h-6 bg-gray-200 rounded-lg w-20"></div>
                    <div className="h-6 bg-gray-200 rounded-lg w-16"></div>
                  </div>
                </td>
                {showActionsColumn && (
                  <td className="py-4 px-6 align-middle">
                    <div className="flex justify-center items-center gap-2">
                      <div className="w-9 h-9 bg-gray-200 rounded-xl"></div>
                      <div className="w-9 h-9 bg-gray-200 rounded-xl"></div>
                    </div>
                  </td>
                )}
              </tr>
            ))
          ) : isEmpty ? (
            <tr>
              <td
                colSpan="3"
                className="text-center py-16 text-[#4d4636]/60 font-medium text-sm"
              >
                {lang === "ar" ? "لا توجد بيانات متاحة" : "No data available"}
              </td>
            </tr>
          ) : (
            data.map((item) => {
              const isSelected = selectedItem?.id === item.id;
              return (
                <tr
                  key={item.id}
                  onClick={(e) => {
                    if (e.target.closest("button")) return;
                    onSelect(item);
                  }}
                  className={`transition-colors duration-150 cursor-pointer ${
                    isSelected
                      ? "bg-[#f5ede0]/30 border-r-4 border-r-[#735c00]"
                      : "hover:bg-[#f9f7f4]/60"
                  }`}
                >
                  {/* عمود الموظف */}
                  <td className="py-4 px-6 align-middle">
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-base border shrink-0 shadow-2xs ${getAvatarColor(
                          item.id,
                        )}`}
                      >
                        {item.firstName?.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-sm text-[#4d4636] tracking-tight">
                          {`${item.firstName} ${item.lastName}`}
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#735c00] mt-1">
                          {t("view_profile")}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* عمود الأدوار الوظيفية */}
                  <td className="py-4 px-6 align-middle">
                    <div className="flex flex-wrap items-center gap-2 justify-start">
                      {item.roles?.map((r) => {
                        const roleLabel = r.role?.label;
                        const displayRoleName =
                          typeof roleLabel === "object" && roleLabel !== null
                            ? lang === "ar"
                              ? roleLabel.ar || roleLabel.en
                              : roleLabel.en || roleLabel.ar
                            : roleLabel || "-";

                        return (
                          <span
                            key={r.role?.id || Math.random()}
                            className="px-3 py-1 rounded-lg text-xs font-medium border border-[#d0c6b0]/70 bg-[#f5ede0]/40 text-[#4d4636] shadow-2xs"
                          >
                            {displayRoleName}
                          </span>
                        );
                      })}
                    </div>
                  </td>
                  {showActionsColumn && (
                    <td className="py-4 px-6 align-middle">
                      <div className="flex justify-center items-center gap-2">
                        {hasPermission(roles, "update:employees") && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onEdit(e, item);
                            }}
                            className="p-2.5 bg-[#f9f7f4] border border-[#d0c6b0] text-[#735c00] rounded-xl hover:bg-[#735c00] hover:text-[#ffffff] transition-colors shadow-2xs"
                            title={t("edit") || "تعديل"}
                          >
                            <Edit2 size={15} />
                          </button>
                        )}

                        {hasPermission(roles, "delete:employees") && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onDeleteRequest(item.id);
                            }}
                            className="p-2.5 bg-[#d93025]/10 border border-[#d93025]/30 text-[#d93025] rounded-xl hover:bg-[#d93025] hover:text-[#ffffff] transition-colors shadow-2xs"
                            title={t("delete") || "حذف"}
                          >
                            <Trash2 size={15} />
                          </button>
                        )}
                      </div>
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
