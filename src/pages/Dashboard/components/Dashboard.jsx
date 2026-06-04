import { useState } from "react";
import { useSelector } from "react-redux";
import { translations } from "../../../context/translations";
import StatCard from "./StatCard";
import DonationChart from "./DonationChart";
import RequestsChart from "./RequestsChart";

export default function Dashboard() {
  const [view, setView] = useState("weekly");
  const lang = useSelector((state) => state.language.lang);
  const t = (key) => translations[lang][key] || key;
  const getDayLabel = (ar, en) => (lang === "ar" ? ar : en);

  const weeklyData = [
    { day: getDayLabel("اثنين", "Mon"), val: 40 },
    { day: getDayLabel("ثلاثاء", "Tue"), val: 65 },
    { day: getDayLabel("أربعاء", "Wed"), val: 85 },
    { day: getDayLabel("خميس", "Thu"), val: 55 },
    { day: getDayLabel("جمعة", "Fri"), val: 70 },
    { day: getDayLabel("سبت", "Sat"), val: 30 },
    { day: getDayLabel("أحد", "Sun"), val: 20 },
  ];

  const yearlyData = [
    { day: getDayLabel("يناير", "Jan"), val: 30 },
    { day: getDayLabel("فبراير", "Feb"), val: 45 },
    { day: getDayLabel("مارس", "Mar"), val: 70 },
    { day: getDayLabel("أبريل", "Apr"), val: 50 },
    { day: getDayLabel("مايو", "May"), val: 80 },
    { day: getDayLabel("يونيو", "Jun"), val: 60 },
    { day: getDayLabel("يوليو", "Jul"), val: 90 },
    { day: getDayLabel("أغسطس", "Aug"), val: 75 },
    { day: getDayLabel("سبتمبر", "Sep"), val: 55 },
  ];

  const currentData = view === "weekly" ? weeklyData : yearlyData;

  return (
    <main
      dir={lang === "ar" ? "rtl" : "ltr"}
      className="p-8 bg-[#f5ede0]  text-on-surface-variant"
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
        {/* المربع الكبير */}
        {/* المربع الكبير */}
        {/* المربع الكبير */}
        {/* المربع الكبير */}
        <div className="md:col-span-2 bg-[#fad564] p-8 rounded-3xl shadow-[0_10px_30px_-5px_rgba(250,213,100,0.5)] text-primary relative overflow-hidden border border-white/30">
          <span className="material-symbols-outlined absolute -right-4 -bottom-6 text-[160px] opacity-20 pointer-events-none select-none">
            payments
          </span>
          <div className="relative z-10">
            <p className="text-xs uppercase tracking-widest font-bold mb-2 opacity-80 text-primary">
              {t("totalDonations")}
            </p>
            <h3 className="text-[48px] font-extrabold leading-tight mb-4 text-primary">
              $4,829,150
            </h3>
            <div className="flex items-center gap-2 font-semibold text-sm bg-white/30 w-fit px-3 py-1 rounded-full text-primary">
              <span>📈 {t("growth")}</span>
            </div>
          </div>
        </div>
        {/* المربعات الصغيرة */}
        <StatCard
          icon="task_alt"
          title={t("completedCases")}
          val={t("casesVal")}
          bg="bg-[#e0ea88]"
        />
        <StatCard
          icon="medical_services"
          title={t("assistanceTypes")}
          val={t("typesVal")}
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
        <RequestsChart t={t} />
      </div>
    </main>
  );
}
