import { useTranslation } from "@/hooks/useTranslation";
import {
  Wallet,
  DollarSign,
  ArrowDownRight,
  CheckCircle2,
  Users,
} from "lucide-react";

export default function SponsorshipFundStats({ stats }) {
  const { t } = useTranslation();

  if (!stats) return null;

  const statItems = [
    {
      label: t("currentBalance"),
      value: stats.currentBalance,
      icon: <Wallet className="text-primary" size={26} />,
      bg: "bg-primary/10",
    },
    {
      label: t("totalDonations"),
      value: stats.totalDonations,
      icon: <DollarSign className="text-emerald-600" size={26} />,
      bg: "bg-emerald-50",
    },
    {
      label: t("totalDistributed"),
      value: stats.totalDistributed,
      icon: <ArrowDownRight className="text-rose-600" size={26} />,
      bg: "bg-rose-50",
    },
    {
      label: t("activeCoverages"),
      value: stats.activeCoverages,
      icon: <CheckCircle2 className="text-blue-600" size={26} />,
      bg: "bg-blue-50",
    },
    {
      label: t("totalSupportedOrphans"),
      value: stats.totalSupportedOrphans,
      icon: <Users className="text-purple-600" size={26} />,
      bg: "bg-purple-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {statItems.map((item, index) => (
        <div
          key={index}
          className="bg-white p-5 rounded-3xl border border-border shadow-sm flex items-center gap-4 transition-all hover:shadow-md min-w-0"
        >
          <div className={`p-3.5 rounded-2xl ${item.bg} flex items-center justify-center shrink-0`}>
            {item.icon}
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-xs font-bold text-gray-400 truncate">{item.label}</span>
            <span className="text-xl font-black text-on-surface-variant mt-1.5 tracking-tight truncate">
              {item.value}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}