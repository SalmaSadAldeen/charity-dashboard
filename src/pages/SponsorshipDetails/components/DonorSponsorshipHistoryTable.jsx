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

  const getAvatarColor = (id) => {
    const palette = [
      "bg-[#735c00]/15 text-[#735c00]",
      "bg-[#5c630e]/15 text-[#5c630e]",
      "bg-[#3b674c]/15 text-[#3b674c]",
    ];
    return palette[(id || 0) % palette.length];
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "ACCEPTED":
      case "ACTIVE":
        return "bg-[#eefcf4] text-[#1b6b3e] border-[#c8e6d5]";
      case "PENDING":
        return "bg-[#fffcf0] text-[#856404] border-[#ffeeba]";
      case "CANCELLED":
      case "REJECTED":
        return "bg-[#fff0f0] text-[#a94442] border-[#f5c6cb]";
      default:
        return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  return (
    <div className="bg-white p-6 rounded-[2.5rem] space-y-6 mt-3">
      {/* عنوان القسم */}
      <div className="flex items-center justify-between border-b border-border/50 pb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-xl">
              volunteer_activism
            </span>
          </div>
          <div>
            <h3 className="text-xl font-black text-on-surface-variant">
              {t("donorSponsorshipHistory")}
            </h3>
            <p className="text-xs text-on-surface-variant/50 font-medium mt-0.5">
              {t("donorSponsorshipHistorySubtitle")}
            </p>
          </div>
        </div>
        {donor && (
          <span className="text-xs font-black bg-[#f9f7f4] px-4 py-2 rounded-xl text-on-surface-variant border border-border">
            {donor.firstName || ""} {donor.lastName || ""}
          </span>
        )}
      </div>

      {/* الجدول بالتصميم الموحد */}
      <div className="w-full overflow-hidden rounded-2xl border border-border shadow-sm bg-white">
        <table className="w-full border-collapse table-fixed">
          <thead className="bg-[#f9f7f4] border-b border-border">
            <tr className="text-on-surface-variant/90">
              <th className="p-5 text-right font-black uppercase text-[11px] tracking-widest w-[30%]">
                {t("orphanName")}
              </th>
              <th className="p-5 text-center font-black uppercase text-[11px] tracking-widest w-[17%]">
                {t("monthlyAmount")}
              </th>
              <th className="p-5 text-center font-black uppercase text-[11px] tracking-widest w-[18%]">
                {t("sponsorshipStatus")}
              </th>
              <th className="p-5 text-center font-black uppercase text-[11px] tracking-widest w-[18%]">
                {t("startDate")}
              </th>
              <th className="p-5 text-center font-black uppercase text-[11px] tracking-widest w-[17%]">
                {t("cancellationSource")}
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-border bg-white">
            {isLoading ? (
              [...Array(4)].map((_, index) => (
                <tr key={`skeleton-${index}`} className="animate-pulse">
                  <td className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gray-200 shrink-0" />
                      <div className="h-4 bg-gray-200 rounded-lg w-32" />
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <div className="h-7 bg-gray-200 rounded-xl w-16 mx-auto" />
                  </td>
                  <td className="p-4 text-center">
                    <div className="h-7 bg-gray-200 rounded-xl w-20 mx-auto" />
                  </td>
                  <td className="p-4 text-center">
                    <div className="h-7 bg-gray-200 rounded-xl w-24 mx-auto" />
                  </td>
                  <td className="p-4 text-center">
                    <div className="h-7 bg-gray-200 rounded-xl w-16 mx-auto" />
                  </td>
                </tr>
              ))
            ) : isEmpty ? (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-12 text-gray-400 font-medium text-base"
                >
                  <div className="flex flex-col items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-3xl text-gray-300">
                      history_off
                    </span>
                    <span>{t("noDonorHistoryFound")}</span>
                  </div>
                </td>
              </tr>
            ) : (
              historyData.sponsorshipHistory.map((item) => (
                <tr
                  key={item.id}
                  className="group hover:bg-primary-container/5 transition-all text-xs"
                >
                  <td className="p-4 truncate">
                    <div className="flex items-center gap-4">
                      {/* إضافة shrink-0 لمنع انكماش الأفاتار مهما كان طول الاسم */}
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs border shrink-0 ${getAvatarColor(
                          item.id,
                        )}`}
                      >
                        {item.orphan?.firstName?.charAt(0) || "O"}
                      </div>
                      <span className="font-bold text-sm text-on-surface-variant truncate">
                        {item.orphan?.firstName || ""}{" "}
                        {item.orphan?.lastName || ""}
                      </span>
                    </div>
                  </td>

                  <td className="p-4 text-center font-black text-primary truncate">
                    {item.monthlyAmount}
                  </td>

                  <td className="p-4 text-center">
                    <span
                      className={`inline-block px-4 py-1.5 rounded-xl text-[10px] font-black border uppercase ${getStatusStyle(
                        item.status,
                      )}`}
                    >
                      {t(item.status) || item.status}
                    </span>
                  </td>

                  <td className="p-4 text-center text-xs font-bold text-on-surface-variant/70 truncate">
                    {item.startDate
                      ? new Date(item.startDate).toLocaleDateString(
                          lang === "ar" ? "ar-EG" : "en-US",
                        )
                      : "-"}
                  </td>

                  <td className="p-4 text-center text-xs truncate">
                    {item.cancellationSource ? (
                      <span className="inline-block px-3 py-1 bg-[#fdfaf0] text-[#5e5846] rounded-xl font-bold border border-[#f2e9d0]">
                        {item.cancellationSource}
                      </span>
                    ) : (
                      <span className="text-gray-300">-</span>
                    )}
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
