export function RejectFormFields({ rejectData, setRejectData, t }) {
  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <label className="block text-xs font-bold text-slate-700">
          {t?.("rejection_reason_ar") || "سبب الرفض (عربي)"}{" "}
          <span className="text-rose-500">*</span>
        </label>
        <textarea
          required
          rows={3}
          value={rejectData.rejectionReason.ar}
          onChange={(e) =>
            setRejectData((prev) => ({
              ...prev,
              rejectionReason: { ...prev.rejectionReason, ar: e.target.value },
            }))
          }
          placeholder="اكتب سبب الرفض بالعربية..."
          className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 p-3.5 text-xs text-slate-800 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none transition-all"
          dir="rtl"
        />
      </div>
      <div className="space-y-1.5">
        <label className="block text-xs font-bold text-slate-700">
          {t?.("rejection_reason_en") || "سبب الرفض (إنجليزي)"}{" "}
          <span className="text-rose-500">*</span>
        </label>
        <textarea
          required
          rows={3}
          value={rejectData.rejectionReason.en}
          onChange={(e) =>
            setRejectData((prev) => ({
              ...prev,
              rejectionReason: { ...prev.rejectionReason, en: e.target.value },
            }))
          }
          placeholder="Enter rejection reason in English..."
          className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 p-3.5 text-xs text-slate-800 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none transition-all"
          dir="ltr"
        />
      </div>
    </div>
  );
}
