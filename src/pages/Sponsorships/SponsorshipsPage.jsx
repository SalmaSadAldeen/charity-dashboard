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
  const isReallyLoading = useDelayedLoading(status === "loading", 400);

  // 1. جلب البيانات عند أول تحميل للصفحة أو عند تغير اللغة فقط
  useEffect(() => {
    dispatch(fetchSponsorships({ status: currentStatus }));
  }, [lang, dispatch]);

  // 2. عند تغيير الفلتر: تحديث الحالة وإرسال الطلب فوراً (تماماً مثل الأيتام)
  const handleFilterChange = (val) => {
    setCurrentStatus(val);
    dispatch(fetchSponsorships({ status: val }));
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

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
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

      {/* منطقة عرض الكاردات مع الـ Overlay المباشر والارتفاع المضبوط */}
      <div className="relative min-h-[300px] flex flex-col">
        {isReallyLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/70 backdrop-blur-[1px] rounded-3xl z-10">
            <div className="flex items-center gap-2 text-on-surface-variant/70 text-base font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-primary animate-bounce"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-primary animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-primary animate-bounce [animation-delay:0.4s]"></span>
              <span className="ms-2">
                {lang === "ar" ? "جاري التحميل..." : "Loading..."}
              </span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {sponsorships && sponsorships.length > 0 ? (
            sponsorships.map((item) => (
              <SponsorshipCard key={item.id} sponsorship={item} />
            ))
          ) : status !== "loading" ? (
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
