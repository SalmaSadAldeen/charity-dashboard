import { useTranslation } from "@/hooks/useTranslation";

export default function SponsorshipCoveragesTable({
  data,
  isLoading,
  onOrphanClick,
}) {
  const { t, lang } = useTranslation();

  const getAvatarColor = (id) => {
    const palette = [
      "bg-[#735c00]/15 text-[#735c00]",
      "bg-[#5c630e]/15 text-[#5c630e]",
      "bg-[#3b674c]/15 text-[#3b674c]",
    ];
    return palette[(id || 0) % palette.length];
  };

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-border shadow-sm">
      <table className="w-full border-collapse table-fixed">
        <thead className="bg-[#f9f7f4] border-b border-border">
          <tr className="text-on-surface-variant/90">
            <th className="p-4 text-left font-black uppercase text-[11px] tracking-widest w-[28%]">
              {t("orphanName")}
            </th>
            <th className="p-4 text-center font-black uppercase text-[11px] tracking-widest w-[14%]">
              {t("originalAmount")}
            </th>
            <th className="p-4 text-center font-black uppercase text-[11px] tracking-widest w-[14%]">
              {t("monthlySupport")}
            </th>
            <th className="p-4 text-center font-black uppercase text-[11px] tracking-widest w-[14%]">
              {t("supportedMonths")}
            </th>
            <th className="p-4 text-center font-black uppercase text-[11px] tracking-widest w-[14%]">
              {t("status")}
            </th>
            <th className="p-4 text-center font-black uppercase text-[11px] tracking-widest w-[16%]">
              {t("reason")}
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border bg-white">
          {isLoading ? (
            [...Array(5)].map((_, index) => (
              <tr key={index} className="animate-pulse">
                <td className="p-4 text-left">
                  <div className="flex items-center gap-3 justify-start">
                    <div className="w-9 h-9 rounded-xl bg-gray-200 shrink-0" />
                    <div className="h-4 bg-gray-200 rounded-lg w-28" />
                  </div>
                </td>
                <td className="p-4 text-center">
                  <div className="h-5 bg-gray-200 rounded-xl w-12 mx-auto" />
                </td>
                <td className="p-4 text-center">
                  <div className="h-5 bg-gray-200 rounded-xl w-12 mx-auto" />
                </td>
                <td className="p-4 text-center">
                  <div className="h-5 bg-gray-200 rounded-xl w-10 mx-auto" />
                </td>
                <td className="p-4 text-center">
                  <div className="h-6 bg-gray-200 rounded-xl w-16 mx-auto" />
                </td>
                <td className="p-4 text-center">
                  <div className="h-4 bg-gray-200 rounded-xl w-20 mx-auto" />
                </td>
              </tr>
            ))
          ) : data && data.length > 0 ? (
            data.map((item) => (
              <tr
                key={item.id}
                className="group hover:bg-primary-container/5 transition-all"
              >
                <td className="p-4 text-left truncate">
                  <div
                    className="flex items-center gap-3 justify-start cursor-pointer"
                    onClick={() => onOrphanClick(item.orphanId)}
                  >
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-xs border shrink-0 ${getAvatarColor(
                        item.orphanId,
                      )}`}
                    >
                      {item.orphan?.firstName?.charAt(0) || "O"}
                    </div>
                    <span className="font-bold text-sm text-primary hover:underline truncate">
                      {item.orphan?.firstName} {item.orphan?.lastName}
                    </span>
                  </div>
                </td>

                <td className="p-4 text-center font-semibold text-sm text-on-surface-variant truncate">
                  {item.originalAmount}
                </td>

                <td className="p-4 text-center font-semibold text-sm text-on-surface-variant truncate">
                  {item.monthlySupport}
                </td>

                <td className="p-4 text-center font-semibold text-sm text-on-surface-variant truncate">
                  {item.supportedMonths}
                </td>

                <td className="p-4 text-center">
                  <span
                    className={`inline-block px-3 py-1 rounded-xl text-[10px] font-black border uppercase tracking-wider ${
                      item.status === "ACTIVE"
                        ? "bg-[#eefcf4] text-[#1b6b3e] border-[#c8e6d5]"
                        : "bg-gray-50 text-gray-600 border-gray-200"
                    }`}
                  >
                    {t(item.status)}
                  </span>
                </td>

                <td
                  className="p-4 text-center text-gray-500 font-medium text-xs truncate"
                  title={item.reason ? t(item.reason) : "-"}
                >
                  {item.reason ? t(item.reason) : "-"}
                </td>
              </tr>
            ))
          ) : !isLoading && data && data.length === 0 ? (
            <tr>
              <td
                colSpan="6"
                className="text-center py-12 text-gray-400 font-medium text-base"
              >
                {t("noData") ||
                  (lang === "ar"
                    ? "لا توجد بيانات متاحة"
                    : "No data available")}
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </div>
  );
}
