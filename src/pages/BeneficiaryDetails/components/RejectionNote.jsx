import { useTranslation } from "@/hooks/useTranslation";
export default function RejectionNote({ reason }) {
  const { t } = useTranslation();
  return (
    <div className="bg-white p-6 rounded-3xl border-2 border-red-100 shadow-[0_4px_20px_rgba(220,38,38,0.05)]">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 rounded-full bg-red-500" />
        <p className="text-xs font-black text-red-600 uppercase tracking-widest">
          {t("rejectionReason")}
        </p>
      </div>
      <p className="text-gray-800 text-sm font-semibold leading-relaxed">
        {reason}
      </p>
    </div>
  );
}
