import { motion } from "framer-motion";

export default function DonationChart({ view, setView, currentData, t }) {
  const dataToRender = Array.isArray(currentData) ? currentData : [];

  return (
    <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-border shadow-sm">
      <div className="flex justify-between items-center mb-8">
        <h4 className="font-bold text-lg">{t("donationDist")}</h4>
        <div className="bg-surface-container p-1 rounded-lg flex border border-border">
          <button
            onClick={() => setView("weekly")}
            className={`px-4 py-1 rounded-md text-xs font-bold transition-all ${view === "weekly" ? "bg-primary text-white" : "text-on-surface-variant"}`}
          >
            {t("weekly")}
          </button>
          <button
            onClick={() => setView("yearly")}
            className={`px-4 py-1 rounded-md text-xs font-bold transition-all ${view === "yearly" ? "bg-primary text-white" : "text-on-surface-variant"}`}
          >
            {t("yearly")}
          </button>
        </div>
      </div>

      <div className="h-64 flex items-end justify-between gap-3 px-2">
        {dataToRender.map((item, i) => (
          <div
            key={i}
            className="flex-1 flex flex-col items-center justify-end h-full group"
          >
            <motion.div
              key={`${view}-${item.day}`}
              initial={{ height: 0 }}
              animate={{ height: `${item.val}%` }}
              whileHover={{
                scaleX: 1.1,
                backgroundColor: "#1f1b14",
                opacity: 0.9,
              }}
              className="w-full rounded-t-lg bg-gradient-to-t from-[#735c00] to-[#fad564]"
            />
            <span className="mt-4 text-[10px] font-bold text-on-surface-variant">
              {item.day}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
