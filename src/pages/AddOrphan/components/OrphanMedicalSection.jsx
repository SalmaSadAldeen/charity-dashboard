import { Stethoscope, Calendar, GraduationCap } from "lucide-react";

export default function OrphanMedicalSection({
  formData,
  handleInputChange,
  errors,
  t,
}) {
  return (
    <div className="bg-white p-8 rounded-3xl border border-[#d0c6b0] shadow-md transition-all hover:shadow-lg">
      <h3 className="font-bold text-lg mb-6 text-[#4d4636] flex items-center gap-2">
        <Stethoscope size={20} /> {t("healthAndEdu")}
      </h3>

      <div className="space-y-6">
        {/* حقل الأمراض */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            {t("Diseases")}
          </label>
          <textarea
            name="Diseases"
            value={formData.Diseases || ""}
            onChange={handleInputChange}
            className="w-full p-4 border border-[#d0c6b0] rounded-2xl shadow-inner focus:border-[#735c00] outline-none transition-all"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* حقل تاريخ الميلاد مع حل مشكلة الأيقونة */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              {t("dateOfBirth")}
            </label>
            <div className="relative">
              <input
                type="date"
                name="date_of_birth"
                value={formData.date_of_birth || ""}
                onChange={handleInputChange}
                // أضفنا الكلاس الخاص بالـ CSS
                className="w-full p-4 border border-[#d0c6b0] rounded-2xl shadow-inner focus:border-[#735c00] outline-none transition-all pl-10 custom-date-input"
              />
              <Calendar
                className="absolute left-4 top-4 text-[#4d4636] opacity-60 pointer-events-none"
                size={20}
              />
            </div>
            {errors.date_of_birth && (
              <p className="text-red-500 text-xs mt-1">
                {errors.date_of_birth}
              </p>
            )}
          </div>

          {/* حقل الصف الدراسي */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              {t("currentClass")}
            </label>
            <div className="relative">
              <input
                name="class"
                value={formData.class || ""}
                onChange={handleInputChange}
                className="w-full p-4 border border-[#d0c6b0] rounded-2xl shadow-inner focus:border-[#735c00] outline-none transition-all"
              />
              {errors.class && (
                <p className="text-red-500 text-xs mt-1">{errors.class}</p>
              )}{" "}
              {/* هذا السطر كان ناقصاً */}
              <GraduationCap
                className="absolute left-4 top-4 text-[#4d4636] opacity-60"
                size={20}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
