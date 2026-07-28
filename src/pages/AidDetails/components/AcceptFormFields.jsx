import { Upload } from "lucide-react";

export function AcceptFormFields({ acceptData, setAcceptData, t }) {
  return (
    <div className="space-y-4 max-h-[60vh] overflow-y-auto px-1 custom-scrollbar">
      {/* Title Ar / En */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700">
            {t?.("title_ar") || "العنوان (عربي)"}{" "}
            <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            required
            value={acceptData.title.ar}
            onChange={(e) =>
              setAcceptData((prev) => ({
                ...prev,
                title: { ...prev.title, ar: e.target.value },
              }))
            }
            placeholder="أدخل العنوان بالعربية..."
            className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 p-3.5 text-xs text-slate-800 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
            dir="rtl"
          />
        </div>
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700">
            {t?.("title_en") || "العنوان (إنجليزي)"}{" "}
            <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            required
            value={acceptData.title.en}
            onChange={(e) =>
              setAcceptData((prev) => ({
                ...prev,
                title: { ...prev.title, en: e.target.value },
              }))
            }
            placeholder="Enter title in English..."
            className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 p-3.5 text-xs text-slate-800 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
            dir="ltr"
          />
        </div>
      </div>

      {/* Description Ar / En */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700">
            {t?.("description_ar") || "الوصف (عربي)"}{" "}
            <span className="text-rose-500">*</span>
          </label>
          <textarea
            required
            rows={3}
            value={acceptData.description.ar}
            onChange={(e) =>
              setAcceptData((prev) => ({
                ...prev,
                description: { ...prev.description, ar: e.target.value },
              }))
            }
            placeholder="أدخل الوصف التفصيلي بالعربية..."
            className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 p-3.5 text-xs text-slate-800 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none transition-all"
            dir="rtl"
          />
        </div>
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700">
            {t?.("description_en") || "الوصف (إنجليزي)"}{" "}
            <span className="text-rose-500">*</span>
          </label>
          <textarea
            required
            rows={3}
            value={acceptData.description.en}
            onChange={(e) =>
              setAcceptData((prev) => ({
                ...prev,
                description: { ...prev.description, en: e.target.value },
              }))
            }
            placeholder="Enter detailed description in English..."
            className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 p-3.5 text-xs text-slate-800 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none transition-all"
            dir="ltr"
          />
        </div>
      </div>

      {/* Upload Image & Urgent Checkbox */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700">
            {t?.("acceptance_image") || "صورة القبول (اختياري)"}
          </label>
          <label className="flex items-center gap-2.5 w-full rounded-2xl border border-dashed border-slate-300 bg-slate-50/50 p-3 text-xs text-slate-600 hover:bg-slate-50 hover:border-primary cursor-pointer transition-all truncate">
            <Upload className="w-4 h-4 text-primary shrink-0" />
            <span className="truncate flex-1">
              {acceptData.media
                ? acceptData.media.name
                : t?.("upload_image_placeholder") || "اختر صورة..."}
            </span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setAcceptData((prev) => ({
                    ...prev,
                    media: e.target.files[0],
                  }));
                }
              }}
            />
          </label>
        </div>

        <div className="flex items-center gap-3 p-3.5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer self-end">
          <input
            type="checkbox"
            id="isUrgentCheckbox"
            checked={acceptData.isUrgent}
            onChange={(e) =>
              setAcceptData((prev) => ({ ...prev, isUrgent: e.target.checked }))
            }
            className="w-4 h-4 text-primary rounded border-slate-300 focus:ring-primary cursor-pointer"
          />
          <label
            htmlFor="isUrgentCheckbox"
            className="text-xs font-bold text-slate-700 cursor-pointer select-none flex-1"
          >
            {t?.("is_urgent_question") || "هل الطلب عاجل؟"}
          </label>
        </div>
      </div>
    </div>
  );
}
