import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "@/store/index";
import { useTranslation } from "@/hooks/useTranslation";
import { ShieldAlert } from "lucide-react";
import { ProfileHero } from "@/pages/ProfilePage/components/ProfileHero";
import { ProfileInfo } from "@/pages/ProfilePage/components/ProfileInfo";

export function ProfilePage() {
  const dispatch = useDispatch();
  const { t, lang } = useTranslation();
  const isRTL = lang === "ar";

  // تتبع حالة ما إذا تم انتهاء أول عملية جلب للبيانات لضمان استقرار العرض
  const [hasLoadedAtLeastOnce, setHasLoadedAtLeastOnce] = useState(false);

  const profileData = useSelector((state) => state.profile?.selectedDetails);
  const status = useSelector((state) => state.profile?.detailsStatus);
  const error = useSelector((state) => state.profile?.error);

  useEffect(() => {
    setHasLoadedAtLeastOnce(false);
    dispatch(getProfile()).then(() => {
      setHasLoadedAtLeastOnce(true);
    });
  }, [dispatch, lang]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString;

      return new Intl.DateTimeFormat(isRTL ? "ar-EG" : "en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(date);
    } catch {
      return dateString;
    }
  };

  // هل يتم عرض السكيليتون الرمادي الآن؟ (عند التحميل الأول أَوْ غياب الداتا تماماً)
  const showSkeleton = (status === "loading" || status === "idle" || !hasLoadedAtLeastOnce) && !profileData;

  if (status === "failed") {
    return (
      <div className="h-full min-h-screen w-full flex items-center justify-center p-4 bg-surface">
        <div
          className={`p-8 text-center bg-surface-lowest shadow-xl rounded-3xl border border-border max-w-md w-full relative overflow-hidden transition-all duration-300 ${
            isRTL ? "text-right" : "text-left"
          }`}
          dir={isRTL ? "rtl" : "ltr"}
        >
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-error" />
          <div className="w-14 h-14 rounded-2xl bg-error/10 flex items-center justify-center mx-auto mb-5 text-error border border-error/20 shadow-inner">
            <ShieldAlert className="w-7 h-7" />
          </div>
          <p className="font-bold text-lg text-slate-900">
            {t("errorLoadingProfile") || "عذراً، حدث خطأ أثناء تحميل البروفايل"}
          </p>
          <p className="text-xs mt-4 text-slate-500 bg-surface p-4 rounded-2xl border border-border font-mono break-all shadow-xs">
            {error}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-full w-full max-w-[1240px] mx-auto p-4 sm:p-6 md:p-8 flex flex-col gap-6 select-none box-border bg-transparent text-slate-800 transition-all duration-300"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* القسم الأول: البروفايل الجانبي */}
        <div className="lg:col-span-4 xl:col-span-4 w-full">
          {showSkeleton ? (
            <div className="bg-surface-lowest rounded-3xl p-8 min-h-[420px] border border-border/60 shadow-sm flex flex-col items-center gap-6 relative overflow-hidden animate-pulse">
              <div className="absolute top-0 left-0 right-0 h-24 bg-slate-100" />
              <div className="w-32 h-32 rounded-full bg-slate-200/80 mt-8 border-4 border-surface-lowest z-10" />
              <div className="w-full flex flex-col items-center gap-3 mt-4">
                <div className="w-2/3 h-5 bg-slate-200/80 rounded-md" />
                <div className="w-1/2 h-4 bg-slate-200/50 rounded-md" />
              </div>
              <div className="w-full h-12 bg-slate-100 rounded-xl mt-auto" />
            </div>
          ) : (
            <ProfileHero profileData={profileData} t={t} isRTL={isRTL} />
          )}
        </div>

        {/* القسم الثاني: تفاصيل الحساب والمعلومات */}
        <div className="lg:col-span-8 xl:col-span-8 w-full">
          {showSkeleton ? (
            <div className="bg-surface-lowest rounded-3xl p-8 min-h-[420px] border border-border/60 shadow-sm flex flex-col gap-8 animate-pulse">
              <div className="w-1/3 h-8 bg-slate-200/80 rounded-lg" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="w-full h-20 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col justify-center px-5 gap-3">
                    <div className="w-1/4 h-3 bg-slate-200/70 rounded" />
                    <div className="w-3/4 h-4 bg-slate-200 rounded" />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <ProfileInfo
              profileData={profileData}
              t={t}
              isRTL={isRTL}
              formatDate={formatDate}
            />
          )}
        </div>

      </div>
    </div>
  );
}