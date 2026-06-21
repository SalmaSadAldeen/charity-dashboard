// RolesSection.jsx
import { ShieldCheck } from "lucide-react"; // استيراد
export default function RolesSection({
  roles,
  formData,
  toggleRole,
  t,
  errors,
}) {
  return (
    <div className="bg-white p-8 rounded-3xl border border-[#d0c6b0] shadow-md transition-all hover:shadow-lg">
      <h3 className="font-bold text-lg mb-6 text-[#4d4636] flex items-center gap-2">
        <ShieldCheck size={20} className="text-[#735c00]" /> {t("accessLevel")}
      </h3>

      <div className="grid grid-cols-3 gap-4">
        {Array.isArray(roles) &&
          roles.map((role) => {
            // نتحقق هل هذا الدور موجود في مصفوفة الـ ids المختارة؟
            const isSelected = formData.roleIds.includes(role.id);

            return (
              <button
                type="button"
                key={role.id}
                onClick={() => toggleRole(role.id)}
                className={`p-6 border rounded-2xl transition-all duration-300 text-left 
                ${
                  isSelected
                    ? "border-[#4d4636] bg-[#f5ede0] shadow-inner font-bold text-[#4d4636]"
                    : "border-[#e5e1da] bg-white hover:border-[#d0c6b0]"
                }`}
              >
                {role.name}
              </button>
            );
          })}
      </div>
      {errors.role_ids && (
        <p className="text-red-500 text-sm mt-4 font-semibold">
          {errors.role_ids}
        </p>
      )}
    </div>
  );
}
