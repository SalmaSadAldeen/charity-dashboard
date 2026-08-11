import { motion } from "framer-motion";

export default function DonationChart({ period, setPeriod, currentData, t }) {
  const dataToRender = Array.isArray(currentData) ? currentData : [];

  const maxAmount = Math.max(
    ...dataToRender.map((item) => item.amount || 0),
    1,
  );

  return (
    <div className="lg:col-span-2 bg-surface-lowest p-8 rounded-3xl border border-border shadow-sm flex flex-col h-full">
      <div className="flex justify-between items-center mb-8">
        <h4 className="font-bold text-lg">{t("donationDist")}</h4>
        <div className="bg-surface-container p-1 rounded-lg flex border border-border">
          <button
            onClick={() => setPeriod("monthly")}
            className={`px-4 py-1 rounded-md text-xs font-bold transition-all ${
              period === "monthly"
                ? "bg-primary text-white"
                : "text-on-surface-variant"
            }`}
          >
            {t("monthly")}
          </button>
          <button
            onClick={() => setPeriod("annual")}
            className={`px-4 py-1 rounded-md text-xs font-bold transition-all ${
              period === "annual"
                ? "bg-primary text-white"
                : "text-on-surface-variant"
            }`}
          >
            {t("yearly")}
          </button>
        </div>
      </div>

      <div className="h-64 flex items-end justify-between gap-3 px-2 flex-1">
        {dataToRender.map((item, i) => {
          const percentage = (item.amount / maxAmount) * 100;
          const label = item.year || item.month; // عرض السنة أو الشهر حسب الـ API

          return (
            <div
              key={i}
              className="flex-1 flex flex-col items-center justify-end h-full group relative"
            >
              {/* Tooltip يوضح المبلغ عند الوقوف على العمود */}
              <div className="absolute -top-8 opacity-0 group-hover:opacity-150 transition-opacity bg-black text-white text-[10px] px-2 py-1 rounded">
                ${item.amount?.toLocaleString()}
              </div>

              <motion.div
                key={`${period}-${label}`}
                initial={{ height: 0 }}
                animate={{ height: `${Math.max(percentage, 5)}%` }} // 5% كحد أدنى ليظهر العمود الصغير
                whileHover={{
                  scaleX: 1.1,
                  backgroundColor: "#1f1b14",
                  opacity: 0.9,
                }}
                className="w-full rounded-t-lg bg-gradient-to-t from-[#735c00] to-[#fad564]"
              />
              <span className="mt-4 text-[10px] font-bold text-on-surface-variant">
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
