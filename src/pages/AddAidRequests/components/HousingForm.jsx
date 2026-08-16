import { motion } from "framer-motion";

export function HousingForm({ form, setForm, t }) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-black text-slate-700 mb-1">{t("current_rent")}</label>
          <input
            type="number"
            value={form.currentRent}
            onChange={(e) => setForm({ ...form, currentRent: e.target.value })}
            className="w-full p-3 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white text-sm font-bold"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-black text-slate-700 mb-1">{t("current_housing_situation_ar")}</label>
          <input
            type="text"
            value={form.currentHousingSituationAr}
            onChange={(e) => setForm({ ...form, currentHousingSituationAr: e.target.value })}
            className="w-full p-3 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white text-sm font-bold"
          />
        </div>
        <div>
          <label className="block text-xs font-black text-slate-700 mb-1">{t("current_housing_situation_en")}</label>
          <input
            type="text"
            value={form.currentHousingSituationEn}
            onChange={(e) => setForm({ ...form, currentHousingSituationEn: e.target.value })}
            className="w-full p-3 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white text-sm font-bold"
          />
        </div>
      </div>
    </motion.div>
  );
}