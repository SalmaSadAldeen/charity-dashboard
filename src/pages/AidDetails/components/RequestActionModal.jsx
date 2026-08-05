import { useState, useEffect } from "react";
import { X, CheckCircle2, XCircle } from "lucide-react";
import { AcceptFormFields } from "./AcceptFormFields";
import { RejectFormFields } from "./RejectFormFields";

export function RequestActionModal({
  isOpen,
  type,
  onClose,
  onSubmit,
  t,
  currentData,
}) {
  const [loading, setLoading] = useState(false);
  const [acceptData, setAcceptData] = useState({
    title: { ar: "", en: "" },
    description: { ar: "", en: "" },
    isUrgent: false,
    media: null,
  });
  const [rejectData, setRejectData] = useState({
    rejectionReason: { ar: "", en: "" },
  });

  useEffect(() => {
    if (isOpen) {
      if (type === "accept") {
        setAcceptData({
          title: {
            ar: currentData?.title?.ar || "",
            en: currentData?.title?.en || "",
          },
          description: {
            ar: currentData?.description?.ar || "",
            en: currentData?.description?.en || "",
          },
          isUrgent: currentData?.isUrgent || false,
          media: null,
        });
      } else {
        setRejectData({
          rejectionReason: {
            ar: currentData?.rejectionReason?.ar || "",
            en: currentData?.rejectionReason?.en || "",
          },
        });
      }
    }
  }, [isOpen, type, currentData]);

  if (!isOpen) return null;
  const isReject = type === "reject";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = isReject
      ? {
          status: "REJECTED",
          title: currentData?.title || { ar: "طلب مساعدة", en: "Help Request" },
          description: currentData?.description || {
            ar: "تفاصيل الطلب",
            en: "Request details",
          },
          isUrgent: currentData?.isUrgent || false,
          rejectionReason: rejectData.rejectionReason,
        }
      : {
          status: "ACCEPTED",
          title: acceptData.title,
          description: acceptData.description,
          isUrgent: acceptData.isUrgent,
          rejectionReason: { ar: "", en: "" },
          media: acceptData.media,
        };

    try {
      await onSubmit(payload);
    } catch (error) {
      console.error("Action submission error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 overflow-y-auto transition-all">
      <div
        className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200 my-8 text-right"
        dir="rtl"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-inner ${isReject ? "bg-rose-50 text-rose-600 border border-rose-100" : "bg-emerald-50 text-emerald-600 border border-emerald-100"}`}
            >
              {isReject ? (
                <XCircle className="w-7 h-7" />
              ) : (
                <CheckCircle2 className="w-7 h-7" />
              )}
            </div>
            <div>
              <h3 className="font-extrabold text-xl text-slate-900">
                {isReject
                  ? t?.("reject_title") || "رفض الطلب مع الأسباب"
                  : t?.("accept_title") || "قبول الطلب وتعديل البيانات"}
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">
                {isReject
                  ? "يرجى تعبئة سبب الرفض باللغتين."
                  : "يرجى مراجعة وتعديل البيانات."}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2.5 text-slate-400 hover:text-slate-700 rounded-2xl hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {!isReject ? (
            <AcceptFormFields
              acceptData={acceptData}
              setAcceptData={setAcceptData}
              t={t}
            />
          ) : (
            <RejectFormFields
              rejectData={rejectData}
              setRejectData={setRejectData}
              t={t}
            />
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-5 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-5 py-3.5 rounded-2xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50 transition-all"
            >
              {t?.("cancel") || "إلغاء"}
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`flex-1 px-5 py-3.5 rounded-2xl text-white font-extrabold text-xs shadow-lg transition-all active:scale-[0.98] ${isReject ? "bg-rose-600 hover:bg-rose-700" : "bg-primary hover:bg-primary/90"}`}
            >
              {loading ? "جاري الإرسال..." : "تأكيد وإرسال"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
