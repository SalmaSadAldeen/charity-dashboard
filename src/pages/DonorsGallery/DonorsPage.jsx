import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDonors, clearDonorDetails } from "@/store/index";
import {
  Users,
  ShieldCheck,
  Heart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import DonorTable from "./components/DonorTable";
import { useSearchParams } from "react-router-dom";
import FilterBar from "@/pages/Dashboard/components/FilterBar";
import { useDelayedLoading } from "@/hooks/useDelayedLoading";
import DonorHistoryModal from "./components/DonorHistoryModal";

export default function DonorsPage() {
  const { t, lang } = useTranslation();
  const dispatch = useDispatch();

  const [selectedDonorId, setSelectedDonorId] = useState(null);

  const {
    items: donors,
    status,
    pagination,
    detailsStatus,
  } = useSelector((state) => state.donors);

  const [searchParams, setSearchParams] = useSearchParams();
  const currentSponsorFilter = searchParams.get("isSponsor");
  const currentPage = Number(searchParams.get("page")) || 1;
  const ITEMS_PER_PAGE = 4;

  const [hasLoadedAtLeastOnce, setHasLoadedAtLeastOnce] = useState(false);
  const isReallyLoading = useDelayedLoading(status === "loading", 500);

  useEffect(() => {
    let sponsorValue = "";
    if (currentSponsorFilter === "true") {
      sponsorValue = "true";
    } else if (currentSponsorFilter === "false") {
      sponsorValue = "false";
    }

    setHasLoadedAtLeastOnce(false);
    dispatch(
      fetchDonors({
        page: currentPage,
        limit: ITEMS_PER_PAGE,
        isSponsor: sponsorValue,
      }),
    ).then(() => {
      setHasLoadedAtLeastOnce(true);
    });
  }, [currentPage, currentSponsorFilter, lang, dispatch]);

  const handleFilterChange = (val) => {
    const params = new URLSearchParams(searchParams);
    if (val !== null) {
      params.set("isSponsor", val);
    } else {
      params.delete("isSponsor");
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
      label: t("activeSponsor"),
      value: "true",
      icon: <ShieldCheck size={16} />,
    },
    { label: t("generalDonor"), value: "false", icon: <Heart size={16} /> },
  ];

  const totalPages = pagination?.totalPages || pagination?.lastPage || 1;
  const showSkeleton = isReallyLoading || !hasLoadedAtLeastOnce;

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500 relative">
      {/* 1. Header Area */}
      <header className="flex justify-between items-end border-b border-border pb-6">
        <div className="flex flex-col">
          <h2 className="text-3xl font-black text-on-surface-variant tracking-tight flex items-center gap-3">
            <Users className="text-primary" size={32} />
            {t("donorsList")}
          </h2>
          <p className="text-sm text-gray-500 mt-2 font-medium">
            {t("manageAndReviewDonors")}
          </p>
        </div>
      </header>

      {/* 2. Main Content Area */}
      <section className="bg-surface-lowest p-6 rounded-3xl shadow-sm border border-border min-h-[500px] flex flex-col justify-between">
        <div>
          {/* Filter Bar */}
          <div className="mb-8">
            <FilterBar
              filters={filters}
              active={currentSponsorFilter}
              onFilterChange={handleFilterChange}
            />
          </div>

          {/* Table Area */}
          <div className="relative min-h-[300px] flex flex-col">
            <DonorTable
              data={donors}
              status={showSkeleton ? "loading" : status}
              t={t}
              lang={lang}
              onRowClick={(donor) => {
                const donorId = donor.donorId || donor.id;
                setSelectedDonorId(donorId);
              }}
            />
          </div>
        </div>

        {/* 3. Pagination */}
        {totalPages > 1 && (
          <footer className="flex justify-between items-center mt-8 pt-6 border-t border-border">
            <span className="text-xs font-bold text-on-surface-variant opacity-60">
              {t("showing")} {currentPage} {t("from")} {totalPages}
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
                disabled={currentPage >= totalPages || showSkeleton}
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

      {/* Modal */}
      {selectedDonorId && (
        <DonorHistoryModal
          donorId={selectedDonorId}
          status={detailsStatus}
          onClose={() => {
            setSelectedDonorId(null);
            dispatch(clearDonorDetails());
          }}
          t={t}
          lang={lang}
        />
      )}
    </div>
  );
}
