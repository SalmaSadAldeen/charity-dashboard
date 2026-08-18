import { motion } from "framer-motion";

export function HousingForm({ form, setForm, t }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      {/* SubCategory Selection الخاصة بالسكن */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-black text-slate-700 mb-1">
            {t("sub_category")}
          </label>
          <select
            value={form.subCategoryId || ""}
            onChange={(e) =>
              setForm({ ...form, subCategoryId: Number(e.target.value) })
            }
            className="w-full p-3 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white text-sm font-bold"
            required
          >
            <option value="" disabled>
              {t("select_sub_category")}
            </option>
            <option value={1}>{t("home_insurance")}</option>
            <option value={2}>{t("rent_assistance")}</option>
            <option value={3}>{t("home_repairs")}</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-black text-slate-700 mb-1">
            {t("current_rent")}
          </label>
          <input
            type="number"
            value={form.currentRent || ""}
            onChange={(e) => setForm({ ...form, currentRent: e.target.value })}
            className="w-full p-3 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white text-sm font-bold"
          />
        </div>
      </div>

      {/* الوضع الحالي للسكن */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-black text-slate-700 mb-1">
            {t("current_housing_situation_ar")}
          </label>
          <input
            type="text"
            value={form.currentHousingSituationAr || ""}
            onChange={(e) =>
              setForm({ ...form, currentHousingSituationAr: e.target.value })
            }
            className="w-full p-3 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white text-sm font-bold"
          />
        </div>
        <div>
          <label className="block text-xs font-black text-slate-700 mb-1">
            {t("current_housing_situation_en")}
          </label>
          <input
            type="text"
            value={form.currentHousingSituationEn || ""}
            onChange={(e) =>
              setForm({ ...form, currentHousingSituationEn: e.target.value })
            }
            className="w-full p-3 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white text-sm font-bold"
          />
        </div>
      </div>

      {/* مكان الإقامة الحالي */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-black text-slate-700 mb-1">
            {t("current_place_of_residence_ar")}
          </label>
          <input
            type="text"
            value={form.currentPlaceOfResidenceAr || ""}
            onChange={(e) =>
              setForm({ ...form, currentPlaceOfResidenceAr: e.target.value })
            }
            className="w-full p-3 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white text-sm font-bold"
          />
        </div>
        <div>
          <label className="block text-xs font-black text-slate-700 mb-1">
            {t("current_place_of_residence_en")}
          </label>
          <input
            type="text"
            value={form.currentPlaceOfResidenceEn || ""}
            onChange={(e) =>
              setForm({ ...form, currentPlaceOfResidenceEn: e.target.value })
            }
            className="w-full p-3 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white text-sm font-bold"
          />
        </div>
      </div>

      {/* سبب القفل / الإغلاق (reasonForLock) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-black text-slate-700 mb-1">
            {t("reason_for_lock_ar")}
          </label>
          <input
            type="text"
            value={form.reasonForLockAr || ""}
            onChange={(e) =>
              setForm({ ...form, reasonForLockAr: e.target.value })
            }
            className="w-full p-3 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white text-sm font-bold"
          />
        </div>
        <div>
          <label className="block text-xs font-black text-slate-700 mb-1">
            {t("reason_for_lock_en")}
          </label>
          <input
            type="text"
            value={form.reasonForLockEn || ""}
            onChange={(e) =>
              setForm({ ...form, reasonForLockEn: e.target.value })
            }
            className="w-full p-3 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white text-sm font-bold"
          />
        </div>
      </div>

      {/* مواصفات الإسكان (housingSpecifications) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-black text-slate-700 mb-1">
            {t("housing_specifications_ar")}
          </label>
          <input
            type="text"
            value={form.housingSpecificationsAr || ""}
            onChange={(e) =>
              setForm({ ...form, housingSpecificationsAr: e.target.value })
            }
            className="w-full p-3 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white text-sm font-bold"
          />
        </div>
        <div>
          <label className="block text-xs font-black text-slate-700 mb-1">
            {t("housing_specifications_en")}
          </label>
          <input
            type="text"
            value={form.housingSpecificationsEn || ""}
            onChange={(e) =>
              setForm({ ...form, housingSpecificationsEn: e.target.value })
            }
            className="w-full p-3 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white text-sm font-bold"
          />
        </div>
      </div>
    </motion.div>
  );
}
