// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getProfile } from "@/store/index";
// import { useTranslation } from "@/hooks/useTranslation";
// import {
//   User,
//   Mail,
//   Calendar,
//   ShieldCheck,
//   Loader2,
//   Phone,
//   UserCheck,
//   LogOut,
//   Sparkles,
//   ShieldAlert,
//   KeyRound,
//   Lock,
// } from "lucide-react";

// export function ProfilePage() {
//   const dispatch = useDispatch();
//   const { t, lang } = useTranslation();
//   const isRTL = lang === "ar";

//   const profileData = useSelector((state) => state.profile?.selectedDetails);
//   const status = useSelector((state) => state.profile?.detailsStatus);
//   const error = useSelector((state) => state.profile?.error);

//   useEffect(() => {
//     dispatch(getProfile());
//   }, [dispatch, lang]);

//   const formatDate = (dateString) => {
//     if (!dateString) return "";
//     try {
//       const date = new Date(dateString);
//       if (isNaN(date.getTime())) return dateString;

//       return new Intl.DateTimeFormat(isRTL ? "ar-EG" : "en-US", {
//         year: "numeric",
//         month: "long",
//         day: "numeric",
//       }).format(date);
//     } catch {
//       return dateString;
//     }
//   };

//   if (status === "loading" || status === "idle") {
//     return (
//       <div className="h-full min-h-screen w-full flex items-center justify-center bg-surface p-4">
//         <div className="relative flex flex-col items-center justify-center p-8 bg-surface-lowest rounded-3xl border border-border/60 shadow-xl gap-4 animate-pulse">
//           <Loader2 className="w-10 h-10 animate-spin text-primary" />
//           <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">جاري تحميل البروفايل...</span>
//         </div>
//       </div>
//     );
//   }

//   if (status === "failed") {
//     return (
//       <div className="h-full min-h-screen w-full flex items-center justify-center p-4 bg-surface">
//         <div
//           className={`p-8 text-center bg-surface-lowest shadow-xl rounded-3xl border border-border max-w-md w-full relative overflow-hidden transition-all duration-300 ${
//             isRTL ? "text-right" : "text-left"
//           }`}
//           dir={isRTL ? "rtl" : "ltr"}
//         >
//           <div className="absolute top-0 left-0 right-0 h-1.5 bg-error" />
//           <div className="w-14 h-14 rounded-2xl bg-error/10 flex items-center justify-center mx-auto mb-5 text-error border border-error/20 shadow-inner">
//             <ShieldAlert className="w-7 h-7" />
//           </div>
//           <p className="font-bold text-lg text-slate-900">
//             {t("errorLoadingProfile") || "عذراً، حدث خطأ أثناء تحميل البروفايل"}
//           </p>
//           <p className="text-xs mt-4 text-slate-500 bg-surface p-4 rounded-2xl border border-border font-mono break-all shadow-xs">
//             {error}
//           </p>
//         </div>
//       </div>
//     );
//   }

//   if (!profileData) return null;

//   return (
//     <div
//       className="min-h-full w-full max-w-[1240px] mx-auto p-4 sm:p-6 md:p-8 flex flex-col gap-6 select-none box-border bg-transparent text-slate-800 transition-all duration-300"
//       dir={isRTL ? "rtl" : "ltr"}
//     >
//       {/* التنسيق الرئيسي للواجهة المميزة */}
//       <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

//         {/* 1. كارد البروفايل الجانبي الفخم (Hero Sidebar Card) */}
//         <div className="lg:col-span-5 xl:col-span-4 bg-surface-lowest rounded-3xl border border-border/80 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden relative group">

//           {/* غلاف الكارد السلبي المتدرج (Cover Header) */}
//           <div className="h-36 w-full bg-gradient-to-r from-primary/30 via-primary/10 to-primary/20 relative overflow-hidden">
//             <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[bottom_1px_center]" />
//             <div className="absolute -top-12 -left-12 w-36 h-36 bg-primary/20 rounded-full blur-2xl" />
//           </div>

