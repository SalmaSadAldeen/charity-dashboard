import {
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Hourglass,
} from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

export default function StatsOverview({ stats }) {
  const { t } = useTranslation();

  const statItems = [
    {
      title: t("pendingRequests"),
      value: stats.pending_count,
      icon: Hourglass,
      color: "text-primary",
      bg: "bg-primary-container",
    },
    {
      title: t("acceptedRequests"),
      value: stats.accepted_count,
      icon: CheckCircle2,
      color: "text-tertiary",
      bg: "bg-green-50",
    }, 
    {
      title: t("rejectedRequests"),
      value: stats.rejected_count,
      icon: XCircle,
      color: "text-error",
      bg: "bg-red-50",
    },
    {
      title: t("urgentCases"),
      value: stats.urgent_cases,
      icon: AlertTriangle,
      color: "text-secondary",
      bg: "bg-amber-100",
    },
    {
      title: t("avgReviewTime"),
      value: `${stats.avg_review_time_days} ${t("days")}`,
      icon: Clock,
      color: "text-on-surface-variant",
      bg: "bg-surface",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
      {statItems.map((item, index) => (
        <div
          key={index}
          className="bg-surface-lowest p-5 rounded-2xl border border-border shadow-lg transition-all duration-300 hover:shadow-md hover:border-primary flex flex-col items-center justify-center text-center group"
        >
          {/* الأيقونة مع الخلفية المتوافقة مع الثيم */}
          <div
            className={`p-3 rounded-full ${item.bg} mb-2 transition-transform duration-300 group-hover:scale-110`}
          >
            <item.icon size={22} className={item.color} />
          </div>

          <h4 className={`text-2xl font-black ${item.color} mb-1`}>
            {item.value}
          </h4>
          <p className="text-[12px] font-bold text-on-surface-variant opacity-80 uppercase tracking-widest">
            {item.title}
          </p>
        </div>
      ))}
    </div>
  );
}
