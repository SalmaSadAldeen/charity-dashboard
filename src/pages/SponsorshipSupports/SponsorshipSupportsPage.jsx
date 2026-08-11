import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";
import { useDelayedLoading } from "@/hooks/useDelayedLoading";
import { fetchSponsorshipFundSupports } from "@/store/index";
import SponsorshipSupportsTable from "./components/SponsorshipSupportsTable";

import { ChevronLeft, ChevronRight } from "lucide-react";

const ITEMS_PER_PAGE = 5;

export default function SponsorshipSupportsPage() {
  const { t, lang } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const { items, status, pagination } = useSelector(
    (state) =>
      state.sponsorshipFundSupports || {
        items: [],
        status: "idle",
        pagination: {},
      },
  );

  const hasExistingItems = Array.isArray(items) && items.length > 0;
  const [hasLoadedAtLeastOnce, setHasLoadedAtLeastOnce] =
    useState(hasExistingItems);
  const isReallyLoading = useDelayedLoading(status === "loading", 100);

  useEffect(() => {
    if (!hasExistingItems) {
      setHasLoadedAtLeastOnce(false);
    }

    dispatch(
      fetchSponsorshipFundSupports({
        page: currentPage,
        limit: ITEMS_PER_PAGE,
      }),
    ).then(() => {
      setHasLoadedAtLeastOnce(true);
    });
  }, [currentPage, lang, dispatch]);

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(newPage));
    setSearchParams(params);
  };

  const showSkeleton = isReallyLoading && !hasExistingItems;

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-5 animate-in fade-in duration-500">
      {/* 1. Header */}
      <header className="flex flex-col gap-1 bg-white/60 backdrop-blur-md px-6 py-4 rounded-2xl border border-border/50 shadow-xs">
        <h2 className="text-2xl font-black text-on-surface-variant tracking-tight">
          {t("sponsorship_coverages")}
        </h2>
        <p className="text-gray-500 font-medium text-xs">
          {t("sponsorshipSupportsSubtitle")}
        </p>
      </header>

      {/* 2. Main Section */}
      <section className="bg-surface-lowest p-6 rounded-3xl shadow-sm border border-border min-h-[500px] flex flex-col justify-between">
        <div className="space-y-6">
          <div className="relative min-h-[300px] flex flex-col">
            <SponsorshipSupportsTable
              data={items}
              status={showSkeleton ? "loading" : status}
              onOrphanClick={(orphanId) =>
                navigate(`/dashboard/orphan/details/${orphanId}`)
              }
            />
          </div>
        </div>

        {/* Pagination */}
        {pagination?.lastPage > 1 && (
          <footer className="flex justify-between items-center mt-8 pt-6 border-t border-border">
            <span className="text-xs font-bold text-on-surface-variant opacity-60">
              {t("showing")} {currentPage} {t("from")} {pagination.lastPage}
            </span>
            <div className="flex items-center gap-2">
              <button
                disabled={currentPage === 1 || showSkeleton}
                onClick={() => handlePageChange(currentPage - 1)}
                className="p-2.5 rounded-xl border border-border bg-white text-primary hover:bg-primary hover:text-white transition-all shadow-sm disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-primary cursor-pointer"
              >
                {lang === "ar" ? (
                  <ChevronRight size={18} />
                ) : (
                  <ChevronLeft size={18} />
                )}
              </button>
              <button
                disabled={currentPage >= pagination.lastPage || showSkeleton}
                onClick={() => handlePageChange(currentPage + 1)}
                className="p-2.5 rounded-xl border border-border bg-white text-primary hover:bg-primary hover:text-white transition-all shadow-sm disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-primary cursor-pointer"
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
  );
}
