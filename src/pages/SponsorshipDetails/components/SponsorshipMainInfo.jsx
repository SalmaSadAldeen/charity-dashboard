import { 
  HeartHandshake, DollarSign, Calendar, Clock, 
  AlertCircle, XCircle, FileText 
} from "lucide-react";

export default function SponsorshipMainInfo({ sponsorship ,t}) {
  const { monthlyAmount, startDate, endDate, status, rejectionReason, cancellationSource, createdAt } = sponsorship;

  // إعداد مصفوفة البيانات الأساسية للكفالة لعرضها بشكل كروت مرتبة
  const mainInfoItems = [
    { 
      label: t("monthly_amount"), 
      value: `${monthlyAmount} $`, 
      icon: <DollarSign size={16} className="text-primary" /> 
    },
    { 
      label: t("start_date"), 
      value: startDate ? new Date(startDate).toLocaleDateString() : "-", 
      icon: <Calendar size={16} className="text-primary" /> 
    },
    { 
      label: t("end_date"), 
      value: status === "ACCEPTED" ? (endDate ? new Date(endDate).toLocaleDateString() : t("ongoing") || "مستمرة") : "-", 
      icon: <Clock size={16} className="text-primary" /> 
    },
    { 
      label: t("created_at"), 
      value: createdAt ? new Date(createdAt).toLocaleString() : "-", 
      icon: <FileText size={16} className="text-primary" /> 
    },
  ];

  return (
    <div className="bg-surface/30 p-6 rounded-3xl space-y-4 border border-border/50 md:col-span-2">
      <h3 className="font-bold text-lg text-primary border-b pb-3 flex items-center gap-2">
        <HeartHandshake size={20} />
        {t("sponsorship_details")}
      </h3>

      {/* شبكة الكروت المنظمة تماماً مثل كرت المتبرع واليتيم */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {mainInfoItems.map((item, index) => (
          <div 
            key={index} 
            className="bg-surface-lowest p-3.5 rounded-2xl border border-border/60 shadow-2xs flex flex-col justify-between space-y-1"
          >
            <div className="flex items-center gap-2 text-xs font-medium text-gray-400">
              {item.icon}
              <span>{item.label}</span>
            </div>
            <div className="text-sm font-bold text-on-surface-variant truncate" title={item.value}>
              {item.value}
            </div>
          </div>
        ))}
      </div>

      {/* حقول الحالات الخاصّة (الرفض أو الإلغاء) تظهر بشكل مميز وأنيق إذا وجدت */}
      {status === "REJECTED" && rejectionReason && (
        <div className="text-sm text-red-600 bg-red-50 p-4 rounded-2xl border border-red-200 flex items-start gap-3">
          <XCircle size={20} className="shrink-0 mt-0.5" />
          <div>
            <strong className="block font-bold">{t("rejection_reason")}:</strong>
            <span>{typeof rejectionReason === "object" ? JSON.stringify(rejectionReason) : rejectionReason}</span>
          </div>
        </div>
      )}

      {status === "CANCELLED" && cancellationSource && (
        <div className="text-sm text-orange-600 bg-orange-50 p-4 rounded-2xl border border-orange-200 flex items-start gap-3">
          <AlertCircle size={20} className="shrink-0 mt-0.5" />
          <div>
            <strong className="block font-bold">{t("cancellation_source")}:</strong>
            <span>{cancellationSource}</span>
          </div>
        </div>
      )}
    </div>
  );
}