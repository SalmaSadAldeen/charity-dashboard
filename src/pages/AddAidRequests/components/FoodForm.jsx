import { motion } from "framer-motion";

export function FoodForm({ form, setForm, t }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="space-y-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* نوع المساعدة الغذائية إذا كان مطلوباً */}
        <div>
          <label className="block text-xs font-black text-slate-700 mb-1">
            {t("type_aid")}
          </label>
          <select
            value={form.typeAid || ""}
            onChange={(e) => setForm({ ...form, typeAid: e.target.value })}
            className="w-full p-3 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white text-sm font-bold"
            required
          >
            <option value="" disabled>
              {t("select_sub_category")}
            </option>
            {/* خيارات الغذاء الصحيحة */}
            <option value="FOOD_BASKET">{t("FOOD_BASKET")}</option>
            <option value="BABY_MILK">{t("BABY_MILK")}</option>
          </select>
        </div>

        {/* عدد الأفراد */}
        <div>
          <label className="block text-xs font-black text-slate-700 mb-1">
            {t("number_individuals")}
          </label>
          <input
            type="number"
            value={form.numberIndividuals || ""}
            onChange={(e) => setForm({ ...form, numberIndividuals: e.target.value })}
            className="w-full p-3 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white text-sm font-bold"
            required
          />
        </div>
      </div>
    </motion.div>
  );
}