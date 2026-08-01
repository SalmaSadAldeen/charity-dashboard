export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  t,
  lang,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div
        className="bg-surface-lowest rounded-3xl p-7 max-w-md w-full shadow-2xl border border-border/80 space-y-6 relative overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        dir={lang === "ar" ? "rtl" : "ltr"}
      >
        {/* تأثير بلور خفيف على الأطراف */}
        <div className="absolute -top-12 -left-12 w-32 h-32 bg-red-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center shrink-0 border border-red-100 shadow-inner">
            <span className="material-symbols-outlined text-2xl leading-none">
              warning
            </span>
          </div>
          <div>
            <h3 className="text-lg font-bold text-on-surface">
              {t("confirmDeleteTitle") || "تأكيد الحذف"}
            </h3>
            <p className="text-xs text-on-surface-variant/70 mt-1">
              {t("confirmDeleteSubtitle") ||
                "هل أنت متأكد من رغبتك في حذف هذا الدور؟ لا يمكن التراجع عن هذا الإجراء."}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-2xl bg-surface-container/60 hover:bg-surface-container text-on-surface-variant text-sm font-medium transition shadow-xs"
          >
            {t("cancel") || "إلغاء"}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-5 py-2.5 rounded-2xl bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition shadow-md shadow-red-600/20"
          >
            {t("delete") || "حذف"}
          </button>
        </div>
      </div>
    </div>
  );
}