//           {/* محتوى كارد البروفايل */}
//           <div className="px-6 pb-6 relative flex flex-col items-center text-center gap-5 -mt-20">

//             {/* الصورة الشخصية الكبيرة بأسلوب البورتريه */}
//             <div className="relative group/avatar">
//               <div className="absolute -inset-1 bg-gradient-to-r from-primary to-primary/40 rounded-3xl blur-md opacity-30 group-hover/avatar:opacity-75 transition duration-500" />
//               <img
//                 src={profileData.personalPhoto}
//                 alt={profileData.fullName}
//                 className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-3xl object-cover bg-surface border-4 border-surface-lowest shadow-xl transition-all duration-300 group-hover/avatar:scale-[1.02]"
//               />
//             </div>

//             {/* الاسم ونوع الحساب */}
//             <div className="flex flex-col items-center gap-2 w-full">
//               <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-black tracking-wide uppercase shadow-2xs">
//                 <Sparkles className="w-3.5 h-3.5 shrink-0" />
//                 <span className="truncate">{t(profileData.userType?.toLowerCase()) || profileData.userType}</span>
//               </div>

//               <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight w-full break-words">
//                 {profileData.fullName}
//               </h1>
//             </div>

//             {/* مؤشر عدد الصلاحيات الممنوحة (مبني على داتا الـ API الفعلية) */}
//             <div className="w-full pt-1">
//               <div className="p-3.5 rounded-2xl bg-surface/80 border border-border/60 flex items-center justify-center gap-2">
//                 <KeyRound className="w-4 h-4 text-primary shrink-0" />
//                 <span className="text-xs font-bold text-slate-600">
//                   {profileData.roles?.length || 0} {t("rolesCount") || "صلاحيات وأدوار مخصصة"}
//                 </span>
//               </div>
//             </div>

//             <hr className="w-full border-border/60 my-1" />

//             {/* زر تسجيل الخروج */}
//             <button
//               onClick={() => {}}
//               className="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-surface hover:bg-error/10 text-slate-700 hover:text-error text-sm font-bold transition-all duration-200 border border-border hover:border-error/30 shadow-xs hover:shadow-sm w-full cursor-pointer active:scale-95 group/btn"
//             >
//               <LogOut className="w-4 h-4 shrink-0 transition-transform group-hover/btn:-translate-x-0.5" />
//               <span>{t("logout") || "تسجيل الخروج"}</span>
//             </button>

//           </div>
//         </div>

//         {/* 2. قسم المحتوى والتفاصيل الأساسية (Main Content Cards) */}
//         <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-6">

//           {/* كارد معلومات الحساب */}
//           <div className="bg-surface-lowest rounded-3xl p-6 sm:p-8 shadow-md hover:shadow-lg transition-all duration-300 border border-border/80 flex flex-col gap-6">

//             {/* عنوان القسم */}
//             <div className="flex items-center justify-between pb-4 border-b border-border/60">
//               <h3 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-3">
//                 <div className="p-2.5 rounded-2xl bg-primary/10 text-primary border border-primary/20 shadow-2xs shrink-0">
//                   <User className="w-5 h-5" />
//                 </div>
//                 <span className="truncate">{t("accountInfo") || "معلومات الحساب الشخصية"}</span>
//               </h3>
//             </div>

//             {/* شبكة البطاقات الصغيرة */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

//               {/* الاسم الأول */}
//               <div className="p-4 rounded-2xl bg-surface/60 hover:bg-surface border border-border/60 hover:border-primary/30 transition-all duration-200 flex flex-col justify-center gap-1.5 shadow-2xs group/item">
//                 <span className="text-slate-400 font-bold text-[11px] uppercase tracking-wider truncate group-hover/item:text-primary transition-colors">
//                   {t("firstName") || "الاسم الأول"}
//                 </span>
//                 <span className="font-bold text-slate-900 text-base truncate">
//                   {profileData.firstName}
//                 </span>
//               </div>

