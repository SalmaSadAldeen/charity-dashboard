import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSponsorships } from "@/store/index";
import { useTranslation } from "@/hooks/useTranslation";
import SponsorshipCard from "./components/SponsorshipCard";
import FilterBar from "@/pages/Dashboard/components/FilterBar";
import { useDelayedLoading } from "@/hooks/useDelayedLoading";
import { useSearchParams } from "react-router-dom";
import {
  Clock,
  CheckCircle,
  XCircle,
  LayoutGrid,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import SponsorshipsStatsCard from "./components/SponsorshipsStatsCard";
import { fetchSponsorshipsStats } from "@/store/dashboardSlice";

const ITEMS_PER_PAGE = 4;

export default function SponsorshipsPage() {
  const dispatch = useDispatch();
  const { t, lang } = useTranslation();

  const {
    items: sponsorships,
    status,
    pagination,
  } = useSelector((state) => state.sponsorships);
  const { sponsorshipsStats } = useSelector((state) => state.dashboard);

  const [searchParams, setSearchParams] = useSearchParams();
  const currentStatus = searchParams.get("status") || "";
  const currentPage = Number(searchParams.get("page")) || 1;

  const isReallyLoading = useDelayedLoading(status === "loading", 100);
  const hasExistingItems =
    Array.isArray(sponsorships) && sponsorships.length > 0;

  const [hasLoadedAtLeastOnce, setHasLoadedAtLeastOnce] =
    useState(hasExistingItems);

  useEffect(() => {
    if (!hasExistingItems) {
      setHasLoadedAtLeastOnce(false);
    }

    dispatch(
      fetchSponsorships({
        page: currentPage,
        limit: ITEMS_PER_PAGE,
        status: currentStatus,
      }),
    ).then(() => {
      setHasLoadedAtLeastOnce(true);
    });
  }, [lang, currentStatus, currentPage, dispatch]);

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

  useEffect(() => {
    dispatch(fetchSponsorshipsStats());
  }, [dispatch]);

  const filters = [
    { label: t("all") || "الكل", value: "", icon: <LayoutGrid size={16} /> },
    {
      label: t("ACCEPTED"),
      value: "ACCEPTED",
      icon: <CheckCircle size={16} />,
    },
    { label: t("PENDING"), value: "PENDING", icon: <Clock size={16} /> },
    { label: t("REJECTED"), value: "REJECTED", icon: <XCircle size={16} /> },
    {
      label: t("cancel") || t("CANCELLED"),
      value: "CANCELLED",
      icon: <XCircle size={16} />,
    },
  ];

  const showSkeleton =
    isReallyLoading && (!hasLoadedAtLeastOnce || !hasExistingItems);

  const lastPage =
    pagination?.lastPage ||
    pagination?.totalPages ||
    pagination?.last_page ||
    1;

  return (
    <div
      className="p-6 max-w-7xl mx-auto space-y-6"
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      <div>
        <h1 className="text-2xl font-black text-on-surface-variant">
          {t("sponsorships")}
        </h1>
        <p className="text-sm text-on-surface-variant/70 mt-1">
          {t("sponsorshipsDescription")}
        </p>
      </div>
      <div className="mb-6">
        <SponsorshipsStatsCard stats={sponsorshipsStats} t={t} />{" "}
      </div>
      <FilterBar
        filters={filters}
        active={currentStatus}
        onFilterChange={handleFilterChange}
      />

      {/* منطقة عرض الكاردات مع التحكم الكامل بمراحل الظهور */}
      <div className="relative min-h-[300px] flex flex-col justify-between">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {showSkeleton ? (
            /* 1. حالة التحميل الأولى عندما لا توجد أي بيانات سابقة */
            Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse h-full flex flex-col p-6 rounded-[2rem] border-2 border-border bg-surface-lowest shadow-[0_5px_30px_rgba(0,0,0,0.02)] justify-between gap-6"
              >
                <div className="flex justify-between items-start">
                  <div className="w-14 h-14 rounded-2xl bg-gray-200"></div>
                  <div className="h-4 bg-gray-200 rounded w-16"></div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded bg-gray-200 shrink-0"></div>
                    <div className="space-y-1.5 w-full">
                      <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded bg-gray-200 shrink-0"></div>
                    <div className="space-y-1.5 w-full">
                      <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border flex justify-between items-center">
                  <div className="h-5 bg-gray-200 rounded w-16"></div>
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                </div>

                <div className="pt-4 border-t border-border flex justify-between items-center">
                  <div className="h-6 bg-gray-200 rounded-full w-20"></div>
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                </div>
              </div>
            ))
          ) : sponsorships && sponsorships.length > 0 ? (
            /* 2. حالة وجود بيانات: عرض الكاردات الحقيقية مباشرة دون وميض */
            sponsorships.map((item) => (
              <SponsorshipCard key={item.id} sponsorship={item} />
            ))
          ) : !isReallyLoading && hasLoadedAtLeastOnce ? (
            /* 3. رسالة "لا توجد بيانات" تظهر حصرياً بعد انتهاء التحميل وثبوت خلو القائمة تماماً */
            <div className="col-span-full text-center py-16 bg-surface-lowest rounded-2xl border border-border text-on-surface-variant/60 font-medium text-base shadow-sm">
              {t("noSponsorships") ||
                (lang === "ar"
                  ? "لا توجد طلبات كفالة متاحة حالياً"
                  : "No sponsorship requests available")}
            </div>
          ) : null}
        </div>

        {/* الـ Pagination */}
        {!showSkeleton && lastPage > 1 && (
          <div className="flex justify-center items-center gap-4 mt-10">
            <button
              disabled={currentPage === 1 || showSkeleton}
              onClick={() => handlePageChange(currentPage - 1)}
              className="p-3 rounded-xl bg-white border border-gray-200 hover:border-primary text-primary disabled:opacity-30 transition-all shadow-sm cursor-pointer"
            >
              {lang === "ar" ? (
                <ChevronRight size={20} />
              ) : (
                <ChevronLeft size={20} />
              )}
            </button>

            <span className="font-bold text-sm text-gray-600 bg-white px-6 py-2 rounded-xl border border-gray-200 shadow-sm">
              {currentPage} / {lastPage}
            </span>

            <button
              disabled={currentPage === lastPage || showSkeleton}
              onClick={() => handlePageChange(currentPage + 1)}
              className="p-3 rounded-xl bg-white border border-gray-200 hover:border-primary text-primary disabled:opacity-30 transition-all shadow-sm cursor-pointer"
            >
              {lang === "ar" ? (
                <ChevronLeft size={20} />
              ) : (
                <ChevronRight size={20} />
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
