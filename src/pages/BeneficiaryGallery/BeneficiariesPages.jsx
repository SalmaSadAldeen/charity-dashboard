import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBeneficiaries } from "@/store/index";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import BeneficiaryTable from "./components/BeneficiaryTable";
import { useNavigate, useSearchParams } from "react-router-dom";
import FilterBar from "@/pages/Dashboard/components/FilterBar";
import { fetchBeneficiaryStats } from "@/store/dashboardSlice";
import StatsOverview from "@/pages/BeneficiaryGallery/StatsOverview";
import { Clock, CheckCircle, XCircle } from "lucide-react";
import { useDelayedLoading } from "@/hooks/useDelayedLoading";

export default function BeneficiariesPage() {
  const { t, lang } = useTranslation();
  const dispatch = useDispatch();

  const { beneficiariesStats } = useSelector((state) => state.dashboard);
  const {
    items: beneficiaries,
    status,
    pagination,
  } = useSelector((state) => state.beneficiaries);

  const [searchParams, setSearchParams] = useSearchParams();
  const currentStatus = searchParams.get("status") || null;
  const currentPage = Number(searchParams.get("page")) || 1;
  const ITEMS_PER_PAGE = 5;
  const navigate = useNavigate();

  // تتبع حالة ما إذا تم انتهاء أول عملية جلب للبيانات لضمان استقرار العرض
  const [hasLoadedAtLeastOnce, setHasLoadedAtLeastOnce] = useState(false);

  useEffect(() => {
    dispatch(fetchBeneficiaryStats());
  }, [dispatch]);

  useEffect(() => {
    setHasLoadedAtLeastOnce(false);
    dispatch(
      fetchBeneficiaries({
        status: currentStatus || "",
        page: currentPage,
        limit: ITEMS_PER_PAGE,
      }),
    ).then(() => {
      setHasLoadedAtLeastOnce(true);
    });
  }, [currentStatus, currentPage, lang, dispatch]);

  const isReallyLoading = useDelayedLoading(status === "loading", 500);

  // هل يجب عرض السكيليتون؟
  const showSkeleton = isReallyLoading || !hasLoadedAtLeastOnce;

  const handleFilterChange = (val) => {
    const params = new URLSearchParams(searchParams);
    if (val) {
      params.set("status", val);
    } else {
      params.delete("status");
    }
    params.set("page", "1");
    setSearchParams(params);
  };

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(newPage));
    setSearchParams(params);
  };

  const filters = [
    { label: t("all"), value: null },
    { label: t("pending"), value: "PENDING", icon: <Clock size={16} /> },
    {
      label: t("accepted"),
      value: "ACCEPTED",
      icon: <CheckCircle size={16} />,
    },
    { label: t("rejected"), value: "REJECTED", icon: <XCircle size={16} /> },
  ];

  return (
    <div className="p-8 w-full min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex justify-between items-end border-b border-border pb-6">
          <div className="flex flex-col">
            <h2 className="text-3xl font-black text-on-surface-variant tracking-tight">
              {t("beneficiariesList")}
            </h2>
            <p className="text-sm text-gray-500 mt-2 font-medium">
              {t("manageAndReviewBeneficiaries")}
            </p>
          </div>
        </header>

        {beneficiariesStats && (
          <section>
            <StatsOverview stats={beneficiariesStats} />
          </section>
        )}

        <section className="bg-surface-lowest p-6 rounded-3xl shadow-sm border border-border">
          <div className="mb-8">
            <FilterBar
              filters={filters}
              active={currentStatus}
              onFilterChange={handleFilterChange}
            />
          </div>

          <div className="relative min-h-[300px] flex flex-col">
            {/* تمرير حالة التحميل الحقيقية والمكون الحقيقي للجدول لكي يحتفظ بالهيد الأصلي الخاص به */}
            <BeneficiaryTable
              data={beneficiaries}
              isLoading={showSkeleton}
              onRowClick={(item) =>
                navigate(
                  `/dashboard/beneficiaries/${item.id}?${searchParams.toString()}`,
                )
              }
            />
          </div>

          {pagination?.lastPage > 1 && (
            <footer className="flex justify-between items-center mt-8 pt-6 border-t border-border">
              <span className="text-xs font-bold text-on-surface-variant opacity-60">
                {t("showing")} {currentPage} {t("from")} {pagination.lastPage}
              </span>

              <div className="flex items-center gap-2">
                <button
                  disabled={currentPage === 1 || status === "loading"}
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
                  disabled={
                    currentPage >= pagination.lastPage || status === "loading"
                  }
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
      </div>
    </div>
  );
}
