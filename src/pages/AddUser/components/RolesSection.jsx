// RolesSection.jsx
export default function RolesSection({ roles, formData, toggleRole, t }) {
  return (
    <div className="bg-white p-8 rounded-3xl border border-[#d0c6b0] shadow-sm">
      <h3 className="font-bold text-lg mb-6 text-[#4d4636]">
        {t("accessLevel")}
      </h3>

      <div className="grid grid-cols-3 gap-4">
        {roles.map((role) => {
          // نتحقق هل هذا الدور موجود في مصفوفة الـ ids المختارة؟
          const isSelected = formData.role_ids.includes(role.id);

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
    </div>
  );
}
