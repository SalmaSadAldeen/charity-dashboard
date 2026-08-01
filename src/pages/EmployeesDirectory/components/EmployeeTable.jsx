import { Edit2, Trash2 } from "lucide-react";

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
  return (
    <div className="bg-surface-lowest rounded-3xl border border-border shadow-sm overflow-hidden relative min-h-[300px]">
      <table className="w-full border-collapse table-fixed">
        <thead className="bg-[#f9f7f4] border-b border-border">
          <tr className="text-on-surface-variant">
            <th className="p-6 text-right font-bold uppercase text-[11px] tracking-widest w-1/6">
              {t("employee")}
            </th>
            <th className="p-6 text-right font-bold uppercase text-[11px] tracking-widest w-1/2">
              {t("jobRole")}
            </th>
            <th className="p-6 text-center font-bold uppercase text-[11px] tracking-widest w-1/6">
              {t("actions")}
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border relative">
          {/* شاشة التحميل (Overlay) تظهر حصراً داخل منطقة الجدول وفوق البيانات */}
          {status === "loading" && (
            <tr>
              <td colSpan="3" className="relative p-0 h-[250px]">
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-[1px] z-10">
                  <div className="flex justify-center items-center gap-2 text-on-surface-variant/70 text-base">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary animate-bounce"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-primary animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-primary animate-bounce [animation-delay:0.4s]"></span>
                    <span className="ms-2 font-medium">
                      {t("loading") ||
                        (lang === "ar" ? "جاري التحميل..." : "Loading...")}
                    </span>
                  </div>
                </div>
              </td>
            </tr>
          )}

          {/* عرض رسالة عدم وجود بيانات فقط عند انتهاء التحميل وعدم توفر عناصر */}
          {status !== "loading" && (!data || data.length === 0) ? (
            <tr>
              <td
                colSpan="3"
                className="text-center py-12 text-gray-400 font-medium"
              >
                {lang === "ar" ? "لا توجد بيانات متاحة" : "No data available"}
              </td>
            </tr>
          ) : (
            status !== "loading" &&
            (data || []).map((item) => {
              const isSelected = selectedItem?.id === item.id;
              return (
                <tr
                  key={item.id}
                  onClick={(e) => {
                    if (e.target.closest("button")) return;
                    onSelect(item);
                  }}
                  className={`transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "bg-blue-50/50 hover:bg-blue-50/70"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <td className="p-6 truncate">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg bg-primary-container text-primary border border-primary/20">
                        {item.firstName?.charAt(0)}
                      </div>
                      <div className="flex flex-col truncate">
                        <span className="font-bold text-sm text-on-surface-variant">{`${item.firstName} ${item.lastName}`}</span>
                        <span className="text-[10px] font-medium uppercase tracking-wider text-secondary">
                          {t("view_profile")}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="p-6 text-right">
                    <div className="flex flex-wrap gap-2 justify-end">
                      {item.roles?.map((r) => (
                        <span
                          key={r.role.id}
                          className="px-4 py-1.5 rounded-lg text-[11px] font-bold border border-border bg-surface text-on-surface-variant shadow-sm"
                        >
                          {r.role.label}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onEdit(e, item);
                        }}
                        className="p-2.5 bg-surface-lowest border border-border text-primary rounded-xl hover:bg-primary-container transition-all"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteRequest(item.id);
                        }}
                        className="p-2.5 bg-surface-lowest border border-border text-error rounded-xl hover:bg-error/10 transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
