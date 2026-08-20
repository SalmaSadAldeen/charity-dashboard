import { useTranslation } from "@/hooks/useTranslation";
import { Wallet, ArrowDownRight, ArrowUpRight } from "lucide-react";

export default function QuickAidStats({ summary }) {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-3xl border border-border shadow-sm flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
          <ArrowDownRight size={24} />
        </div>
        <div>
          <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">
            {t("total_donations", "إجمالي التبرعات")}
          </p>
          <h3 className="text-xl font-black text-slate-900 mt-1">
            {summary?.totalDonations || "0.00"}{" "}
            <span className="text-xs text-slate-400 font-bold">
              {summary?.currency || "USD"}
            </span>
          </h3>
        </div>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-border shadow-sm flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
          <ArrowUpRight size={24} />
        </div>
        <div>
          <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">
            {t("total_disbursed", "إجمالي المصروفات")}
          </p>
          <h3 className="text-xl font-black text-slate-900 mt-1">
            {summary?.totalDisbursed || "0.00"}{" "}
            <span className="text-xs text-slate-400 font-bold">
              {summary?.currency || "USD"}
            </span>
          </h3>
        </div>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-border shadow-sm flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
          <Wallet size={24} />
        </div>
        <div>
          <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">
            {t("current_balance", "الرصيد الحالي")}
          </p>
          <h3 className="text-xl font-black text-slate-900 mt-1">
            {summary?.currentBalance || "0.00"}{" "}
            <span className="text-xs text-slate-400 font-bold">
              {summary?.currency || "USD"}
            </span>
          </h3>
        </div>
      </div>
    </div>
  );
}
