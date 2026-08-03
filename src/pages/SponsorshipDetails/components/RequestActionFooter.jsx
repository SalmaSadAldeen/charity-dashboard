import { CheckCircle2, XCircle } from "lucide-react";

export function RequestActionFooter({
  currentStatus,
  t,
  onOpenModal,
  onAccept,
}) {
  // إظهار الأزرار فقط حصرياً عندما تكون الحالة PENDING
  if (currentStatus !== "PENDING") return null;

  return (
    <div className="p-5 bg-white border-t border-border flex items-center justify-end gap-4 sticky bottom-0 shrink-0 rounded-b-3xl shadow-lg">
      {/* زر الرفض: يفتح الموديل لإدخال الأسباب */}
      <button
        type="button"
        onClick={() => onOpenModal("reject")}
        className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl border border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white font-black text-sm transition-all duration-200 shadow-sm active:scale-[0.98]"
      >
        <XCircle className="w-5 h-5 shrink-0" />
        <span>{t?.("reject_request") || t?.("reject") || "رفض الطلب"}</span>
      </button>

      {/* زر القبول: ينتقل لواجهة اختيار اليتيم مباشرة */}
      <button
        type="button"
        onClick={onAccept}
        className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black text-sm transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.98]"
      >
        <CheckCircle2 className="w-5 h-5 shrink-0" />
        <span>{t?.("accept_request") || t?.("accept") || "قبول الطلب"}</span>
      </button>
    </div>
  );
}
