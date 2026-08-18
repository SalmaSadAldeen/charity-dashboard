import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchQuickAidDisbursements,
} from "@/store/quickAidSlice";
import { useTranslation } from "@/hooks/useTranslation";
import {
  ChevronLeft,
  ChevronRight,
  Wallet,
  ArrowDownRight,
  ArrowUpRight,
} from "lucide-react";

export default function QuickAidContent({ canCreate, onOpenModal }) {
  const { t, lang } = useTranslation();
  const dispatch = useDispatch();

  const { summary, disbursements, pagination, status } = useSelector(
    (state) => state.quickAid,
  );

  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    dispatch(fetchQuickAidDisbursements({ page: currentPage, limit }));
  }, [dispatch, currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= (pagination?.totalPages || 1)) {
      setCurrentPage(newPage);
    }
  };

  const showSkeleton = status === "loading";

  return (
    <section className="space-y-6" dir={lang === "ar" ? "rtl" : "ltr"}>
      {/* عنوان الصفحة وزر الإنشاء */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-border shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-slate-900">
            {t("quick_aid_fund_title", "صندوق المساعدات العاجلة")}
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            {t("sponsorshipSupportsSubtitle", "سجل مصروفات ودفعات صندوق استمرارية الكفالة")}
          </p>
        </div>

      
      </div>

      {/* بطاقات الإحصائيات */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-border shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <ArrowDownRight size={24} />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
              {t("total_donations", "إجمالي التبرعات")}
            </p>
            <h3 className="text-xl font-black text-slate-900 mt-1">
              {summary?.totalDonations || "0.00"}{" "}
              <span className="text-xs text-slate-400">
                {summary?.currency || "USD"}
              </span>
            </h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-border shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
            <ArrowUpRight size={24} />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
              {t("total_disbursed", "إجمالي المصروفات")}
            </p>
            <h3 className="text-xl font-black text-slate-900 mt-1">
              {summary?.totalDisbursed || "0.00"}{" "}
              <span className="text-xs text-slate-400">
                {summary?.currency || "USD"}
              </span>
            </h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-border shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <Wallet size={24} />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
              {t("current_balance", "الرصيد الحالي")}
            </p>
            <h3 className="text-xl font-black text-slate-900 mt-1">
              {summary?.currentBalance || "0.00"}{" "}
              <span className="text-xs text-slate-400">
                {summary?.currency || "USD"}
              </span>
            </h3>
          </div>
        </div>
      </div>

      {/* جدول العمليات (بدون عرض أي ID نهائياً) */}
      <div className="bg-white rounded-3xl border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="border-b border-border bg-slate-50/70 text-slate-400 text-xs font-black uppercase tracking-wider">
                <th className="p-4 px-6">{t("beneficiaryName", "اسم المستفيد")}</th>
                <th className="p-4">{t("amount", "المبلغ")}</th>
                <th className="p-4">{t("reason", "السبب")}</th>
                <th className="p-4">{t("employeeName", "الموظف المسؤول")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-slate-700 text-sm font-medium">
              {showSkeleton ? (
                <tr>
                  <td colSpan="4" className="p-12 text-center text-slate-400 font-bold">
                    {t("loading", "جاري التحميل...")}
                  </td>
                </tr>
              ) : disbursements && disbursements.length > 0 ? (
                disbursements.map((item, index) => (
                  <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                    {/* اسم المستفيد */}
                    <td className="p-4 px-6 font-bold text-slate-900">
                      {item.beneficiary
                        ? `${item.beneficiary.firstName} ${item.beneficiary.lastName}`
                        : "-"}
                    </td>

                    {/* المبلغ */}
                    <td className="p-4 font-black text-emerald-600">
                      {item.amount}
                    </td>

                    {/* السبب حسب اللغة (عربي أو إنجليزي) */}
                    <td className="p-4 text-slate-500">
                      {lang === "ar"
                        ? item.reason?.ar || item.reason
                        : item.reason?.en || item.reason}
                    </td>

                    {/* اسم الموظف المسؤول */}
                    <td className="p-4 text-slate-500 font-semibold">
                      {item.employee
                        ? `${item.employee.firstName} ${item.employee.lastName}`
                        : "-"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="p-12 text-center text-slate-400 font-bold">
                    {t("noDataFound", "لا توجد بيانات متاحة")}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* باجينيشن الأزرار السهمية */}
        {pagination?.totalPages > 1 && (
          <footer className="p-4 border-t border-border flex items-center justify-between bg-slate-50/50">
            <span className="text-xs font-bold text-slate-500">
              {t("page", "صفحة")} {currentPage} {t("of", "من")} {pagination.totalPages}
            </span>
            <div className="flex items-center gap-2">
              <button
                disabled={currentPage <= 1 || showSkeleton}
                onClick={() => handlePageChange(currentPage - 1)}
                className="p-2.5 rounded-xl border border-border bg-white text-primary hover:bg-primary hover:text-white transition-all shadow-sm disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-primary cursor-pointer"
              >
                {lang === "ar" ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
              </button>

              <button
                disabled={currentPage >= pagination.totalPages || showSkeleton}
                onClick={() => handlePageChange(currentPage + 1)}
                className="p-2.5 rounded-xl border border-border bg-white text-primary hover:bg-primary hover:text-white transition-all shadow-sm disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-primary cursor-pointer"
              >
                {lang === "ar" ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
              </button>
            </div>
          </footer>
        )}
      </div>
    </section>
  );
}