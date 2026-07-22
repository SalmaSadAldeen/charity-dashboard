import { CheckCircle2, XCircle, Clock, MinusCircle } from "lucide-react";

const STATUS_CONFIG = {
  PENDING: {
    bg: "bg-amber-500/10 text-amber-600 border-amber-200",
    icon: Clock,
    textKey: "pending",
    defaultText: "قيد الانتظار",
  },
  ACCEPTED: {
    bg: "bg-emerald-500/10 text-emerald-600 border-emerald-200",
    icon: CheckCircle2,
    textKey: "accepted",
    defaultText: "مقبول",
  },
  REJECTED: {
    bg: "bg-rose-500/10 text-rose-600 border-rose-200",
    icon: XCircle,
    textKey: "rejected",
    defaultText: "مرفوض",
  },
  CANCELLED: {
    bg: "bg-gray-100 text-gray-500 border-gray-200",
    icon: MinusCircle,
    textKey: "cancelled",
    defaultText: "ملغى",
  },
};

export default function StatusBadge({ status, t }) {
  const current = STATUS_CONFIG[status] || STATUS_CONFIG.PENDING;
  const Icon = current.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full border ${current.bg}`}
    >
      <Icon className="w-3.5 h-3.5 shrink-0" />
      {t?.(current.textKey) || current.defaultText}
    </span>
  );
}
