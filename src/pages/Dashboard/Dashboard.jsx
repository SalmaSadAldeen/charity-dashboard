import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "@/hooks/useTranslation";
import StatCard from "./components/StatCard";
import DonationChart from "./components/DonationChart";
import RequestsChart from "./components/RequestsChart";
import { useNavigate } from "react-router-dom";
import {
  fetchDashboardStats,
  fetchCharts,
  fetchRequestsCharts,
} from "@/store/dashboardSlice";

export default function Dashboard() {
  const [period, setPeriod] = useState("monthly"); // 👈 استخدام period بدلاً من view
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t, lang } = useTranslation();
  const { stats, charts, requestsCharts } = useSelector(
    (state) => state.dashboard,
  );

  useEffect(() => {
    // منع الرجوع عبر حشو التاريخ
    window.history.pushState(null, "", window.location.href);

    const handlePopState = () => {
      window.history.pushState(null, "", window.location.href);
      // إجبار البقاء في الداشبورد دائماً مهما حاول الرجوع
      navigate("/dashboard", { replace: true });
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [navigate]);
  useEffect(() => {
    dispatch(fetchDashboardStats());
    dispatch(fetchRequestsCharts());
  }, [dispatch, lang]);

  useEffect(() => {
    dispatch(fetchCharts(period));
  }, [dispatch, period, lang]);
  return (
    <main
      dir={lang === "ar" ? "rtl" : "ltr"}
      className="p-8 bg-surface-container text-on-surface-variant min-h-screen"
    >
      <div className="mb-8">
        <h2 className="text-[32px] font-bold text-on-surface-variant mb-1">
          {t("dashboardTitle")}
        </h2>
        <p className="text-on-surface-variant/80 text-sm">
          {t("dashboardSubtitle")}
        </p>
      </div>

      {/* الكاردات العليا */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="lg:col-span-3 bg-primary-container p-6 rounded-3xl shadow-sm text-primary relative overflow-hidden border border-white/30 flex flex-col justify-between">
          <span className="material-symbols-outlined absolute right-4 -bottom-4 text-[120px] opacity-10 pointer-events-none select-none">
            payments
          </span>
          <div className="relative z-10">
            <p className="text-xs uppercase tracking-widest font-bold mb-1 opacity-80 text-primary">
              {t("totalDonations")}
            </p>
            <h3 className="text-[36px] font-extrabold leading-tight text-primary mb-3">
              {stats?.total_donations
                ? `$${stats.total_donations.toLocaleString()}`
                : "$0"}
            </h3>
            <div className="flex items-center gap-2 font-semibold text-xs bg-surface-lowest/50 w-fit px-3 py-1.5 rounded-full text-primary shadow-xs">
              <span>
                📈 {stats?.donations_growth_percentage || 0}% {t("growth")}
              </span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <StatCard
            icon="task_alt"
            title={t("completedCases")}
            val={
              stats?.completed_cases
                ? stats.completed_cases.toLocaleString()
                : "0"
            }
            bg="bg-[#e0ea88]"
          />
        </div>

        <div className="lg:col-span-2">
          <StatCard
            icon="category"
            title={t("assistanceTypes")}
            val="5"
            bg="bg-[#b3e4c2]"
          />
        </div>

        <div className="lg:col-span-2">
          <StatCard
            icon="volunteer_activism"
            title={t("targetedCompletedCases")}
            val={
              stats?.targeted_completed_cases
                ? stats.targeted_completed_cases.toLocaleString()
                : "0"
            }
            bg="bg-[#ffcad4]"
          />
        </div>
      </div>

      {/* الرسوم البيانية */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        <div className="bg-surface-lowest p-3 rounded-3xl shadow-sm border border-border flex flex-col h-[480px]">
          <div className="flex-1 w-full h-full flex flex-col [&>div]:h-full [&>div]:flex-1">
            <DonationChart
              period={period}
              setPeriod={setPeriod}
              currentData={charts || []}
              t={t}
              lang={lang}
            />
          </div>
        </div>
        <div className="bg-surface-lowest p-3 rounded-3xl shadow-sm border border-border flex flex-col h-[480px]">
          <div className="flex-1 w-full h-full flex flex-col [&>div]:h-full [&>div]:flex-1">
            <RequestsChart
              t={t}
              dataFromBackend={requestsCharts || []}
              lang={lang}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
