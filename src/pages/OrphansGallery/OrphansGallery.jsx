import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { OrphanCard } from "@/pages/OrphansGallery/components/OrphanCard";
import { useTranslation } from "@/hooks/useTranslation";
import FilterBar from "@/pages/Dashboard/components/FilterBar";
import { useDelayedLoading } from "@/hooks/useDelayedLoading";
import { fetchOrphansStats } from "@/store/dashboardSlice"; // تأكدي أن مسار الـ slice صحيح لديكِ
import {
  Plus,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  Check,
  CheckCircle,
  XCircle,
} from "lucide-react";
import {
  fetchOrphans,
  updateSponsorshipStatus,
  fetchSponsorships,
} from "@/store/index";
import OrphansStatsCard from "./components/OrphansStatsCard";
export default function OrphansGallery() {
  const { t, lang } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const { orphansStats } = useSelector(
    (state) => state.dashboard || state.orphans,
  );
  const selectMode = searchParams.get("mode") === "select";
  const targetSponsorshipId = searchParams.get("sponsorshipId");

  const [supportedFilter, setSupportedFilter] = useState(
    selectMode ? false : null,
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrphanId, setSelectedOrphanId] = useState(null);

  const ITEMS_PER_PAGE = 8;
  const {
    items = [],
    pagination,
    status,
  } = useSelector((state) => state.orphans);

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
        supported: selectMode ? false : supportedFilter,
      }),
    ).then(() => {
      setHasLoadedAtLeastOnce(true);
    });
  }, [
    dispatch,
    lang,
    supportedFilter,
    currentPage,
    selectMode,
    hasExistingItems,
  ]);
  useEffect(() => {
    dispatch(fetchOrphansStats());
  }, [dispatch]);
  const handleFilterChange = (val) => {
    if (selectMode) return;
    setSupportedFilter(val);
    setCurrentPage(1);
    dispatch(
      fetchOrphans({
        page: 1,
        limit: ITEMS_PER_PAGE,
        supported: val,
      }),
    );
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    dispatch(
      fetchOrphans({
        page: newPage,
        limit: ITEMS_PER_PAGE,
        supported: selectMode ? false : supportedFilter,
      }),
    );
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
      await dispatch(fetchSponsorships({ status: "" }));
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
      {/* شريط التنبيه وزر التأكيد إذا كنا بوضع اختيار الكفالة */}
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

      {/* العنوان وزر الإضافة */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-black text-on-surface-variant">
            {t("orphansList")}
          </h1>
          <p className="text-sm text-on-surface-variant/70 mt-1">
            {t("orphansDescription")}
          </p>
        </div>

        {!selectMode && (
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

      {/* شريط الفلترة */}
      <div className={`${selectMode ? "opacity-60 pointer-events-none" : ""}`}>
        <FilterBar
          filters={filters}
          active={supportedFilter}
          onFilterChange={handleFilterChange}
        />
      </div>

      {/* منطقة عرض الكاردات */}
      <div className="relative min-h-[300px] flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {showSkeleton ? (
            /* 1. حالة التحميل الأولي */
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
            /* 2. حالة وجود بيانات */
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
            /* 3. رسالة الفراغ تظهر حصرياً بعد انتهاء التحميل وثبوت خلو القائمة تماماً */
            <div className="col-span-full text-center py-16 bg-surface-lowest rounded-2xl border border-border text-on-surface-variant/60 font-medium text-base shadow-sm">
              {t("noData") ||
                (lang === "ar" ? "لا توجد بيانات متاحة" : "No data available")}
            </div>
          ) : null}
        </div>
      </div>

      {/* الـ Pagination */}
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
