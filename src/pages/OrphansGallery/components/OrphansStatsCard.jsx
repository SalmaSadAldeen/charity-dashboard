import { UserCheck, UserX } from "lucide-react";

export default function OrphansStatsCard({
  t,
  sponsored = 0,
  notSponsored = 0,
}) {
  const total = sponsored + notSponsored;
  const percentage = total > 0 ? Math.round((sponsored / total) * 100) : 0;

  return (
    <div className="bg-surface-lowest px-5 py-3.5 rounded-2xl border border-border shadow-sm w-full flex flex-col justify-between">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3 className="text-sm font-bold text-on-surface-variant">
            {t("orphansSponsorshipOverview")}
          </h3>
          <p className="text-[11px] text-on-surface-variant/70">
            {t("totalOrphans")}: <span className="font-bold text-primary">{total}</span>
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-xs">
          <span className="flex items-center gap-1 text-on-surface-variant/80">
            <UserX size={13} /> {t("notSponsored")}
          </span>
          <span className="font-bold px-2 py-0.5 bg-red-100 text-red-600 rounded-md text-[11px]">
            {notSponsored}
          </span>
        </div>
      </div>

      {/* شريط التقدم المرئي */}
      <div className="space-y-1">
        <div className="flex justify-between text-[11px] font-semibold">
          <span className="flex items-center gap-1 text-primary">
            <UserCheck size={13} /> {t("sponsored")} ({sponsored})
          </span>
          <span className="text-primary">{percentage}%</span>
        </div>
        <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
          <div
            className="bg-primary h-full rounded-full transition-all duration-500"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}