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

  const getStatusBadge = (status) => {
    switch (status) {
      case "ACCEPTED":
      case "ACTIVE":
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1.5 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            {t("active") || status}
          </span>
        );
      case "PENDING":
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200 flex items-center gap-1.5 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
            {t("pending") || status}
          </span>
        );
      case "CANCELLED":
      case "REJECTED":
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200 flex items-center gap-1.5 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
            {t("cancelled") || status}
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200 inline-block">
            {t(status) || status}
          </span>
        );
    }
  };

  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/50 space-y-5 mt-6">
      {/* عنوان القسم */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-xl">
              volunteer_activism
            </span>
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800">
              {t("donorSponsorshipHistory")}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {t("donorSponsorshipHistorySubtitle")}
            </p>
          </div>
        </div>
        {donor && (
          <span className="text-sm font-semibold bg-slate-50 px-4 py-2 rounded-xl text-slate-600 border border-slate-100">
            {donor.firstName || ""} {donor.lastName || ""}
          </span>
        )}
      </div>

      {/* الجدول */}
      <div className="w-full overflow-hidden rounded-2xl border border-slate-100 shadow-sm bg-white">
        <table className="w-full border-collapse">
          <thead className="bg-slate-50/70 border-b border-slate-100">
            <tr className="text-slate-500 text-xs uppercase tracking-wider font-semibold">
              <th className="py-4 px-6 text-start">{t("orphanName")}</th>
              <th className="py-4 px-6 text-start">{t("monthlyAmount")}</th>
              <th className="py-4 px-6 text-start">{t("sponsorshipStatus")}</th>
              <th className="py-4 px-6 text-start">{t("startDate")}</th>
              <th className="py-4 px-6 text-start">
                {t("cancellationSource")}
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {isLoading ? (
              [...Array(4)].map((_, index) => (
                <tr key={`skeleton-${index}`} className="animate-pulse">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-slate-200 rounded-full"></div>
                      <div className="h-4 bg-slate-200 rounded-md w-32"></div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="h-4 bg-slate-200 rounded-md w-16"></div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="h-6 bg-slate-200 rounded-full w-20"></div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="h-4 bg-slate-200 rounded-md w-24"></div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="h-4 bg-slate-200 rounded-md w-16"></div>
                  </td>
                </tr>
              ))
            ) : isEmpty ? (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-16 text-slate-400 font-medium text-sm"
                >
                  <div className="flex flex-col items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-3xl text-slate-300">
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
                  className="group transition-all duration-150 hover:bg-slate-50/80 text-sm"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-slate-100 text-slate-500 font-bold flex items-center justify-center text-xs group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                        {item.orphan?.firstName?.[0] || "O"}
                      </div>
                      <span className="font-semibold text-slate-800">
                        {item.orphan?.firstName || ""}{" "}
                        {item.orphan?.lastName || ""}
                      </span>
                    </div>
                  </td>

                  <td className="py-4 px-6 font-bold text-slate-700">
                    <span className="text-primary">{item.monthlyAmount}</span>
                  </td>

                  <td className="py-4 px-6">{getStatusBadge(item.status)}</td>

                  <td className="py-4 px-6 text-xs text-slate-500 font-medium">
                    {item.startDate
                      ? new Date(item.startDate).toLocaleDateString(
                          lang === "ar" ? "ar-EG" : "en-US",
                        )
                      : "-"}
                  </td>

                  <td className="py-4 px-6 text-xs text-slate-500">
                    {item.cancellationSource ? (
                      <span className="bg-slate-100 px-2.5 py-1 rounded-md text-slate-600 font-medium">
                        {item.cancellationSource}
                      </span>
                    ) : (
                      <span className="text-slate-300">-</span>
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
