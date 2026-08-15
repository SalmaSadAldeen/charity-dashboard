import { Briefcase } from "lucide-react";

export default function SocioEconomicSection({ formData, onChange, t }) {
  return (
    <div className="space-y-5 p-6 bg-gray-50/50 rounded-3xl border border-gray-100">
      <h3 className="text-base font-bold text-gray-800 flex items-center gap-2 border-b pb-3">
        <Briefcase size={18} className="text-primary" />
        <span>{t("economicStatus") || "Economic Status"}</span>
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        <div>
          <label className="block text-sm font-bold mb-2 text-gray-700">
            {t("monthlyIncome") || "Monthly Income"}{" "}
            <span className="text-gray-400 font-normal text-xs">
              ({t("optional") || "Optional"})
            </span>
          </label>
          <input
            type="number"
            name="monthlyIncome"
            value={formData.monthlyIncome}
            onChange={onChange}
            placeholder="0.00"
            className="w-full border border-gray-200 bg-white p-3.5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary shadow-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
        </div>
        <div>
          <label className="block text-sm font-bold mb-2 text-gray-700">
            {t("numberOfChildren") || "Number Of Children"}{" "}
            <span className="text-gray-400 font-normal text-xs">
              ({t("optional") || "Optional"})
            </span>
          </label>
          <input
            type="number"
            name="numberOfChildren"
            value={formData.numberOfChildren}
            onChange={onChange}
            placeholder="0"
            className="w-full border border-gray-200 bg-white p-3.5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
          />
        </div>

        <div className="flex items-center gap-3 pt-6 md:pt-8">
          <input
            type="checkbox"
            name="isUnemployed"
            checked={formData.isUnemployed}
            onChange={onChange}
            className="w-5 h-5 text-primary rounded-md border-gray-300 focus:ring-primary cursor-pointer"
          />
          <label className="text-sm font-bold text-gray-700 cursor-pointer">
            {t("isUnemployed") || "Is Unemployed"}
          </label>
        </div>
      </div>
    </div>
  );
}
