import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSponsorships } from "@/store/index";
import { useTranslation } from "@/hooks/useTranslation";
import SponsorshipCard from "./components/SponsorshipCard";
import FilterBar from "@/pages/Dashboard/components/FilterBar";
import { useDelayedLoading } from "@/hooks/useDelayedLoading";
import { Clock, CheckCircle, XCircle, LayoutGrid } from "lucide-react";

export default function SponsorshipsPage() {
  const dispatch = useDispatch();
  const { t, lang } = useTranslation();

  const { items: sponsorships, status } = useSelector(
    (state) => state.sponsorships,
  );

  const [currentStatus, setCurrentStatus] = useState("");
  const isReallyLoading = useDelayedLoading(status === "loading", 100);


  const hasExistingItems =
    Array.isArray(sponsorships) && sponsorships.length > 0;

  const [hasLoadedAtLeastOnce, setHasLoadedAtLeastOnce] =
    useState(hasExistingItems);


  useEffect(() => {

    if (!hasExistingItems) {
      setHasLoadedAtLeastOnce(false);
    }

    dispatch(fetchSponsorships({ status: currentStatus })).then(() => {
      setHasLoadedAtLeastOnce(true);
    });
  }, [lang, currentStatus, dispatch]);

  const handleFilterChange = (val) => {
    setCurrentStatus(val);
  };

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

      <FilterBar
        filters={filters}
        active={currentStatus}
        onFilterChange={handleFilterChange}
      />

      {/* منطقة عرض الكاردات مع التحكم الكامل بمراحل الظهور */}
      <div className="relative min-h-[300px] flex flex-col">
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
      </div>
    </div>
  );
}
