import { motion } from "framer-motion";

export function FoodForm({ form, setForm, t }) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-black text-slate-700 mb-1">{t("number_individuals")}</label>
          <input
            type="number"
            value={form.numberIndividuals}
            onChange={(e) => setForm({ ...form, numberIndividuals: e.target.value })}
            className="w-full p-3 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white text-sm font-bold"
            required
          />
        </div>
      </div>
    </motion.div>
  );
}