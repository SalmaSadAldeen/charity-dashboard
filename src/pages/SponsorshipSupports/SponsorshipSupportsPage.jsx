import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";
import { fetchSponsorshipFundSupports } from "@/store/index";
import SponsorshipSupportsTable from "./components/SponsorshipSupportsTable";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useDelayedLoading } from "@/hooks/useDelayedLoading";

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
  const isReallyLoading = useDelayedLoading(status === "loading", 500);
  const showSkeleton = isReallyLoading && !hasExistingItems;

  useEffect(() => {
    dispatch(
      fetchSponsorshipFundSupports({
        page: currentPage,
        limit: ITEMS_PER_PAGE,
      }),
    );
  }, [currentPage, lang, dispatch]);

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(newPage));
    setSearchParams(params);
  };

  return (
    <div className="p-8 w-full min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <header className="flex justify-between items-end border-b border-border pb-6">
          <div className="flex flex-col">
            <h2 className="text-3xl font-black text-on-surface-variant tracking-tight">
              {t("sponsorship_coverages")}
            </h2>
            <p className="text-sm text-gray-500 mt-2 font-medium">
              {t("sponsorshipSupportsSubtitle")}
            </p>
          </div>
        </header>

        {/* Main Section */}
        <section className="bg-surface-lowest p-6 rounded-3xl shadow-sm border border-border">
          <div className="relative min-h-[300px] flex flex-col">
            <SponsorshipSupportsTable
              data={items}
              isLoading={showSkeleton}
              onOrphanClick={(orphanId) =>
                navigate(`/dashboard/orphan/details/${orphanId}`)
              }
            />
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
                  className="p-2.5 rounded-xl border border-border bg-surface-lowest text-primary hover:bg-primary hover:text-white transition-all shadow-sm disabled:opacity-30 cursor-pointer"
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
