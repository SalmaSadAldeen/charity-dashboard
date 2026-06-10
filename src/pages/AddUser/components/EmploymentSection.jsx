// EmploymentSection.jsx
import { useRef } from "react";
import { Briefcase } from "lucide-react";
import { FileUp } from "lucide-react"; // استيراد
export default function EmploymentSection({
  formData,
  setFormData,
  t,
  errors,
}) {
  // نستخدم useRef للإشارة إلى حقل الملف المخفي
  const fileInputRef = useRef(null);

  // دالة خاصة للتعامل مع تغير الملف فقط
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, personal_photo: file }));
    }
  };

  return (
    <div className="bg-white p-8 rounded-3xl border border-[#d0c6b0] shadow-md transition-all hover:shadow-lg">
      <h3 className="font-bold text-lg mb-6 text-[#4d4636] flex items-center gap-2">
        <Briefcase size={20} className="text-[#735c00]" />{" "}
        {t("employmentDetails")}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
        {/* تاريخ الميلاد */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            {t("dateOfBirth")}
          </label>
          <input
            type="date"
            name="date_of_birth"
            value={formData.date_of_birth}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                date_of_birth: e.target.value,
              }))
            }
            className="w-full p-4 border border-[#d0c6b0] rounded-2xl shadow-inner focus:border-[#735c00] outline-none transition-all"
          />
          {errors.date_of_birth && (
            <p className="text-red-500 text-xs mt-1">{errors.date_of_birth}</p>
          )}
        </div>

        {/* حقل رفع الصورة */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            {t("personalPhoto")}
          </label>
          {/* الجزء القابل للضغط */}
          <div
            onClick={() => fileInputRef.current.click()}
            className="w-full h-[60px] border-2 border-dashed border-[#d0c6b0] rounded-2xl flex items-center justify-center gap-3 cursor-pointer bg-white transition-all shadow-inner"
          >
            {/* إضافة الأيقونة هنا */}
            <FileUp className="text-[#735c00] opacity-60" size={20} />

            <span className="text-sm font-medium text-[#4d4636]">
              {formData.personal_photo
                ? formData.personal_photo.name
                : t("uploadProfilePicture")}
            </span>
          </div>
          {errors.personal_photo && (
            <p className="text-red-500 text-xs mt-1">{errors.personal_photo}</p>
          )}

          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      </div>
    </div>
  );
}
