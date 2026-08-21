import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";
import {
  fetchQuickAidSummary,
  fetchQuickAidDisbursements,
} from "@/store/quickAidSlice";
import { hasPermission } from "@/utils/permissions";
import { useDelayedLoading } from "@/hooks/useDelayedLoading";

import QuickAidStats from "./components/QuickAidStats";
import QuickAidTable from "./components/QuickAidTable";
import QuickAidModal from "./components/QuickAidModal"; // تعديل المسار حسب مكان المودال لديكِ
import { ChevronLeft, ChevronRight } from "lucide-react";

const ITEMS_PER_PAGE = 4;

export default function QuickAidPage() {
  const { t, lang } = useTranslation();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const roles = useSelector(
    (state) => state.auth.roles || state.auth.permissions || [],
  );

  const canRead = hasPermission(roles, "read:quick_aid_fund");
  const canCreate = hasPermission(roles, "create:quick_aid_disbursements");

  const { summary, disbursements, pagination, status } = useSelector(
    (state) =>
      state.quickAid || {
        disbursements: [],
        status: "idle",
        pagination: {},
      },
  );

  const hasExistingItems =
    Array.isArray(disbursements) && disbursements.length > 0;
  const isReallyLoading = useDelayedLoading(status === "loading", 500);
  const showSkeleton = isReallyLoading && !hasExistingItems;

  useEffect(() => {
    if (canRead) {
      dispatch(fetchQuickAidSummary());
      dispatch(
        fetchQuickAidDisbursements({
          page: currentPage,
          limit: ITEMS_PER_PAGE,
        }),
      );
    }
  }, [dispatch, canRead, currentPage, lang]);

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(newPage));
    setSearchParams(params);
  };

  if (!canRead) {
    return (
      <div className="p-12 text-center text-red-500 font-semibold text-lg">
        {t("unauthorizedAccess") ||
          "ليس لديك الصلاحية لعرض صفحة صندوق المساعدات العاجلة"}
      </div>
    );
  }

  const lastPage = pagination?.lastPage || pagination?.totalPages || 1;

  return (
    <div className="p-8 w-full min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <header className="flex justify-between items-end border-b border-border pb-6">
          <div className="flex flex-col">
            <h2 className="text-3xl font-black text-on-surface-variant tracking-tight">
              {t("quick_aid_fund_title", "صندوق المساعدات العاجلة")}
            </h2>
            <p className="text-sm text-gray-500 mt-2 font-medium">
              {t(
                "sponsorshipSupportsSubtitle",
                "سجل مصروفات ودفعات صندوق استمرارية الكفالة",
              )}
            </p>
          </div>
          {/* {canCreate && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-primary text-white px-5 py-3 rounded-2xl font-black text-sm shadow-sm hover:bg-primary/90 transition-all cursor-pointer"
            >
              <Plus size={18} />
              {t("create_disbursement", "إنشاء صرف جديد")}
            </button>
          )} */}
        </header>

        {/* 1. قسم الإحصائيات (منفصل) */}
        <QuickAidStats summary={summary} />

        {/* 2. قسم الجدول والباجينيشن */}
        <section className="bg-surface-lowest p-6 rounded-3xl shadow-sm border border-border">
          <div className="relative min-h-[300px] flex flex-col">
            <QuickAidTable
              disbursements={disbursements}
              isLoading={showSkeleton}
            />
          </div>

          {/* Pagination */}
          {lastPage > 1 && (
            <footer className="flex justify-between items-center mt-8 pt-6 border-t border-border">
              <span className="text-xs font-bold text-on-surface-variant opacity-60">
                {t("showing", "عرض")} {currentPage} {t("from", "من")} {lastPage}
              </span>
              <div className="flex items-center gap-2">
                <button
                  disabled={currentPage === 1 || showSkeleton}
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="p-2.5 rounded-xl border border-border bg-surface-lowest text-primary hover:bg-primary hover:text-white transition-all shadow-sm disabled:opacity-30 cursor-pointer"
                >
                  {lang === "ar" ? (
                    <ChevronRight size={18} />
                  ) : (
                    <ChevronLeft size={18} />
                  )}
                </button>
                <button
                  disabled={currentPage >= lastPage || showSkeleton}
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="p-2.5 rounded-xl border border-border bg-surface-lowest text-primary hover:bg-primary hover:text-white transition-all shadow-sm disabled:opacity-30 cursor-pointer"
                >
                  {lang === "ar" ? (
                    <ChevronLeft size={18} />
                  ) : (
                    <ChevronRight size={18} />
                  )}
                </button>
              </div>
            </footer>
          )}
        </section>

        {/* Modal */}
        <QuickAidModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </div>
  );
}
