import { useState } from "react";
import { Edit2, Trash2 } from "lucide-react";
import { useEmployeeActions } from "@/hooks/useUserActions";
import ConfirmModal from "./ConfirmModal"; // هذا المودال سننشئه

export default function EmployeeTable({ data, onEdit }) {
  // الهوك الآن يجلب الترجمة والـ Dispatch بنفسه (لا يحتاج تمرير t)
  const { handleDelete } = useEmployeeActions();
  const [deleteId, setDeleteId] = useState(null);

  return (
    <div className="bg-white rounded-3xl border border-[#f5ede0] shadow-sm overflow-hidden">
      <table className="w-full text-right border-collapse">
        <thead className="bg-[#735c00]">
          <tr className="text-white text-sm uppercase tracking-wider">
            <th className="p-6 font-semibold">الموظف</th>
            <th className="p-6 font-semibold">الدور</th>
            <th className="p-6 font-semibold">الحالة</th>
            <th className="p-6 font-semibold text-center">الإجراءات</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#f5ede0]">
          {Array.isArray(data) &&
            data.map((emp) => (
              <tr
                key={emp.id}
                className="hover:bg-[#fcfbf9] transition-all duration-200"
              >
                <td className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#f5ede0] flex items-center justify-center text-[#735c00] font-bold">
                      {emp.name?.charAt(0)}
                    </div>
                    <div>
                      <span className="block font-bold text-[#4d4636]">
                        {emp.name}
                      </span>
                      <span className="text-xs text-[#735c00]/60">
                        {emp.email}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="p-6 text-[#4d4636] font-medium">{emp.role}</td>
                <td className="p-6">
                  <StatusBadge status={emp.status} />
                </td>
                <td className="p-6 text-center">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => onEdit(emp)}
                      className="p-2.5 text-[#735c00] hover:bg-[#fad564]/20 rounded-xl"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => setDeleteId(emp.id)}
                      className="p-2.5 text-red-400 hover:bg-red-50 rounded-xl"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* مودال التأكيد بدلاً من window.confirm */}
      <ConfirmModal
        isOpen={!!deleteId}
        onConfirm={() => {
          handleDelete(deleteId);

          setDeleteId(null);
        }}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}

// مكون فرعي بسيط للحالة لجعل الكود أنظف
const StatusBadge = ({ status }) => (
  <span
    className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold border ${status === "active" ? "bg-[#fad564]/10 text-[#735c00] border-[#fad564]/20" : "bg-gray-100 text-gray-500 border-gray-200"}`}
  >
    <span
      className={`w-2 h-2 rounded-full ${status === "active" ? "bg-[#735c00]" : "bg-gray-400"}`}
    ></span>
    {status === "active" ? "نشط" : "غير نشط"}
  </span>
);
