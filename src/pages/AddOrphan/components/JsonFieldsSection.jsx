import { LayoutGrid } from "lucide-react";

export default function JsonFieldsSection({
  formData,
  handleInputChange,
  t,
  fields,
  errors,
}) {
  return (
    <div className="bg-surface-lowest p-8 rounded-[2.5rem] border-2 border-border/30 shadow-sm w-full">
      <h3 className="text-lg font-black text-on-surface-variant mb-8 flex items-center gap-3">
        <LayoutGrid className="text-primary" /> {t("additionalDetails")}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {fields.map((fieldName, index) => {
          const isLastOdd =
            index === fields.length - 1 && fields.length % 2 !== 0;

          return (
            <div
              key={fieldName}
              className={`flex flex-col border-2 border-border/30 rounded-3xl p-4 transition-all duration-300 focus-within:border-primary focus-within:shadow-md ${
                isLastOdd ? "md:col-span-2 md:w-[50%] md:mx-auto" : "w-full"
              }`}
            >
              <label className="text-[14px] font-black text-on-surface-variant/80 uppercase tracking-widest mb-4">
                {t(fieldName)}
              </label>

              {/* حقل اللغة العربية */}
              <div className="relative group">
                <span className="absolute -top-3 right-2 bg-[#fcfaf7] px-2 text-[9px] font-bold text-primary border border-border/30 rounded-full">
                  AR
                </span>
                <textarea
                  name={`${fieldName}.ar`}
                  value={formData[fieldName]?.ar || ""}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-[#fcfaf7]/50 outline-none text-right font-medium text-on-surface-variant shadow-inner rounded-2xl resize-none transition-all duration-300 focus:bg-surface-lowest"
                  placeholder={t("enterArabic")}
                />
              </div>

              {/* حقل اللغة الإنجليزية */}
              <div className="relative group mt-4">
                <span className="absolute -top-3 left-2 bg-[#fcfaf7] px-2 text-[9px] font-bold text-primary border border-border/30 rounded-full">
                  EN
                </span>
                <textarea
                  name={`${fieldName}.en`}
                  value={formData[fieldName]?.en || ""}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-[#fcfaf7]/50 outline-none text-left font-medium text-on-surface-variant shadow-inner rounded-2xl resize-none transition-all duration-300 focus:bg-surface-lowest"
                  placeholder={t("enterEnglish")}
                />
              </div>

              {errors && errors[fieldName] && (
                <span className="text-[10px] text-error font-bold pt-2">
                  {errors[fieldName]}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
