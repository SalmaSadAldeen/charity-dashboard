import { useTranslation } from "@/hooks/useTranslation";

export default function HelpRequestsTable({ data, status, onRowClick }) {
  const { t, lang } = useTranslation();
  const isLoading = status === "loading";
  const isEmpty = !data || data.length === 0;

  return (
    <div className="w-full">
      <table className="w-full border-separate border-spacing-y-2">
        <thead className="text-on-surface-variant/80 text-[12px] uppercase font-black px-6 tracking-[0.2em]">
          <tr>
            <th className="px-6 pb-1 text-start">{t("beneficiary")}</th>
            <th className="px-6 pb-1 text-start">{t("typeAid")}</th>
            <th className="px-6 pb-1 text-center">{t("financialProgress")}</th>
            <th className="px-6 pb-1 text-center">{t("compliance")}</th>
            <th className="px-6 pb-1"></th>
          </tr>
          <tr>
            <td colSpan="5" className="h-px bg-border/90"></td>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <tr
                key={index}
                className="bg-white border border-border/50 shadow-sm rounded-2xl animate-pulse"
              >
                <td className="px-6 py-5">
                  <div className="h-4 bg-gray-200 rounded-lg w-3/4"></div>
                </td>
                <td className="px-6 py-5">
                  <div className="h-6 bg-gray-200 rounded-lg w-24"></div>
                </td>
                <td className="px-6 py-5">
                  <div className="w-32 mx-auto bg-gray-200 rounded-full h-1.5 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-12 mx-auto"></div>
                </td>
                <td className="px-6 py-5 text-center">
                  <div className="h-4 bg-gray-200 rounded w-10 mx-auto"></div>
                </td>
                <td className="px-6 py-5 text-end">
                  <div className="h-8 bg-gray-200 rounded-xl w-24 ml-auto"></div>
                </td>
              </tr>
            ))
          ) : isEmpty ? (
            <tr>
              <td
                colSpan="5"
                className="text-center py-12 text-gray-400 font-medium text-base"
              >
                {t("noData") ||
                  (lang === "ar"
                    ? "لا توجد بيانات متاحة"
                    : "No data available")}
              </td>
            </tr>
          ) : (
            data.map((req) => (
              <tr
                key={req.id}
                className="bg-white border border-border/50 shadow-sm rounded-2xl hover:shadow-[0_8px_20px_rgba(var(--primary-rgb),0.15)] hover:border-primary/35 transition-all duration-300 group"
              >
                <td className="px-6 py-5 font-bold text-on-surface-variant flex items-center gap-2">
                  {req.firstName} {req.lastName}
                  {req.isUrgent && (
                    <span className="bg-error/10 text-error px-2 py-0.5 rounded-lg text-[10px] font-black border border-error/20 animate-pulse">
                      URGENT
                    </span>
                  )}
                </td>
                <td className="px-6 py-5 text-sm text-secondary font-medium">
                  <span className="text-tertiary bg-tertiary/5 px-3 py-1 rounded-lg border border-tertiary/10 font-bold">
                    {t(req?.typeAid?.replace(/\s+/g, "_").toUpperCase())}
                  </span>
                </td>
                <td className="px-6 py-5">
                  <div className="w-32 mx-auto bg-surface rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-primary h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${(req.currentPayment / (req.cost || 1)) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <p className="text-[10px] mt-2 text-center font-black text-on-surface-variant/80">
                    {req.currentPayment} / {req.cost}
                  </p>
                </td>
                <td className="px-6 py-5 text-center font-black text-primary text-sm">
                  {req.compliancePercentage}%
                </td>
                <td className="px-6 py-5 text-end">
                  <button
                    onClick={() => onRowClick(req)}
                    className="bg-white border border-primary/20 text-primary px-5 py-2 rounded-xl text-[11px] font-black uppercase tracking-wider hover:bg-primary hover:text-white transition-all duration-200 shadow-sm cursor-pointer"
                  >
                    {t("view_details")}
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
