import { Edit2, Trash2 } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
export default function EmployeeTable({
  data,
  onEdit,
  onSelect,
  selectedItem,
  onDeleteRequest,
}) {
  const { t } = useTranslation();
  return (
    <div className="bg-surface-lowest rounded-3xl border border-border shadow-sm overflow-hidden">
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
        <tbody className="divide-y divide-border">
          {data.map((item) => {
            const isSelected = selectedItem?.id === item.id;
            return (
              // داخل EmployeeTable.jsx
              // داخل EmployeeTable.jsx
              <tr
                key={item.id}
                onClick={(e) => {
                  // إذا ضغط المستخدم على زر التعديل أو الحذف، لا تفعل شيئاً
                  if (e.target.closest("button")) return;

                  // فقط قم باستدعاء الدالة التي تمرر الموظف للـ Store
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
                    {item.roles?.map((r, idx) => (
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
          })}
        </tbody>
      </table>
    </div>
  );
}
