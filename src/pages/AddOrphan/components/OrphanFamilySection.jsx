import { useRef } from "react";
import { Users, FileUp } from "lucide-react";

export default function OrphanFamilySection({
  formData,
  handleInputChange,
  errors,
  t,
}) {
  const fileInputRef = useRef(null);

  return (
    <div className="bg-white p-8 rounded-3xl border border-[#d0c6b0] shadow-md transition-all hover:shadow-lg">
      <h3 className="font-bold text-lg mb-6 text-[#4d4636] flex items-center gap-2">
        <Users className="text-[#735c00]" size={20} /> {t("familyInfo")}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
        {/* زر التبديل (Switch) */}
        <div className="p-4 border border-[#d0c6b0] rounded-2xl flex items-center justify-between bg-white shadow-inner">
          <span className="font-semibold text-sm">{t("isSupported")}</span>
          <button
            type="button"
            onClick={() =>
              handleInputChange({
                target: {
                  name: "is_supported",
                  value: formData.is_supported === 1 ? 0 : 1,
                },
              })
            }
            // الـ button يحتوي على الخلفية
            className={`w-14 h-8 rounded-full transition-all duration-300 relative ${
              formData.is_supported === 1 ? "bg-[#735c00]" : "bg-gray-300"
            }`}
          >
            {/* الدائرة تتحرك داخل الزر فقط بناءً على الحالة واللغة */}
            <div
              className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all duration-300 
          ${
            formData.is_supported === 1
              ? "left-7 rtl:right-7 rtl:left-auto"
              : "left-1 rtl:right-1 rtl:left-auto"
          }`}
            />
          </button>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">
            {t("familyStatementFile")}
          </label>
          <div
            onClick={() => fileInputRef.current.click()}
            className="w-full h-[60px] border-2 border-dashed border-[#d0c6b0] rounded-2xl flex items-center justify-center gap-3 cursor-pointer bg-white shadow-inner"
          >
            <FileUp className="text-[#4d4636] opacity-60" size={20} />
            <span className="text-sm font-medium text-[#4d4636]">
              {formData.Family_statement
                ? formData.Family_statement.name
                : t("familyStatementFile")}
            </span>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={(e) =>
              handleInputChange({
                target: { name: "Family_statement", value: e.target.files[0] },
              })
            }
          />
          {errors.Family_statement && (
            <p className="text-red-500 text-xs mt-1">
              {errors.Family_statement}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
