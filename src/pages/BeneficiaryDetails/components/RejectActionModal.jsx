import { RejectFormFields } from "@/pages/AidDetails/components/RejectFormFields";

export function RejectActionModal({
  isOpen,
  onClose,
  onSubmit,
  rejectData,
  setRejectData,
  isLoading,
  t,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-border space-y-6 animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center border-b border-border pb-4">
          <h3 className="text-lg font-black text-slate-900">
            {t?.("reject_beneficiary_title") || "رفض طلب المستفيد"}
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 font-bold text-lg"
          >
            ✕
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          {/* حقول أسباب الرفض بالعربي والإنجليزي */}
          <RejectFormFields
            rejectData={rejectData}
            setRejectData={setRejectData}
            t={t}
          />

          {/* أزرار التحكم بالموديل */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 rounded-2xl border border-border bg-slate-50 text-slate-700 hover:bg-slate-100 font-black text-sm transition-all"
            >
              {t?.("cancel") || "إلغاء"}
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 py-3 px-4 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-black text-sm transition-all shadow-md disabled:opacity-50"
            >
              {isLoading
                ? "جاري الإرسال..."
                : t?.("confirm_reject") || "تأكيد الرفض"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
