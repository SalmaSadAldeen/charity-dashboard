import { useState, useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { translations } from "../../context/translations";
import StatCard from "./components/StatCard";
import DonationChart from "./components/DonationChart";
import RequestsChart from "./components/RequestsChart";

export default function Dashboard() {
  const [view, setView] = useState("weekly");
  const dispatch = useDispatch();

  const lang = useSelector((state) => state.language.lang);
  const t = (key) => translations[lang][key] || key;
  const getDayLabel = (ar, en) => (lang === "ar" ? ar : en);

  const dashboardData = useSelector((state) => state.dashboard);

  useEffect(() => {
    // dispatch(fetchDashboardData());
  }, [dispatch]);

  const weeklyData = useMemo(() => {
    const source = dashboardData?.weeklyData || [0, 0, 0, 0, 0, 0, 0];
    return [
      { day: getDayLabel("اثنين", "Mon"), val: source[0] },
      { day: getDayLabel("ثلاثاء", "Tue"), val: source[1] },
      { day: getDayLabel("أربعاء", "Wed"), val: source[2] },
      { day: getDayLabel("خميس", "Thu"), val: source[3] },
      { day: getDayLabel("جمعة", "Fri"), val: source[4] },
      { day: getDayLabel("سبت", "Sat"), val: source[5] },
      { day: getDayLabel("أحد", "Sun"), val: source[6] },
    ];
  }, [dashboardData?.weeklyData, lang]);

  const yearlyData = useMemo(() => {
    // تأكدي من جلب 12 قيمة من الـ Store
    const source = dashboardData?.yearlyData || [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ];

    return [
      { day: getDayLabel("يناير", "Jan"), val: source[0] },
      { day: getDayLabel("فبراير", "Feb"), val: source[1] },
      { day: getDayLabel("مارس", "Mar"), val: source[2] },
      { day: getDayLabel("أبريل", "Apr"), val: source[3] },
      { day: getDayLabel("مايو", "May"), val: source[4] },
      { day: getDayLabel("يونيو", "Jun"), val: source[5] },
      { day: getDayLabel("يوليو", "Jul"), val: source[6] },
      { day: getDayLabel("أغسطس", "Aug"), val: source[7] },
      { day: getDayLabel("سبتمبر", "Sep"), val: source[8] },
      { day: getDayLabel("أكتوبر", "Oct"), val: source[9] },
      { day: getDayLabel("نوفمبر", "Nov"), val: source[10] },
      { day: getDayLabel("ديسمبر", "Dec"), val: source[11] },
    ];
  }, [dashboardData?.yearlyData, lang]);

  const currentData = view === "weekly" ? weeklyData : yearlyData;

  return (
    <main
      dir={lang === "ar" ? "rtl" : "ltr"}
      className="p-8 bg-[#f5ede0] text-on-surface-variant"
    >
      {/* العنوان */}
      <div className="mb-8">
        <h2 className="text-[32px] font-bold text-[#1f1b14] mb-1">
          {t("dashboardTitle")}
        </h2>
        <p className="text-on-surface-variant">{t("dashboardSubtitle")}</p>
      </div>

      {/* الإحصائيات */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="md:col-span-2 bg-[#fad564] p-8 rounded-3xl shadow-[0_10px_30px_-5px_rgba(250,213,100,0.5)] text-primary relative overflow-hidden border border-white/30">
          <span className="material-symbols-outlined absolute -right-4 -bottom-6 text-[160px] opacity-20 pointer-events-none select-none">
            payments
          </span>
          <div className="relative z-10">
            <p className="text-xs uppercase tracking-widest font-bold mb-2 opacity-80 text-primary">
              {t("totalDonations")}
            </p>
            <h3 className="text-[48px] font-extrabold leading-tight mb-4 text-primary">
              {dashboardData?.totalDonations || "$0"}
            </h3>
            <div className="flex items-center gap-2 font-semibold text-sm bg-white/30 w-fit px-3 py-1 rounded-full text-primary">
              <span>📈 {t("growth")}</span>
            </div>
          </div>
        </div>

        <StatCard
          icon="task_alt"
          title={t("completedCases")}
          val={dashboardData?.completedCases || "0"}
          bg="bg-[#e0ea88]"
        />
        <StatCard
          icon="medical_services"
          title={t("assistanceTypes")}
          val={dashboardData?.assistanceTypes || "0"}
          bg="bg-[#b3e4c2]"
        />
      </div>

      {/* الرسوم البيانية */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <DonationChart
          view={view}
          setView={setView}
          currentData={currentData}
          t={t}
        />
        <RequestsChart t={t} dataFromBackend={dashboardData?.requestsData} />
      </div>
    </main>
  );
}
