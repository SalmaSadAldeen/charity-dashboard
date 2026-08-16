import { motion } from "framer-motion";

export function SmallProjectsForm({ form, setForm, t }) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-black text-slate-700 mb-1">{t("number_of_people_supported")}</label>
          <input
            type="number"
            value={form.numberOfPeopleSupported}
            onChange={(e) => setForm({ ...form, numberOfPeopleSupported: e.target.value })}
            className="w-full p-3 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white text-sm font-bold"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-black text-slate-700 mb-1">{t("project_name_ar")}</label>
          <input
            type="text"
            value={form.projectNameAr}
            onChange={(e) => setForm({ ...form, projectNameAr: e.target.value })}
            className="w-full p-3 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white text-sm font-bold"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-black text-slate-700 mb-1">{t("project_name_en")}</label>
          <input
            type="text"
            value={form.projectNameEn}
            onChange={(e) => setForm({ ...form, projectNameEn: e.target.value })}
            className="w-full p-3 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white text-sm font-bold"
            required
          />
        </div>
      </div>
    </motion.div>
  );
}