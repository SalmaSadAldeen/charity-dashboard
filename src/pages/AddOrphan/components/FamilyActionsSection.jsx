import { FileText, Upload } from "lucide-react";
import { useRef } from "react";

export default function FamilyActionsSection({
  formData,
  handleInputChange,
  t,
}) {

  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleInputChange({
        target: { name: "FamilyStatement", value: file },
      });
    }
  };

  return (
    <div className="bg-surface-lowest p-8 rounded-[2.5rem] border border-border/30 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
      {/* قسم التبديل */}
      <div className="flex items-center gap-4">
        <span className="font-black text-on-surface-variant flex items-center gap-2">
          <FileText size={20} className="text-primary" />
          {t("isSupported")}
        </span>
        <button
          type="button"
          onClick={() =>
            handleInputChange({
              target: { name: "isSupported", value: !formData.isSupported },
            })
          }
          className={`w-16 h-8 rounded-full transition-all duration-300 relative shadow-inner ${
            formData.isSupported ? "bg-primary" : "bg-[#d0c6b0]"
          }`}
        >
          <div
            className={`w-6 h-6 bg-surface-lowest rounded-full transition-all duration-300 absolute top-1 shadow-sm ${
              formData.isSupported ? "right-1" : "left-1"
            }`}
          />
        </button>
      </div>

      {/* قسم رفع الملف - بتصميم useRef الاحترافي */}
      <div className="relative">
        {/* 3. استدعاء الحقل عند الضغط على الـ div */}
        <div
          onClick={() => fileInputRef.current?.click()}
          className="cursor-pointer border-2 border-dashed border-border rounded-2xl px-6 py-4 text-on-surface-variant hover:border-primary hover:bg-primary/5 transition-all duration-300 font-black flex items-center gap-2 shadow-sm hover:shadow-inner"
        >
          <Upload size={18} className="text-primary" />
          <span className="truncate max-w-[200px]">
            {formData.FamilyStatement
              ? formData.FamilyStatement.name
              : t("uploadFamilyStatement")}
          </span>
        </div>

        {/* 4. الحقل المخفي المرتبط بالمرجع */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/*,application/pdf"
        />
      </div>
    </div>
  );
}
