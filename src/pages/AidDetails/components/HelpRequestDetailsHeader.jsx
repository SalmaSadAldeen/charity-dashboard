import { ArrowLeft, Flame } from "lucide-react";
import StatusBadge from "./StatusBadge";

export default function HelpRequestDetailsHeader({
  isRtl,
  isUrgent,
  currentStatus,
  t,
  onBack,
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-border pb-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="p-2 text-gray-400 hover:text-on-surface-variant hover:bg-gray-100 rounded-xl transition-all shrink-0"
          title={t?.("back") || "رجوع"}
        >
          <ArrowLeft className={`w-5 h-5 ${isRtl ? "rotate-180" : ""}`} />
        </button>

        <div className="flex flex-col">
          <h2 className="text-2xl font-black text-on-surface-variant tracking-tight">
            {t?.("request_details_panel") ||
              t?.("requestDetails") ||
              "تفاصيل الطلب"}
          </h2>
        
        </div>
      </div>

      <div className="flex items-center gap-2">
        {isUrgent && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-extrabold rounded-full border bg-rose-50 text-rose-600 border-rose-200 animate-pulse shadow-sm">
            <Flame className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
            {t?.("urgent") || "عاجل"}
          </span>
        )}
        {currentStatus && <StatusBadge status={currentStatus} t={t} />}
      </div>
    </div>
  );
}
