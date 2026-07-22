import { useState, useEffect } from "react";
import {
  X,
  CheckCircle2,
  XCircle,
  Upload,
  Image as ImageIcon,
} from "lucide-react";

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
    media: null, // حقل الصورة الجديد
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
          media: acceptData.media, // تمرير ملف الصورة هنا
        };

    try {
      await onSubmit(payload);
    } catch (error) {
      console.error("Action submission error:", error);
    } finally {
      setLoading(false);
      setAcceptData({
        title: { ar: "", en: "" },
        description: { ar: "", en: "" },
        isUrgent: false,
        media: null,
      });
      setRejectData({ rejectionReason: { ar: "", en: "" } });
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
              className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-inner ${
                isReject
                  ? "bg-rose-50 text-rose-600 border border-rose-100"
                  : "bg-emerald-50 text-emerald-600 border border-emerald-100"
              }`}
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
                  ? t?.("reject_subtitle") ||
                    "يرجى تعبئة سبب الرفض باللغتين العربية والإنجليزية بدقة."
                  : t?.("accept_subtitle") ||
                    "يرجى مراجعة وتعديل العنوان والوصف وتحديد حالة الاستعجال وإرفاق الصورة."}
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
                        description: {
                          ...prev.description,
                          ar: e.target.value,
                        },
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
                        description: {
                          ...prev.description,
                          en: e.target.value,
                        },
                      }))
                    }
                    placeholder="Enter detailed description in English..."
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 p-3.5 text-xs text-slate-800 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none transition-all"
                    dir="ltr"
                  />
                </div>
              </div>

              {/* صف واحد يضم حقل رفع الصورة + خيار الاستعجال لتوفير مساحة وتصغير الحجم */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                {/* Image Upload Input */}
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

                {/* isUrgent Checkbox Card */}
                <div className="flex items-center gap-3 p-3.5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer self-end">
                  <input
                    type="checkbox"
                    id="isUrgentCheckbox"
                    checked={acceptData.isUrgent}
                    onChange={(e) =>
                      setAcceptData((prev) => ({
                        ...prev,
                        isUrgent: e.target.checked,
                      }))
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
          ) : (
            /* Rejection Reason Ar / En */
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
                      rejectionReason: {
                        ...prev.rejectionReason,
                        ar: e.target.value,
                      },
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
                      rejectionReason: {
                        ...prev.rejectionReason,
                        en: e.target.value,
                      },
                    }))
                  }
                  placeholder="Enter rejection reason in English..."
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 p-3.5 text-xs text-slate-800 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none transition-all"
                  dir="ltr"
                />
              </div>
            </div>
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
              className={`flex-1 px-5 py-3.5 rounded-2xl text-white font-extrabold text-xs shadow-lg transition-all active:scale-[0.98] ${
                isReject
                  ? "bg-rose-600 hover:bg-rose-700 shadow-rose-200"
                  : "bg-primary hover:bg-primary/90 shadow-primary/20"
              }`}
            >
              {loading
                ? t?.("sending") || "جاري الإرسال..."
                : t?.("confirm_and_send") || "تأكيد وإرسال"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
