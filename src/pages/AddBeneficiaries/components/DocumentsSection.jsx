import { FileText } from "lucide-react";

export default function DocumentsSection({ onChange, errors, t }) {
  return (
    <div className="space-y-5 p-6 bg-gray-50/50 rounded-3xl border border-gray-100">
      <h3 className="text-base font-bold text-gray-800 flex items-center gap-2 border-b pb-3">
        <FileText size={18} className="text-primary" />
        <span>{t("requiredDocuments") || "Required Documents"}</span>
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 border-2 border-dashed border-gray-200 rounded-3xl bg-white hover:border-primary transition-all">
          <label className="block text-sm font-bold mb-2 text-gray-700">{t("personalPhoto") || "Personal Photo"}</label>
          <input type="file" name="personalPhoto" onChange={onChange} className="w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-primary file:text-white hover:file:opacity-90 cursor-pointer" />
          {errors.personalPhoto && <span className="text-red-500 text-xs mt-2 block font-medium">{errors.personalPhoto}</span>}
        </div>

        <div className="p-4 border-2 border-dashed border-gray-200 rounded-3xl bg-white hover:border-primary transition-all">
          <label className="block text-sm font-bold mb-2 text-gray-700">{t("uploadFamilyStatement") } </label>
          <input type="file" name="familyStatement" onChange={onChange} className="w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-primary file:text-white hover:file:opacity-90 cursor-pointer" />
          {errors.familyStatement && <span className="text-red-500 text-xs mt-2 block font-medium">{errors.familyStatement}</span>}
        </div>
      </div>
    </div>
  );
}