import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDonorHistory, clearDonorDetails } from "@/store/index";
import { useDelayedLoading } from "@/hooks/useDelayedLoading";
import { History, CreditCard, HeartHandshake, Wallet, X } from "lucide-react";

export default function DonorHistoryModal({
  donorId,
  onClose,
  t,
  lang,
  status,
}) {
  const dispatch = useDispatch();

  const { selectedDetails } = useSelector((state) => state.donors);

  const historyList = Array.isArray(selectedDetails)
    ? selectedDetails
    : selectedDetails?.data || [];

  useEffect(() => {
    if (donorId) {
      dispatch(fetchDonorHistory({ id: donorId }));
    }
    return () => {
      dispatch(clearDonorDetails());
    };
  }, [dispatch, donorId]);

  const isLoadingState = status === "loading" || !selectedDetails;
  const isReallyLoading = useDelayedLoading(isLoadingState, 300);

  if (isReallyLoading) {
    return null;
  }

  // لن تظهر رسالة الفراغ إلا إذا أكمل الطلب نجاحاً (succeeded أو ما عاد في تحميل) وكانت القائمة فارغة حقاً
  const isEmpty = status === "succeeded" && historyList.length === 0;

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
      <div className="bg-surface-lowest w-full max-w-3xl h-[85vh] max-h-[700px] rounded-3xl shadow-2xl border border-border flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-border flex items-center justify-between bg-surface-lowest shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <History size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-on-surface">
                {t("donorFinancialHistory") ||
                  (lang === "ar"
                    ? "السجل المالي للمتبرع"
                    : "Donor Financial History")}
              </h3>
              <p className="text-xs text-on-surface-variant/80">
                {lang === "ar"
                  ? `معرف المتبرع: ${donorId}`
                  : `Donor ID: ${donorId}`}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-surface hover:bg-surface-variant/20 flex items-center justify-center text-on-surface-variant transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 flex-1 overflow-hidden flex flex-col">
          <div className="w-full overflow-hidden rounded-2xl border border-border shadow-sm relative flex-1 flex flex-col bg-white">
            {/* Table Header */}
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

            {/* Table Body */}
            <div className="flex-1 overflow-y-auto">
              <table className="w-full border-collapse table-fixed">
                <tbody className="divide-y divide-border bg-white">
                  {isEmpty ? (
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
                        className="group hover:bg-primary-container/5 transition-all"
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
        <div className="p-4 px-6 border-t border-border bg-surface/30 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-surface-variant/25 hover:bg-surface-variant/40 text-on-surface font-medium text-sm transition-colors"
          >
            {t("close") || (lang === "ar" ? "إغلاق" : "Close")}
          </button>
        </div>
      </div>
    </div>
  );
}
