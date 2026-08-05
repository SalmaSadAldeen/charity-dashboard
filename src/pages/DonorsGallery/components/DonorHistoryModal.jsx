import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDonorHistory, clearDonorDetails } from "@/store/index";
import { History, CreditCard, HeartHandshake, Wallet, X } from "lucide-react";
import { useDelayedLoading } from "@/hooks/useDelayedLoading";

export default function DonorHistoryModal({ donorId, onClose, t, lang }) {
  const dispatch = useDispatch();
  const { selectedDetails, detailsStatus } = useSelector(
    (state) => state.donors,
  );

  const isReallyLoading = useDelayedLoading(detailsStatus === "loading", 500);

  useEffect(() => {
    if (donorId) {
      dispatch(fetchDonorHistory({ id: donorId, type: "history" }));
    }
    return () => {
      dispatch(clearDonorDetails());
    };
  }, [dispatch, donorId]);

  const historyList = Array.isArray(selectedDetails)
    ? selectedDetails
    : selectedDetails?.data || [];

  const hasExistingData = historyList.length > 0;

  // السكيليتون يظهر فقط بعد التأخير المخصص إذا لم تكن البيانات القديمة موجودة
  const showSkeleton = isReallyLoading && !hasExistingData;

  const isEmpty = detailsStatus === "succeeded" && historyList.length === 0;

  const renderTransactionDetails = (item) => {
    switch (item.type) {
      case "SPONSORSHIP_DONATION":
        return (
          <div className="flex items-center gap-3 truncate">
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
              <HeartHandshake size={18} />
            </div>
            <div className="truncate min-w-0">
              <p className="font-bold text-sm text-on-surface truncate">
                {t("sponsorshipDonation") ||
                  (lang === "ar" ? "كفالة يتيم" : "Sponsorship Donation")}
              </p>
              {item.orphan && (
                <p className="text-xs text-on-surface-variant/90 mt-0.5 truncate">
                  {item.orphan.firstName} {item.orphan.lastName}
                </p>
              )}
            </div>
          </div>
        );

      case "AID_REQUEST_DONATION":
        return (
          <div className="flex items-center gap-3 truncate">
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0">
              <CreditCard size={18} />
            </div>
            <div className="truncate min-w-0">
              <p className="font-bold text-sm text-on-surface truncate">
                {t("aidRequestDonation") ||
                  (lang === "ar" ? "تبرع لطلب مساعدة" : "Aid Request Donation")}
              </p>
              {item.aidRequest?.title && (
                <p className="text-xs text-on-surface-variant/90 mt-0.5 truncate">
                  {lang === "ar"
                    ? item.aidRequest.title.ar
                    : item.aidRequest.title.en}
                </p>
              )}
            </div>
          </div>
        );

      case "WALLET_TOP_UP":
        return (
          <div className="flex items-center gap-3 truncate">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0">
              <Wallet size={18} />
            </div>
            <div className="truncate min-w-0">
              <p className="font-bold text-sm text-on-surface truncate">
                {t("walletTopUp") ||
                  (lang === "ar" ? "شحن محفظة" : "Wallet Top-Up")}
              </p>
            </div>
          </div>
        );

      default:
        return (
          <span className="text-sm font-medium text-on-surface truncate">
            {item.type}
          </span>
        );
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-300"
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      <div className="bg-[#fdfcfa] w-full max-w-3xl h-[85vh] max-h-[700px] rounded-3xl shadow-2xl border border-[#d0c6b0]/40 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="sticky top-0 z-20 bg-gradient-to-r from-[#f5ede0] to-[#fdfcfa] p-6 border-b border-[#d0c6b0]/50 flex items-center justify-between shrink-0 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#735c00]/10 flex items-center justify-center text-[#735c00]">
              <History size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#4d4636]">
                {t("donorFinancialHistory") ||
                  (lang === "ar"
                    ? "السجل المالي للمتبرع"
                    : "Donor Financial History")}
              </h3>
              <p className="text-xs text-[#735c00]/80 font-medium">
                {lang === "ar"
                  ? `معرف المتبرع: ${donorId}`
                  : `Donor ID: ${donorId}`}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-white border border-[#d0c6b0] hover:bg-[#735c00] hover:text-white flex items-center justify-center text-[#735c00] transition-all cursor-pointer shadow-2xs"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 flex-1 overflow-hidden flex flex-col relative">
          <div className="w-full overflow-hidden rounded-2xl border border-border shadow-sm relative flex-1 flex flex-col bg-white">
            <table className="w-full border-collapse table-fixed shrink-0">
              <thead className="bg-[#f9f7f4] border-b border-border">
                <tr className="text-on-surface-variant/90">
                  <th className="p-4 text-start font-black uppercase text-[11px] tracking-widest w-[30%]">
                    {t("amount") || (lang === "ar" ? "المبلغ" : "Amount")}
                  </th>
                  <th className="p-4 text-start font-black uppercase text-[11px] tracking-widest w-[45%]">
                    {t("transactionType") ||
                      (lang === "ar"
                        ? "نوع المعاملة والتفاصيل"
                        : "Transaction Type")}
                  </th>
                  <th className="p-4 text-start font-black uppercase text-[11px] tracking-widest w-[25%]">
                    {t("dateTime") ||
                      (lang === "ar" ? "التاريخ والوقت" : "Date & Time")}
                  </th>
                </tr>
              </thead>
            </table>

            <div className="flex-1 overflow-y-auto relative">
              {detailsStatus === "loading" && hasExistingData && (
                <div className="absolute top-0 inset-x-0 h-1 bg-primary/20 overflow-hidden z-20">
                  <div className="w-full h-full bg-primary animate-indeterminate"></div>
                </div>
              )}

              <table className="w-full border-collapse table-fixed">
                <tbody className="divide-y divide-border bg-white">
                  {showSkeleton ? (
                    [...Array(4)].map((_, i) => (
                      <tr key={`skeleton-${i}`} className="animate-pulse">
                        <td className="p-4 w-[30%]">
                          <div className="h-4 bg-gray-200 rounded-md w-16"></div>
                        </td>
                        <td className="p-4 w-[45%]">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-gray-200 shrink-0"></div>
                            <div className="space-y-2 flex-1">
                              <div className="h-3.5 bg-gray-200 rounded-md w-3/4"></div>
                              <div className="h-2.5 bg-gray-100 rounded-md w-1/2"></div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 w-[25%]">
                          <div className="h-3.5 bg-gray-200 rounded-md w-24"></div>
                        </td>
                      </tr>
                    ))
                  ) : isEmpty ? (
                    <tr>
                      <td
                        colSpan="3"
                        className="text-center py-16 text-gray-400 font-medium"
                      >
                        {t("noFinancialRecords") ||
                          (lang === "ar"
                            ? "لا توجد حركات مالية مسجلة لهذا المتبرع حالياً"
                            : "No financial records found for this donor.")}
                      </td>
                    </tr>
                  ) : (
                    historyList.map((item, index) => (
                      <tr
                        key={index}
                        className="group hover:bg-[#f5ede0]/40 transition-all"
                      >
                        <td className="p-4 font-bold text-primary whitespace-nowrap w-[30%] truncate">
                          {item.amount}{" "}
                          <span className="text-xs font-normal">$</span>
                        </td>
                        <td className="p-4 w-[45%] truncate">
                          {renderTransactionDetails(item)}
                        </td>
                        <td
                          className="p-4 text-xs text-gray-500 font-medium whitespace-nowrap w-[25%] truncate"
                          dir="ltr"
                        >
                          {item.createdAt
                            ? new Date(item.createdAt).toLocaleDateString(
                                lang === "ar" ? "ar-EG" : "en-US",
                                {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                },
                              )
                            : "-"}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 px-6 border-t border-[#d0c6b0]/30 bg-[#f9f7f4] flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-white border border-[#d0c6b0] hover:bg-[#735c00] hover:text-white text-[#735c00] font-medium text-sm transition-all shadow-2xs cursor-pointer"
          >
            {t("close") || (lang === "ar" ? "إغلاق" : "Close")}
          </button>
        </div>
      </div>
    </div>
  );
}