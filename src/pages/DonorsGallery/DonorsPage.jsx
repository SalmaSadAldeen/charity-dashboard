import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDonors } from "@/store/index";
import {
  Users,
  ShieldCheck,
  Heart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import DonorTable from "./components/DonorTable";
import { useNavigate, useSearchParams } from "react-router-dom";
import FilterBar from "@/pages/Dashboard/components/FilterBar";

export default function DonorsPage() {
  const { t, lang } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    items: donors,
    status,
    pagination,
  } = useSelector((state) => state.donors);

  const [searchParams, setSearchParams] = useSearchParams();
  const currentSponsorFilter = searchParams.get("isSponsor") || null;
  const currentPage = Number(searchParams.get("page")) || 1;
  const ITEMS_PER_PAGE = 2;

  useEffect(() => {
    dispatch(
      fetchDonors({
        page: currentPage,
        limit: ITEMS_PER_PAGE,
        isSponsor: currentSponsorFilter,
      }),
    );
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

  return (
    <div className="p-8 w-full min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
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
        <section className="bg-surface-lowest p-6 rounded-3xl shadow-sm border border-border">
          {/* Filter Bar */}
          <div className="mb-8">
            <FilterBar
              filters={filters}
              active={currentSponsorFilter}
              onFilterChange={handleFilterChange}
            />
          </div>

          {/* Table Area */}
          <div>
            <DonorTable
              data={donors}
              status={status}
              t={t}
              lang={lang}
              onRowClick={(item) =>
                navigate(
                  `/dashboard/donors/${item.id || item.donorId}?${searchParams.toString()}`,
                )
              }
            />
          </div>

          {/* 3. Pagination */}
          {pagination?.lastPage > 1 && (
            <footer className="flex justify-between items-center mt-8 pt-6 border-t border-border">
              <span className="text-xs font-bold text-on-surface-variant opacity-60">
                {t("showing")} {currentPage} {t("from")} {pagination.lastPage}
              </span>

              <div className="flex items-center gap-2">
                <button
                  disabled={currentPage === 1 || status === "loading"}
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="p-2.5 rounded-xl border border-border bg-surface-lowest text-primary hover:bg-primary hover:text-white transition-all shadow-sm disabled:opacity-30"
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
                  className="p-2.5 rounded-xl border border-border bg-surface-lowest text-primary hover:bg-primary hover:text-white transition-all shadow-sm disabled:opacity-30"
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
