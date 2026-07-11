import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "@/hooks/useTranslation";
import StatCard from "./components/StatCard";
import DonationChart from "./components/DonationChart";
import RequestsChart from "./components/RequestsChart";
// أضيفي fetchRequestsCharts للقائمة
import {
  fetchDashboardStats,
  fetchCharts,
  fetchRequestsCharts,
} from "@/store/dashboardSlice";
export default function Dashboard() {
  const [view, setView] = useState("weekly");
  const dispatch = useDispatch();

  const { t, lang } = useTranslation();

  const { stats, charts } = useSelector((state) => state.dashboard);
  console.log("Dashboard Rendered! Stats:", stats, "Charts:", charts);

  useEffect(() => {
    // جلب البيانات الحقيقية من السيرفر عند فتح الصفحة
    dispatch(fetchDashboardStats());
    dispatch(fetchCharts("monthly"));
    dispatch(fetchRequestsCharts());
  }, [dispatch]);

  return (
    <main
      dir={lang === "ar" ? "rtl" : "ltr"}
      className="p-8 bg-surface-container text-on-surface-variant"
    >
      {/* العنوان */}
      <div className="mb-8">
        <h2 className="text-[32px] font-bold text-on-surface-variant mb-1">
          {t("dashboardTitle")}
        </h2>
        <p className="text-on-surface-variant">{t("dashboardSubtitle")}</p>
      </div>

      {/* الإحصائيات */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="md:col-span-2 bg-primary-container p-8 rounded-3xl shadow-[0_10px_30px_-5px_rgba(250,213,100,0.5)] text-primary relative overflow-hidden border border-white/30">
          <span className="material-symbols-outlined absolute -right-4 -bottom-6 text-[160px] opacity-20 pointer-events-none select-none">
            payments
          </span>
          <div className="relative z-10">
            <p className="text-xs uppercase tracking-widest font-bold mb-2 opacity-80 text-primary">
              {t("totalDonations")}
            </p>
            <h3 className="text-[48px] font-extrabold leading-tight mb-4 text-primary">
              {stats && stats.total_donations
                ? `$${stats.total_donations.toLocaleString()}`
                : "$0"}{" "}
            </h3>
            <div className="flex items-center gap-2 font-semibold text-sm bg-surface-lowest/30 w-fit px-3 py-1 rounded-full text-primary">
              <span>
                📈 {stats?.donations_growth_percentage || 0}% {t("growth")}
              </span>
            </div>
          </div>
        </div>

        <StatCard
          icon="task_alt"
          title={t("completedCases")}
          val={
            stats && stats.completed_cases
              ? stats.completed_cases.toLocaleString()
              : "0"
          }
          bg="bg-[#e0ea88]"
        />
        <StatCard
          icon="medical_services"
          title={t("assistanceTypes")}
          val={stats?.assistance_types_count?.toLocaleString() || "0"}
          bg="bg-[#b3e4c2]"
        />
      </div>

      {/* الرسوم البيانية */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <DonationChart
          view={view}
          setView={setView}
          currentData={charts || []}
          t={t}
        />
        <RequestsChart t={t} dataFromBackend={stats?.requests_data} />
      </div>
    </main>
  );
}
