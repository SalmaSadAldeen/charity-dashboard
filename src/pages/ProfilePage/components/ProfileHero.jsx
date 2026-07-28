import { Sparkles, KeyRound, LogOut } from "lucide-react";

export function ProfileHero({ profileData, t, }) {
  return (
    <div className="lg:col-span-5 xl:col-span-4 bg-surface-lowest rounded-3xl border border-border/80 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden relative group">
      {/* غلاف الكارد العلوي المتدرج */}
      <div className="h-36 w-full bg-gradient-to-r from-primary/30 via-primary/10 to-primary/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[bottom_1px_center]" />
        <div className="absolute -top-12 -left-12 w-36 h-36 bg-primary/20 rounded-full blur-2xl" />
      </div>

      {/* محتوى كارد البروفايل */}
      <div className="px-6 pb-6 relative flex flex-col items-center text-center gap-5 -mt-20">
        {/* الصورة الشخصية */}
        <div className="relative group/avatar">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary to-primary/40 rounded-3xl blur-md opacity-30 group-hover/avatar:opacity-75 transition duration-500" />
          <img
            src={profileData.personalPhoto}
            alt={profileData.fullName}
            className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-3xl object-cover bg-surface border-4 border-surface-lowest shadow-xl transition-all duration-300 group-hover/avatar:scale-[1.02]"
          />
        </div>

        {/* الاسم ونوع الحساب */}
        <div className="flex flex-col items-center gap-2 w-full">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-black tracking-wide uppercase shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">
              {t(profileData.userType?.toLowerCase()) || profileData.userType}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight w-full break-words">
            {profileData.fullName}
          </h1>
        </div>

        {/* مؤشر عدد الصلاحيات الممنوحة (باللون الأخضر المطابق للحالة الأمنية) */}
        <div className="w-full pt-1">
          <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center gap-2">
            <KeyRound className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="text-xs font-black text-emerald-700">
              {profileData.roles?.length || 0}{" "}
              {t("rolesCount") || "صلاحيات وأدوار مخصصة"}
            </span>
          </div>
        </div>

        <hr className="w-full border-border/60 my-1" />

        {/* زر تسجيل الخروج */}
        <button
          onClick={() => {}}
          className="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-surface hover:bg-error/10 text-slate-700 hover:text-error text-sm font-bold transition-all duration-200 border border-border hover:border-error/30 shadow-xs hover:shadow-sm w-full cursor-pointer active:scale-95 group/btn"
        >
          <LogOut className="w-4 h-4 shrink-0 transition-transform group-hover/btn:-translate-x-0.5" />
          <span>{t("logout") || "تسجيل الخروج"}</span>
        </button>
      </div>
    </div>
  );
}
