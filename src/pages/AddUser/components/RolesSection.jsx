// RolesSection.jsx
import { ShieldCheck } from "lucide-react"; // استيراد
export default function RolesSection({
  roles,
  formData,
  toggleRole,
  t,
  errors,
}) {
  console.log("Roles from Redux in Edit:", roles);
  return (
    <div className="bg-white p-8 rounded-3xl border border-border shadow-md transition-all hover:shadow-lg">
      <h3 className="font-bold text-lg mb-6 text-on-surface-variant flex items-center gap-2">
        <ShieldCheck size={20} className="text-primary" /> {t("accessLevel")}
      </h3>

      <div className="grid grid-cols-2 gap-4">
        {" "}
        {Array.isArray(roles) &&
          roles.map((role) => {
            // نتحقق هل هذا الدور موجود في مصفوفة الـ ids المختارة؟
            const roleIdNumber = Number(role.id);
            const isSelected =
              formData?.roleIds?.includes(roleIdNumber) || false;
            return (
              <button
                type="button"
                key={role.id}
                onClick={() => toggleRole(roleIdNumber)}
                className={`p-4 border rounded-2xl transition-all duration-300 text-center flex items-center justify-center min-h-[60px] break-words               ${
                  isSelected
                    ? "border-[#735c00] bg-amber-50 shadow-inner font-bold text-[#4d4636] scale-[1.02]"
                    : "border-[#e5e1da] bg-white hover:border-[#735c00]/50"
                }`}
              >
                {role.name}
              </button>
            );
          })}
      </div>
      {errors.roleIds && (
        <p className="text-red-500 text-sm mt-4 font-semibold">
          {errors.roleIds}
        </p>
      )}
    </div>
  );
}
