import { Users } from "lucide-react"; // استيراد الأيقونات
export default function OrphanIdentitySection({
  formData,
  handleInputChange,
  errors,
  t,
}) {
  // قمنا بتعريف المصفوفة بحيث تطابق مفاتيح الترجمة
  const fields = [
    { name: "firstName", label: "firstName" },
    { name: "lastName", label: "lastName" },
    { name: "father_name", label: "fatherName" },
    { name: "mother_name", label: "motherName" },
  ];

  return (
    <div className="bg-white p-8 rounded-3xl border border-border shadow-md transition-all hover:shadow-lg">
      {/* العنوان مع الأيقونة التي كانت مفقودة */}
      <h3 className="text-2xl font-bold text-on-surface-variant mb-6 flex items-center gap-3">
        <Users className="text-on-surface-variant" size={28} />
        {t("primaryOrphanIdentity")}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* الحقول الأساسية الأربعة */}
        {fields.map((field) => (
          <div key={field.name}>
            <label className="block text-sm font-semibold mb-2">
              {t(field.label)}
            </label>
            <input
              name={field.name}
              value={formData[field.name] || ""}
              onChange={handleInputChange}
              className="w-full p-4 border border-border rounded-2xl shadow-inner focus:border-primary outline-none transition-all"
            />
            {errors[field.name] && (
              <p className="text-red-500 text-xs mt-1">{errors[field.name]}</p>
            )}
          </div>
        ))}

        {/* الوصي */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            {t("guardianName")}
          </label>
          <input
            name="Guardian_name"
            value={formData.Guardian_name || ""}
            onChange={handleInputChange}
            className="w-full p-4 rounded-2xl border focus:border-secondary"
          />
          {errors.Guardian_name && (
            <p className="text-red-500 text-xs mt-1">{errors.Guardian_name}</p>
          )}
        </div>

        {/* عدد الإخوة */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            {t("brotherNumber")}
          </label>
          <input
            type="number"
            name="How_brother_and_sister_number"
            value={formData.How_brother_and_sister_number || 0}
            onChange={handleInputChange}
            className="w-full p-4 border border-border rounded-2xl shadow-inner focus:border-primary outline-none transition-all"
          />
        </div>
      </div>
    </div>
  );
}
