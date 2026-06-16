import { Mail, Shield, Trash2, Edit2 } from "lucide-react";

export default function EmployeeCard({ employee }) {
  return (
    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-[0_2px_15px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-300">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-[#f5ede0] flex items-center justify-center text-[#735c00] font-bold text-2xl border border-[#fad564]/20">
            {employee.name.charAt(0)}
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#4d4636]">
              {employee.name}
            </h3>
            <span className="text-xs font-semibold text-[#735c00] uppercase tracking-wide">
              {employee.role}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-xl">
          <Mail size={16} className="text-[#735c00]" />
          {employee.email}
        </div>
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-gray-100">
        <span className="flex items-center gap-1.5 text-xs font-bold text-green-700 bg-green-50 px-3 py-1.5 rounded-full">
          <Shield size={12} />
          نشط
        </span>
        <div className="flex gap-1">
          <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors">
            <Edit2 size={16} />
          </button>
          <button className="p-2 hover:bg-red-50 rounded-lg text-red-400 transition-colors">
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
