import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";
import { useDelayedLoading } from "@/hooks/useDelayedLoading";
import { fetchHelpRequestsStats } from "@/store/dashboardSlice";
import StatsOverview from "@/pages/BeneficiaryGallery/StatsOverview";

import {
  Clock,
  CheckCircle,
  XCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { fetchHelpRequests } from "@/store/index";

import HelpRequestsTable from "./components/HelpRequestsTable";
import FilterBar from "@/pages/Dashboard/components/FilterBar";

const ITEMS_PER_PAGE = 4;

export default function HelpRequestsPage() {
  const { t, lang } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { helpRequestsStats } = useSelector((state) => state.dashboard);

  const [searchParams, setSearchParams] = useSearchParams();
  const statusFilter = searchParams.get("status") || null;
  const currentPage = Number(searchParams.get("page")) || 1;

  const { items, status, pagination } = useSelector(
    (state) => state.helpRequests,
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
      fetchHelpRequests({
        status: statusFilter || "",
        page: currentPage,
        limit: ITEMS_PER_PAGE,
      }),
    ).then(() => {
      setHasLoadedAtLeastOnce(true);
    });
  }, [statusFilter, currentPage, lang, dispatch]);

  useEffect(() => {
    dispatch(fetchHelpRequestsStats());
  }, [dispatch]);

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
    {
      label: t("ACCEPTED"),
      value: "ACCEPTED",
      icon: <CheckCircle size={16} />,
    },
    { label: t("PENDING"), value: "PENDING", icon: <Clock size={16} /> },
    { label: t("REJECTED"), value: "REJECTED", icon: <XCircle size={16} /> },
    { label: t("cancel"), value: "CANCELLED", icon: <XCircle size={16} /> },
  ];

  const showSkeleton = isReallyLoading && !hasExistingItems;
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500 relative">
      {/* 1. Header */}
      <header className="flex justify-between items-end border-b border-border pb-6">
        <div>
          <h2 className="text-3xl font-black text-on-surface-variant tracking-tight">
            {t("helpRequests")}
          </h2>
          <p className="text-gray-500 font-medium mt-1.5 text-sm">
            {t("manageRequestsDescription")}
          </p>
        </div>
      </header>
      {helpRequestsStats && (
        <section>
          <StatsOverview stats={helpRequestsStats} />
        </section>
      )}

      {/* 2. Main Section */}
      <section className="bg-surface-lowest p-6 rounded-3xl shadow-sm border border-border min-h-[500px] flex flex-col justify-between">
        <div>
          <div className="mb-8">
            <FilterBar
              filters={filters}
              active={statusFilter}
              onFilterChange={handleFilterChange}
            />
          </div>

          {/* الجدول يعرض الهيد الحقيقي فوراً، والسكيليتون في الصفوف تحته */}
          <div className="relative min-h-[300px] flex flex-col">
            <HelpRequestsTable
              data={items}
              status={showSkeleton ? "loading" : status}
              onRowClick={(req) =>
                navigate(
                  `/dashboard/help-requests/${req.id}?${searchParams.toString()}`,
                )
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
