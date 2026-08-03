export default function DonorSponsorshipHistoryTable({
  historyData,
  loading,
  t,
  lang,
}) {
  const isLoading = loading;
  const isEmpty =
    !historyData?.sponsorshipHistory ||
    historyData.sponsorshipHistory.length === 0;
  const donor = historyData?.donor;

  return (
    <div className="bg-surface-lowest p-6 rounded-3xl border border-border shadow-sm space-y-4 mt-6">
      <h3 className="text-lg font-bold text-on-surface-variant flex items-center gap-2">
        {t("donorHistoryAndSponsorships") ||
          (lang === "ar"
            ? "السجل المالي وسجل كفالات المتبرع"
            : "Donor Financial and Sponsorship History")}
        {donor ? `: ${donor.firstName || ""} ${donor.lastName || ""}` : ""}
      </h3>

      <div className="w-full overflow-hidden rounded-2xl border border-border shadow-sm relative bg-surface-lowest backdrop-blur-md flex flex-col">
        <table className="w-full border-collapse table-fixed">
          <thead className="bg-[#f9f7f4] border-b border-border">
            <tr className="text-on-surface-variant/90 text-sm">
              <th className="py-4 px-6 font-semibold w-24 text-start">
                {t("tableId") || "# ID"}
              </th>
              <th className="py-4 px-6 font-semibold text-start">
                {t("orphanName") || "اسم اليتيم"}
              </th>
              <th className="py-4 px-6 font-semibold text-start">
                {t("amount") || "المبلغ"}
              </th>
              <th className="py-4 px-6 font-semibold text-start">
                {t("status") || "الحالة"}
              </th>
              <th className="py-4 px-6 font-semibold text-start">
                {t("cancellationSource") || "مصدر الإلغاء"}
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-border/40 bg-white">
            {isLoading ? (
              [...Array(4)].map((_, index) => (
                <tr key={`skeleton-${index}`} className="animate-pulse">
                  <td className="py-4 px-6">
                    <div className="h-4 bg-gray-200 rounded-md w-8"></div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="h-4 bg-gray-200 rounded-md w-32"></div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="h-4 bg-gray-200 rounded-md w-16"></div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="h-4 bg-gray-200 rounded-md w-20"></div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="h-4 bg-gray-200 rounded-md w-16"></div>
                  </td>
                </tr>
              ))
            ) : isEmpty ? (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-16 text-gray-400 font-medium text-base"
                >
                  {t("noDonorHistoryFound") ||
                    (lang === "ar"
                      ? "لا يوجد سجل كفالات سابق لهذا المتبرع"
                      : "No previous sponsorship history found for this donor")}
                </td>
              </tr>
            ) : (
              historyData.sponsorshipHistory.map((item) => (
                <tr
                  key={item.id}
                  className="group transition-all duration-200 hover:bg-primary/[0.04] text-sm"
                >
                  <td className="py-4 px-6 font-bold text-primary text-start">
                    #{item.id}
                  </td>
                  <td className="py-4 px-6 font-medium text-on-surface text-start">
                    {item.orphan?.firstName || ""} {item.orphan?.lastName || ""}
                  </td>
                  <td className="py-4 px-6 font-semibold text-on-surface-variant text-start">
                    {item.monthlyAmount} $
                  </td>
                  <td className="py-4 px-6 text-start">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold inline-block ${
                        item.status === "ACCEPTED"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {t(item.status) || item.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-xs text-on-surface-variant/70 text-start">
                    {item.cancellationSource || "-"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}