import { DetailRow } from "./DetailRow";
import { useTranslation } from "@/hooks/useTranslation";

export default function FinancialCard({ data }) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col h-full">
      <div
        className="bg-white p-8 rounded-[2rem] border border-border/30 shadow-[0_8px_30px_rgb(0,0,0,0.04)] 
                      hover:border-border hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] 
                      transition-all duration-500 ease-out flex-grow flex flex-col"
      >
        <h3 className="text-xl font-black text-primary mb-8 border-b border-gray-100 pb-4">
          {t("familyInfo")}
        </h3>

        {/* توزيع الصفوف بالتساوي لملء الفراغ */}
        <div className="flex flex-col flex-grow justify-around">
          <DetailRow
            label={t("socialStatus")}
            value={t(data?.socialStatus || "N/A")}
          />
          <DetailRow
            label={t("siblingsCount")}
            value={data?.numberOfChildren ?? 0}
          />
          <DetailRow
            label={t("monthlyIncome")}
            value={`${data?.monthlyIncome || 0} $`}
          />
          {/* البيانات المضافة حديثاً */}
          <DetailRow
            label={t("isUnemployed")}
            value={data?.isUnemployed ? t("yes") : t("no")}
          />
        </div>
      </div>
    </div>
  );
}