//               {/* اسم العائلة */}
//               <div className="p-4 rounded-2xl bg-surface/60 hover:bg-surface border border-border/60 hover:border-primary/30 transition-all duration-200 flex flex-col justify-center gap-1.5 shadow-2xs group/item">
//                 <span className="text-slate-400 font-bold text-[11px] uppercase tracking-wider truncate group-hover/item:text-primary transition-colors">
//                   {t("lastName") || "اسم العائلة"}
//                 </span>
//                 <span className="font-bold text-slate-900 text-base truncate">
//                   {profileData.lastName}
//                 </span>
//               </div>

//               {/* الجنس */}
//               <div className="p-4 rounded-2xl bg-surface/60 hover:bg-surface border border-border/60 hover:border-primary/30 transition-all duration-200 flex flex-col justify-center gap-1.5 shadow-2xs group/item">
//                 <span className="text-slate-400 font-bold text-[11px] uppercase tracking-wider flex items-center gap-1.5 truncate group-hover/item:text-primary transition-colors">
//                   <UserCheck className="w-3.5 h-3.5 text-primary shrink-0" />
//                   <span className="truncate">{t("gender") || "الجنس"}</span>
//                 </span>
//                 <span className="font-bold text-slate-900 text-base truncate">
//                   {t(profileData.gender?.toLowerCase()) || profileData.gender}
//                 </span>
//               </div>

//               {/* تاريخ الميلاد */}
//               <div className="p-4 rounded-2xl bg-surface/60 hover:bg-surface border border-border/60 hover:border-primary/30 transition-all duration-200 flex flex-col justify-center gap-1.5 shadow-2xs group/item">
//                 <span className="text-slate-400 font-bold text-[11px] uppercase tracking-wider flex items-center gap-1.5 truncate group-hover/item:text-primary transition-colors">
//                   <Calendar className="w-3.5 h-3.5 text-primary shrink-0" />
//                   <span className="truncate">{t("birthOfDate") || "تاريخ الميلاد"}</span>
//                 </span>
//                 <span className="font-bold text-slate-800 text-sm font-mono truncate" dir="ltr">
//                   {formatDate(profileData.dateOfBirth)}
//                 </span>
//               </div>

//               {/* البريد الإلكتروني */}
//               <div className="p-4 rounded-2xl bg-surface/60 hover:bg-surface border border-border/60 hover:border-primary/30 transition-all duration-200 flex flex-col justify-center gap-1.5 sm:col-span-2 shadow-2xs group/item">
//                 <span className="text-slate-400 font-bold text-[11px] uppercase tracking-wider flex items-center gap-1.5 truncate group-hover/item:text-primary transition-colors">
//                   <Mail className="w-3.5 h-3.5 text-primary shrink-0" />
//                   <span className="truncate">{t("email") || "البريد الإلكتروني"}</span>
//                 </span>
//                 <span className="font-bold text-slate-800 text-sm font-mono truncate" dir="ltr">
//                   {profileData.email}
//                 </span>
//               </div>

//               {/* رقم الهاتف */}
//               {profileData.number && (
//                 <div className="p-4 rounded-2xl bg-surface/60 hover:bg-surface border border-border/60 hover:border-primary/30 transition-all duration-200 flex flex-col justify-center gap-1.5 sm:col-span-2 shadow-2xs group/item">
//                   <span className="text-slate-400 font-bold text-[11px] uppercase tracking-wider flex items-center gap-1.5 truncate group-hover/item:text-primary transition-colors">
//                     <Phone className="w-3.5 h-3.5 text-primary shrink-0" />
//                     <span className="truncate">{t("phoneNumber") || "رقم الهاتف"}</span>
//                   </span>
//                   <span className="font-bold text-slate-800 text-sm font-mono truncate" dir="ltr">
//                     {profileData.countryCode} {profileData.number}
//                   </span>
//                 </div>
//               )}

