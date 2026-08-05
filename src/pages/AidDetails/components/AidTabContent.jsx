import {
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Calendar,
  DollarSign,
  Info,
} from "lucide-react";
import AidCategoryDetails from "./AidCategoryDetails";

export default function AidTabContent({ selectedDetails, t, lang }) {
  if (!selectedDetails) return null;

  const isRTL = lang === "ar";

  const getLocalized = (obj) => {
    if (!obj) return "";
    if (typeof obj === "string") return obj;
    return obj[lang] || obj["ar"] || obj["en"] || "";
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "";

    const locale = isRTL ? "ar-EG" : "en-GB";

    return new Intl.DateTimeFormat(locale, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
  };

  const rawAidImage = selectedDetails.aidDetails?.donorImageUrl;
  let aidImageUrl = "";
  if (rawAidImage) {
    let cleanPath = rawAidImage.replace(/\\/g, "/").replace(/^uploads\//, "");
    aidImageUrl = `http://localhost:3000/uploads/${cleanPath}`;
  }

  const showAidImage = selectedDetails.status === "ACCEPTED" && aidImageUrl;

  const localizedTitle = getLocalized(selectedDetails.title);
  const localizedDetails = getLocalized(selectedDetails.details);
  const localizedDescription = getLocalized(selectedDetails.description);

  return (
    <div
      className={`space-y-5 ${isRTL ? "text-right" : "text-left"}`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      {selectedDetails.status === "REJECTED" &&
        selectedDetails.rejectionReason && (
          <div className="p-4 bg-error/10 rounded-2xl border border-error/20 flex gap-3 items-start shadow-sm">
            <div className="p-2 bg-error/20 text-error rounded-xl shrink-0">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div className="space-y-1">
              <h4 className="text-xs font-black text-error">
                {t?.("rejectionReason") || "سبب رفض الطلب:"}
              </h4>
              <p className="text-xs font-medium text-error/90 leading-relaxed">
                {getLocalized(selectedDetails.rejectionReason)}
              </p>
            </div>
          </div>
        )}

      <div className="bg-surface-lowest p-6 rounded-3xl border border-border/60 shadow-sm flex flex-col justify-between gap-5">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-3 flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              {selectedDetails.category?.name && (
                <span className="text-[11px] font-extrabold uppercase text-primary px-3 py-1 mb-2 bg-primary/10 rounded-xl border border-primary/20">
                  {getLocalized(selectedDetails.category.name)}
                </span>
              )}
              {selectedDetails.subCategory?.name && (
                <span className="text-[11px] font-bold uppercase text-on-surface-variant px-3 py-1 bg-surface/50 rounded-xl border border-border/60">
                  {getLocalized(selectedDetails.subCategory.name)}
                </span>
              )}
            </div>

            {localizedTitle && (
              <div className="space-y-1">
                <p className="text-[10px] font-extrabold text-on-surface-variant/70 uppercase tracking-wider">
                  {t?.("title") || "عنوان الطلب"}
                </p>
                <h3 className="font-black text-on-surface text-base leading-snug truncate">
                  {localizedTitle}
                </h3>
              </div>
            )}
          </div>

          {showAidImage && (
            <div className="shrink-0">
              <div className="w-45 h-32 rounded-2xl overflow-hidden border border-border/80 bg-surface/50 shadow-sm">
                <img
                  src={aidImageUrl}
                  alt=""
                  className="w-full h-full object-cover block"
                />
              </div>
            </div>
          )}
        </div>

        {localizedDetails && (
          <div className="space-y-1.5 bg-surface/50 p-4 rounded-2xl border border-border/60">
            <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-primary" />
              {t?.("details") || "التفاصيل"}
            </p>
            <p className="font-medium text-on-surface text-xs leading-relaxed">
              {localizedDetails}
            </p>
          </div>
        )}

        {localizedDescription && (
          <div className="space-y-1 w-full overflow-hidden bg-surface/30 p-4 rounded-2xl border border-border/60">
            <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">
              {t?.("description") || "الوصف الإضافي"}
            </p>
            <p className="font-normal text-on-surface-variant text-xs leading-relaxed break-words whitespace-pre-wrap">
              {localizedDescription}
            </p>
          </div>
        )}

        <div className="pt-2 grid grid-cols-2 gap-3">
          <div className="p-4 bg-surface/50 rounded-2xl border border-border/60 space-y-1">
            <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider flex items-center gap-1">
              <DollarSign className="w-3.5 h-3.5 text-primary" />
              {t?.("totalCost") || "التكلفة الكلية"}
            </p>
            <p className="font-black text-primary text-base">
              ${selectedDetails.cost ?? 0}
            </p>
          </div>

          <div className="p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 space-y-1">
            <p className="text-[10px] font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              {t?.("currentPayment") || "المبلغ المدفوع"}
            </p>
            <p className="font-black text-emerald-600 dark:text-emerald-400 text-base">
              ${selectedDetails.currentPayment ?? 0}
            </p>
          </div>
        </div>
      </div>

      <AidCategoryDetails
        aidDetails={selectedDetails.aidDetails}
        categoryId={selectedDetails.category?.id}
        t={t}
        lang={lang}
      />

      <div className="bg-surface-lowest p-6 rounded-3xl border border-border/60 shadow-sm space-y-4 flex flex-col justify-between">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-extrabold text-on-surface flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-primary" />
              {t?.("compliancePercentage") || "نسبة مطابقة الطلب:"}
            </span>
            <span className="text-xs font-black text-primary px-2.5 py-1 bg-primary/10 rounded-xl">
              {selectedDetails.compliancePercentage || 0}%
            </span>
          </div>

          <div className="w-full h-2.5 bg-surface/50 rounded-full overflow-hidden p-0.5 border border-border/60">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${selectedDetails.compliancePercentage || 0}%` }}
            />
          </div>
        </div>

        <div className="pt-3 border-t border-border/60 space-y-3 text-[14px] font-medium text-on-surface-variant">
          {selectedDetails.createdAt && (
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-1 text-xs">
                <Calendar className="w-3.5 h-3.5 text-primary" />
                {t?.("createdAt") || "تاريخ إنشاء الطلب:"}
              </span>
              <span className="font-bold text-on-surface text-xs" dir="ltr">
                {formatDate(selectedDetails.createdAt)}
              </span>
            </div>
          )}
          {selectedDetails.reviewedAt && (
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-1 text-xs">
                <Calendar className="w-3.5 h-3.5 text-primary" />
                {t?.("reviewedAt") || "تاريخ آخر مراجعة:"}
              </span>
              <span className="font-bold text-on-surface text-xs" dir="ltr">
                {formatDate(selectedDetails.reviewedAt)}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
