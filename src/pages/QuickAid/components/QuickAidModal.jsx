import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createQuickAidDisbursement,
  fetchQuickAidSummary,
  fetchQuickAidDisbursements,
} from "@/store/quickAidSlice";
import { useTranslation } from "@/hooks/useTranslation";

export default function QuickAidModal({
  isOpen,
  onClose,
  defaultBeneficiaryId,
}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.quickAid);

  const [formData, setFormData] = useState({
    beneficiaryId: "",
    amount: "",
    reason: { ar: "", en: "" },
  });

  // تعبئة الـ ID وتثبيته بالخلفية تلقائياً فور فتحه من صفحة المستفيد
  useEffect(() => {
    if (defaultBeneficiaryId) {
      setFormData((prev) => ({
        ...prev,
        beneficiaryId: Number(defaultBeneficiaryId),
      }));
    }
  }, [defaultBeneficiaryId]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(createQuickAidDisbursement(formData));
    if (!result.error) {
      dispatch(fetchQuickAidSummary());
      dispatch(fetchQuickAidDisbursements({ page: 1, limit: 10 }));
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 sm:p-8 rounded-3xl w-full max-w-lg shadow-2xl border border-border space-y-6 animate-in fade-in zoom-in duration-200">
        <h2 className="text-xl font-black text-slate-900 border-b border-border pb-4">
          {t("create_disbursement", "إنشاء صرف جديد")}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* حقل معرف المستفيد مخفي تماماً عن الواجهة (تم حذفه من الـ JSX ليبقى مرسلاً بالخلفية فقط) */}

          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2">
              {t("amount", "المبلغ")}
            </label>
            <input
              type="text"
              className="w-full border border-border rounded-2xl p-3 focus:ring-2 focus:ring-primary outline-none transition-all text-sm font-bold bg-white text-slate-900"
              value={formData.amount}
              onChange={(e) =>
                setFormData({ ...formData, amount: e.target.value })
              }
              placeholder="0.00"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2">
              {t("reason_ar", "السبب (بالعربية)")}
            </label>
            <input
              type="text"
              className="w-full border border-border rounded-2xl p-3 focus:ring-2 focus:ring-primary outline-none transition-all text-sm font-bold bg-white text-slate-900"
              value={formData.reason.ar}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  reason: { ...formData.reason, ar: e.target.value },
                })
              }
              required
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2">
              {t("reason_en", "السبب (بالإنجليزية)")}
            </label>
            <input
              type="text"
              className="w-full border border-border rounded-2xl p-3 focus:ring-2 focus:ring-primary outline-none transition-all text-sm font-bold bg-white text-slate-900"
              value={formData.reason.en}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  reason: { ...formData.reason, en: e.target.value },
                })
              }
              required
            />
          </div>

          <div className="flex items-center gap-3 pt-4 border-t border-border">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 rounded-2xl border border-border bg-slate-50 text-slate-700 hover:bg-slate-100 font-black text-sm transition-all cursor-pointer"
            >
              {t("cancel", "إلغاء")}
            </button>
            <button
              type="submit"
              disabled={status === "loading"}
              className="flex-1 py-3 px-4 rounded-2xl bg-primary text-white hover:bg-primary/90 font-black text-sm transition-all shadow-md disabled:opacity-50 cursor-pointer"
            >
              {status === "loading"
                ? t("saving", "جاري الحفظ...")
                : t("save", "حفظ")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
