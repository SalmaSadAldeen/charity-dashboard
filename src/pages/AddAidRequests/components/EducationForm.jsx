import { motion } from "framer-motion";

export function EducationForm({ form, setForm, t }) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-black text-slate-700 mb-1">{t("academic_achievement")}</label>
          <select
            value={form.academicAchievement}
            onChange={(e) => setForm({ ...form, academicAchievement: e.target.value })}
            className="w-full p-3 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white text-sm font-bold"
          >
            <option value="BACHELOR">BACHELOR</option>
            <option value="SCHOOL">SCHOOL</option>
            <option value="MASTER">MASTER</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-black text-slate-700 mb-1">{t("year")}</label>
          <input
            type="text"
            value={form.year}
            onChange={(e) => setForm({ ...form, year: e.target.value })}
            className="w-full p-3 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white text-sm font-bold"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-black text-slate-700 mb-1">{t("institution_name_ar")}</label>
          <input
            type="text"
            value={form.institutionNameAr}
            onChange={(e) => setForm({ ...form, institutionNameAr: e.target.value })}
            className="w-full p-3 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white text-sm font-bold"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-black text-slate-700 mb-1">{t("institution_name_en")}</label>
          <input
            type="text"
            value={form.institutionNameEn}
            onChange={(e) => setForm({ ...form, institutionNameEn: e.target.value })}
            className="w-full p-3 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white text-sm font-bold"
            required
          />
        </div>
      </div>
    </motion.div>
  );
}