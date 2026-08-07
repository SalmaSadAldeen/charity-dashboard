import { CheckCircle, Clock, XCircle } from "lucide-react";

export default function SponsorshipsStatsCard({ stats, t }) {
  const accepted = stats?.ACCEPTED || stats?.accepted || 0;
  const pending = stats?.PENDING || stats?.pending || 0;
  const rejected = stats?.REJECTED || stats?.rejected || 0;
  const total = accepted + pending + rejected;

  return (
    <div className="bg-surface-lowest p-6 rounded-3xl border border-border shadow-sm flex flex-col justify-between">
      <div className="mb-4">
        <h3 className="text-base font-bold text-on-surface-variant">
          {t("sponsorshipsStatistics") || "إحصائيات الكفالات"}
        </h3>
        <p className="text-xs text-on-surface-variant/70 mt-0.5">
          {t("totalSponsorship") || "إجمالي الطلبات"}: {total}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="p-3 rounded-2xl bg-green-500/10 border border-green-500/20 flex flex-col items-center text-center">
          <CheckCircle size={18} className="text-green-600 mb-1" />
          <span className="text-[11px] text-on-surface-variant/70 font-medium">
            {t("ACCEPTED") || "مقبول"}
          </span>
          <span className="text-lg font-bold text-green-700">{accepted}</span>
        </div>

        <div className="p-3 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 flex flex-col items-center text-center">
          <Clock size={18} className="text-yellow-600 mb-1" />
          <span className="text-[11px] text-on-surface-variant/70 font-medium">
            {t("PENDING") || "معلق"}
          </span>
          <span className="text-lg font-bold text-yellow-700">{pending}</span>
        </div>

        <div className="p-3 rounded-2xl bg-red-500/10 border border-red-500/20 flex flex-col items-center text-center">
          <XCircle size={18} className="text-red-600 mb-1" />
          <span className="text-[11px] text-on-surface-variant/70 font-medium">
            {t("REJECTED") || "مرفوض"}
          </span>
          <span className="text-lg font-bold text-red-700">{rejected}</span>
        </div>
      </div>
    </div>
  );
}
