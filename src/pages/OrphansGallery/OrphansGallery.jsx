import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { OrphanCard } from "@/pages/OrphansGallery/components/OrphanCard";
import { useTranslation } from "@/hooks/useTranslation";
import FilterBar from "@/pages/Dashboard/components/FilterBar";
import { useDelayedLoading } from "@/hooks/useDelayedLoading";
import { fetchOrphansStats } from "@/store/dashboardSlice";
import {
  Plus,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  Check,
  CheckCircle,
  XCircle,
  Star,
  ChevronDown,
} from "lucide-react";
import {
  fetchOrphans,
  updateSponsorshipStatus,
  fetchSponsorships,
} from "@/store/index";
import OrphansStatsCard from "./components/OrphansStatsCard";
import { hasPermission } from "@/utils/permissions";

export default function OrphansGallery() {
  const { t, lang } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { roles } = useSelector((state) => state.auth);
  const { orphansStats } = useSelector(
    (state) => state.dashboard || state.orphans,
  );

  const selectMode = searchParams.get("mode") === "select";
  const targetSponsorshipId = searchParams.get("sponsorshipId");

  const currentPage = Number(searchParams.get("page")) || 1;
  const supportedParam = searchParams.get("supported");
  const priorityParam = searchParams.get("priority");
  const supportedFilter =
    supportedParam === "true"
      ? true
      : supportedParam === "false"
        ? false
        : null;

  const priorityFilter = priorityParam ? Number(priorityParam) : null;

  const [selectedOrphanId, setSelectedOrphanId] = useState(null);
  const [isPriorityDropdownOpen, setIsPriorityDropdownOpen] = useState(false);

  const ITEMS_PER_PAGE = 2;
  const {
    items = [],
    pagination,
    status,
  } = useSelector((state) => state.orphans);
  const [currentStatus, setCurrentStatus] = useState("");

  const isReallyLoading = useDelayedLoading(status === "loading", 100);

  const hasExistingItems = Array.isArray(items) && items.length > 0;

  const [hasLoadedAtLeastOnce, setHasLoadedAtLeastOnce] =
    useState(hasExistingItems);

  useEffect(() => {
    if (!hasExistingItems) {
      setHasLoadedAtLeastOnce(false);
    }

    dispatch(
      fetchOrphans({
        page: currentPage,
        limit: ITEMS_PER_PAGE,
        supported: supportedFilter,
        priority: priorityFilter,
      }),
    ).then(() => {
      setHasLoadedAtLeastOnce(true);
    });
  }, [
    dispatch,
    lang,
    supportedFilter,
    priorityFilter,
    currentPage,
    selectMode,
  ]);

  useEffect(() => {
    dispatch(fetchOrphansStats());
  }, [dispatch]);

  const handleFilterChange = (val) => {
    if (selectMode) return;

    const newParams = { page: 1 };
    if (val !== null && val !== undefined) {
      newParams.supported = String(val);
    }
    if (priorityParam) {
      newParams.priority = priorityParam;
    }
    if (selectMode) {
      newParams.mode = "select";
      if (targetSponsorshipId) newParams.sponsorshipId = targetSponsorshipId;
    }

    setSearchParams(newParams);
  };

  const handlePriorityChange = (val) => {
    if (selectMode) return;

    const newParams = { page: 1 };
    if (supportedParam !== null && supportedParam !== undefined) {
      newParams.supported = supportedParam;
    }
    if (val !== null && val !== undefined && val !== "") {
      newParams.priority = String(val);
    }
    if (selectMode) {
      newParams.mode = "select";
      if (targetSponsorshipId) newParams.sponsorshipId = targetSponsorshipId;
    }

    setSearchParams(newParams);
    setIsPriorityDropdownOpen(false);
  };

  const handlePageChange = (newPage) => {
    const newParams = { page: newPage };
    if (
      supportedParam !== null &&
      supportedParam !== undefined &&
      supportedParam !== ""
    ) {
      newParams.supported = supportedParam;
    }
    if (priorityParam) {
      newParams.priority = priorityParam;
    }
    if (selectMode) {
      newParams.mode = "select";
      if (targetSponsorshipId) newParams.sponsorshipId = targetSponsorshipId;
    }

    setSearchParams(newParams);
  };

  const handleConfirmSelection = async () => {
    if (!selectedOrphanId || !targetSponsorshipId) return;
    try {
      await dispatch(
        updateSponsorshipStatus({
          id: Number(targetSponsorshipId),
          data: { status: "ACCEPTED", orphanId: Number(selectedOrphanId) },
        }),
      ).unwrap();
      await dispatch(
        fetchSponsorships({
          page: currentPage,
          limit: ITEMS_PER_PAGE,
          status: currentStatus,
        }),
      );
      navigate("/dashboard/sponsorships");
    } catch (error) {
      console.error("خطأ أثناء ربط الكفالة باليتيم:", error);
    }
  };

  const filters = [
    { label: t("all") || "الكل", value: null, icon: <LayoutGrid size={16} /> },
    { label: t("isSupported"), value: true, icon: <CheckCircle size={16} /> },
    { label: t("notSupported"), value: false, icon: <XCircle size={16} /> },
  ];

  const showSkeleton =
    isReallyLoading && (!hasLoadedAtLeastOnce || !hasExistingItems);

  return (
    <main
      className="p-6 max-w-7xl mx-auto space-y-6 pb-24"
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      {selectMode && (
        <div className="mb-6 p-4 bg-primary/10 border border-primary/20 rounded-2xl flex items-center justify-between text-primary font-bold shadow-sm">
          <span>
            {lang === "ar"
              ? "يرجى تحديد اليتيم المطلوب من القائمة أدناه ثم اضغط تأكيد الاختيار."
              : "Please select an orphan below and click confirm to complete sponsorship."}
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="text-xs bg-white px-4 py-2 rounded-xl shadow-xs border border-primary/25 hover:bg-gray-50 text-gray-700 transition-all cursor-pointer"
            >
              {lang === "ar" ? "إلغاء" : "Cancel"}
            </button>
            <button
              disabled={!selectedOrphanId || status === "loading"}
              onClick={handleConfirmSelection}
              className="text-xs bg-primary text-white px-5 py-2 rounded-xl shadow-md hover:bg-primary/90 disabled:opacity-50 transition-all font-bold cursor-pointer"
            >
              {lang === "ar" ? "تأكيد الاختيار" : "Confirm Selection"}
            </button>
          </div>
        </div>
      )}

      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-black text-on-surface-variant">
            {t("orphansList")}
          </h1>
          <p className="text-sm text-on-surface-variant/70 mt-1">
            {t("orphansDescription")}
          </p>
        </div>

        {!selectMode && hasPermission(roles, "create:orphans") && (
          <button
            onClick={() => navigate("/dashboard/add-orphan")}
            className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-bold hover:bg-primary/90 shadow-lg shadow-primary/25 transition-all active:scale-95 cursor-pointer"
          >
            <Plus size={20} /> {t("addOrphan")}
          </button>
        )}
      </div>
      <div className="mb-6">
        <OrphansStatsCard
          t={t}
          sponsored={orphansStats?.sponsored || 0}
          notSponsored={orphansStats?.not_sponsored || 0}
        />
      </div>

      <div
        className={`flex flex-col md:flex-row justify-between items-start md:items-center gap-4 ${selectMode ? "opacity-60 pointer-events-none" : ""}`}
      >
        <FilterBar
          filters={filters}
          active={supportedFilter}
          onFilterChange={handleFilterChange}
        />

        <div className="relative">
          <button
            onClick={() => setIsPriorityDropdownOpen(!isPriorityDropdownOpen)}
            className="flex items-center gap-2 bg-white px-5 py-2.5 rounded-2xl border border-gray-200 shadow-sm text-gray-700 font-bold hover:border-amber-400 transition-all cursor-pointer"
          >
            <Star size={16} className="text-amber-500 fill-amber-400" />
            <span>{priorityFilter}</span>
            <ChevronDown size={16} className="text-gray-400" />
          </button>
          {isPriorityDropdownOpen && (
            <div className="absolute left-0 md:right-0 md:left-auto mt-2 w-48 bg-white rounded-2xl border border-gray-100 shadow-xl z-30 py-2">
              <button
                onClick={() => handlePriorityChange(null)}
                className={`w-full text-start px-4 py-2.5 text-sm font-bold transition-all hover:bg-amber-50 hover:text-amber-700 flex items-center gap-2 ${
                  priorityFilter === null
                    ? "bg-amber-50 text-amber-700"
                    : "text-gray-700"
                }`}
              >
                <LayoutGrid size={14} />
                <span>{t("all") || "الكل"}</span>
              </button>
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  onClick={() => handlePriorityChange(num)}
                  className={`w-full text-start px-4 py-2.5 text-sm font-bold transition-all hover:bg-amber-50 hover:text-amber-700 flex items-center gap-2 ${
                    priorityFilter === num
                      ? "bg-amber-50 text-amber-700"
                      : "text-gray-700"
                  }`}
                >
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: num }).map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className="text-amber-500 fill-amber-400"
                      />
                    ))}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="relative min-h-[300px] flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {showSkeleton ? (
            Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse h-full flex flex-col p-6 rounded-[2rem] border-2 border-border bg-surface-lowest shadow-[0_5px_30px_rgba(0,0,0,0.02)] justify-between gap-6"
              >
                <div className="flex justify-start">
                  <div className="w-14 h-14 rounded-2xl bg-gray-200"></div>
                </div>

                <div className="space-y-4">
                  <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded bg-gray-200 shrink-0"></div>
                      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded bg-gray-200 shrink-0"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded bg-gray-200 shrink-0"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                </div>

                <div className="pt-5 border-t border-border flex justify-between items-center">
                  <div className="h-6 bg-gray-200 rounded-full w-20"></div>
                  <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                </div>
              </div>
            ))
          ) : items && items.length > 0 ? (
            items.map((orphan) => {
              const isSelected = selectedOrphanId === orphan.id;
              return (
                <div
                  key={orphan.id}
                  onClick={() => {
                    if (selectMode) {
                      setSelectedOrphanId(orphan.id);
                    } else {
                      navigate(`/dashboard/orphan/details/${orphan.id}`);
                    }
                  }}
                  className="cursor-pointer group h-full relative"
                >
                  {selectMode && (
                    <div
                      className={`absolute top-4 right-4 z-25 w-7 h-7 rounded-full border-2 flex items-center justify-center shadow-md transition-transform ${
                        isSelected
                          ? "border-primary bg-primary scale-110 text-white"
                          : "border-gray-300 bg-white hover:scale-110 text-transparent"
                      }`}
                      title={
                        lang === "ar" ? "اختر هذا اليتيم" : "Select this orphan"
                      }
                    >
                      <Check size={16} strokeWidth={3} />
                    </div>
                  )}

                  <OrphanCard
                    orphan={orphan}
                    isSelected={selectMode && isSelected}
                  />
                </div>
              );
            })
          ) : !isReallyLoading && hasLoadedAtLeastOnce ? (
            <div className="col-span-full text-center py-16 bg-surface-lowest rounded-2xl border border-border text-on-surface-variant/60 font-medium text-base shadow-sm">
              {t("noData") ||
                (lang === "ar" ? "لا توجد بيانات متاحة" : "No data available")}
            </div>
          ) : null}
        </div>
      </div>

      {pagination?.lastPage > 1 && (
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
            {currentPage} / {pagination.lastPage}
          </span>

          <button
            disabled={currentPage === pagination.lastPage || showSkeleton}
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
    </main>
  );
}
