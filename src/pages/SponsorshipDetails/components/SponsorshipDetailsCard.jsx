import { CheckCircle, Clock, XCircle, AlertCircle } from "lucide-react";
import SponsorshipMainInfo from "./SponsorshipMainInfo";
import DonorInfoCard from "./DonorInfoCard";

export default function SponsorshipDetailsCard({ sponsorship, t }) {
  if (!sponsorship) return null;

  const { status } = sponsorship;

  const getStatusBadge = (currentStatus) => {
    switch (currentStatus) {
      case "ACCEPTED":
        return {
          bg: "bg-green-100 text-green-700",
          icon: <CheckCircle size={16} />,
        };
      case "PENDING":
        return {
          bg: "bg-yellow-100 text-yellow-700",
          icon: <Clock size={16} />,
        };
      case "REJECTED":
        return { bg: "bg-red-100 text-red-700", icon: <XCircle size={16} /> };
      case "CANCELLED":
        return {
          bg: "bg-gray-100 text-gray-700",
          icon: <AlertCircle size={16} />,
        };
      default:
        return { bg: "bg-gray-100 text-gray-700", icon: <Clock size={16} /> };
    }
  };

  const badge = getStatusBadge(status);

  return (
    <div className="bg-surface-lowest p-6 rounded-3xl border border-border shadow-sm space-y-6">
      <div className="flex justify-between items-center border-b pb-4">
        <h2 className="text-xl font-bold text-on-surface-variant">
          {t("sponsorship_details")} #{sponsorship.id}
        </h2>
        <span
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${badge.bg}`}
        >
          {badge.icon}
          {t(status)}
        </span>
      </div>
      <div className="max-w-xl">
        <DonorInfoCard donor={sponsorship?.donor} t={t} />
      </div>
      <div className="space-y-6">
        <SponsorshipMainInfo sponsorship={sponsorship} t={t} />
      </div>
    </div>
  );
}