//             </div>

//             {/* 3. الصلاحيات والأدوار والحالة الأمنية */}
//             <div className="flex flex-col gap-5 pt-6 border-t border-border/60">
//               <div className="flex items-center justify-between">
//                 <h3 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-3">
//                   <div className="p-2.5 rounded-2xl bg-primary/10 text-primary border border-primary/20 shadow-2xs shrink-0">
//                     <ShieldCheck className="w-5 h-5" />
//                   </div>
//                   <span className="truncate">{t("permissionsAndRoles") || "الصلاحيات والأدوار"}</span>
//                 </h3>
//               </div>

//               {/* شارات الصلاحيات */}
//               <div className="flex flex-wrap items-center gap-2.5">
//                 {profileData.roles && profileData.roles.length > 0 ? (
//                   profileData.roles.map((role) => (
//                     <div
//                       key={role.id}
//                       className="px-4 py-2 rounded-2xl bg-primary/5 hover:bg-primary/10 border border-primary/20 text-primary-dark text-xs font-extrabold inline-flex items-center gap-2 transition-all duration-200 shadow-2xs"
//                     >
//                       <span className="w-2 h-2 rounded-full bg-primary shrink-0 animate-pulse" />
//                       <span className="truncate">{role.label}</span>
//                     </div>
//                   ))
//                 ) : (
//                   <p className="w-full text-xs text-slate-400 italic font-medium text-center py-4">
//                     {t("noRoles") || "لا توجد أدوار معينة"}
//                   </p>
//                 )}
//               </div>

//               {/* شريط الحالة الأمنية الثابت */}
//               <div className="pt-2 flex items-center justify-center">
//                 <div className="w-full p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 text-xs font-black tracking-wide flex items-center justify-center gap-2.5 shadow-2xs">
//                   <Lock className="w-4 h-4 text-emerald-600 shrink-0" />
//                   <span>{t("securityStatussecured") || "الحساب محمي وآمن بالكامل"}</span>
//                 </div>
//               </div>

//             </div>

//           </div>

//         </div>

//       </div>
//     </div>
//   );
// }

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "@/store/index";
import { useTranslation } from "@/hooks/useTranslation";
import { Loader2, ShieldAlert } from "lucide-react";
import { ProfileHero } from "@/pages/ProfilePage/components/ProfileHero";
import { ProfileInfo } from "@/pages/ProfilePage/components/ProfileInfo";

export function ProfilePage() {
  const dispatch = useDispatch();
  const { t, lang } = useTranslation();
  const isRTL = lang === "ar";

  const profileData = useSelector((state) => state.profile?.selectedDetails);
  const status = useSelector((state) => state.profile?.detailsStatus);
  const error = useSelector((state) => state.profile?.error);

  useEffect(() => {
    dispatch(getProfile());
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

  if (status === "loading" || status === "idle") {
    return (
      <div className="h-full min-h-screen w-full flex items-center justify-center bg-surface p-4">
        <div className="relative flex flex-col items-center justify-center p-8 bg-surface-lowest rounded-3xl border border-border/60 shadow-xl gap-4 animate-pulse">
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            جاري تحميل البروفايل...
          </span>
        </div>
      </div>
    );
  }

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

  if (!profileData) return null;

  return (
    <div
      className="min-h-full w-full max-w-[1240px] mx-auto p-4 sm:p-6 md:p-8 flex flex-col gap-6 select-none box-border bg-transparent text-slate-800 transition-all duration-300"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* المكون الأول: البروفايل الجانبي */}
        <ProfileHero profileData={profileData} t={t} isRTL={isRTL} />

        {/* المكون الثاني: تفاصيل الحساب والمعلومات */}
        <ProfileInfo
          profileData={profileData}
          t={t}
          isRTL={isRTL}
          formatDate={formatDate}
        />
      </div>
    </div>
  );
}
