import {
  User,
  Mail,
  Calendar,
  ShieldCheck,
  Phone,
  UserCheck,
  Lock,
} from "lucide-react";

export function ProfileInfo({ profileData, t, formatDate }) {
  return (
    <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-6">
      <div className="bg-surface-lowest rounded-3xl p-6 sm:p-8 shadow-md hover:shadow-lg transition-all duration-300 border border-border/80 flex flex-col gap-6">
        <div className="flex items-center justify-between pb-4 border-b border-border/60">
          <h3 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-primary/10 text-primary border border-primary/20 shadow-2xs shrink-0">
              <User className="w-5 h-5" />
            </div>
            <span className="truncate">
              {t("accountInfo") || "معلومات الحساب الشخصية"}
            </span>
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-surface/60 hover:bg-surface border border-border/60 hover:border-primary/30 transition-all duration-200 flex flex-col justify-center gap-1.5 shadow-2xs group/item">
            <span className="text-slate-400 font-bold text-[11px] uppercase tracking-wider truncate group-hover/item:text-primary transition-colors">
              {t("firstName") || "الاسم الأول"}
            </span>
            <span className="font-bold text-slate-900 text-base truncate">
              {profileData.firstName}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-surface/60 hover:bg-surface border border-border/60 hover:border-primary/30 transition-all duration-200 flex flex-col justify-center gap-1.5 shadow-2xs group/item">
            <span className="text-slate-400 font-bold text-[11px] uppercase tracking-wider truncate group-hover/item:text-primary transition-colors">
              {t("lastName") || "اسم العائلة"}
            </span>
            <span className="font-bold text-slate-900 text-base truncate">
              {profileData.lastName}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-surface/60 hover:bg-surface border border-border/60 hover:border-primary/30 transition-all duration-200 flex flex-col justify-center gap-1.5 shadow-2xs group/item">
            <span className="text-slate-400 font-bold text-[11px] uppercase tracking-wider flex items-center gap-1.5 truncate group-hover/item:text-primary transition-colors">
              <UserCheck className="w-3.5 h-3.5 text-primary shrink-0" />
              <span className="truncate">{t("gender") || "الجنس"}</span>
            </span>
            <span className="font-bold text-slate-900 text-base truncate">
              {t(profileData.gender?.toLowerCase()) || profileData.gender}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-surface/60 hover:bg-surface border border-border/60 hover:border-primary/30 transition-all duration-200 flex flex-col justify-center gap-1.5 shadow-2xs group/item">
            <span className="text-slate-400 font-bold text-[11px] uppercase tracking-wider flex items-center gap-1.5 truncate group-hover/item:text-primary transition-colors">
              <Calendar className="w-3.5 h-3.5 text-primary shrink-0" />
              <span className="truncate">
                {t("dateOfBirth") || "تاريخ الميلاد"}
              </span>
            </span>
            <span
              className="font-extrabold text-slate-900 text-base font-mono truncate"
              dir="ltr"
            >
              {formatDate(profileData.dateOfBirth)}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-surface/60 hover:bg-surface border border-border/60 hover:border-primary/30 transition-all duration-200 flex flex-col justify-center gap-1.5 sm:col-span-2 shadow-2xs group/item">
            <span className="text-slate-400 font-bold text-[11px] uppercase tracking-wider flex items-center gap-1.5 truncate group-hover/item:text-primary transition-colors">
              <Mail className="w-3.5 h-3.5 text-primary shrink-0" />
              <span className="truncate">
                {t("email") || "البريد الإلكتروني"}
              </span>
            </span>
            <span
              className="font-bold text-slate-800 text-sm font-mono truncate"
              dir="ltr"
            >
              {profileData.email}
            </span>
          </div>

          {profileData.number && (
            <div className="p-4 rounded-2xl bg-surface/60 hover:bg-surface border border-border/60 hover:border-primary/30 transition-all duration-200 flex flex-col justify-center gap-1.5 sm:col-span-2 shadow-2xs group/item">
              <span className="text-slate-400 font-bold text-[11px] uppercase tracking-wider flex items-center gap-1.5 truncate group-hover/item:text-primary transition-colors">
                <Phone className="w-3.5 h-3.5 text-primary shrink-0" />
                <span className="truncate">
                  {t("phoneNumber") || "رقم الهاتف"}
                </span>
              </span>
              <span
                className="font-bold text-slate-800 text-sm font-mono truncate"
                dir="ltr"
              >
                {profileData.countryCode} {profileData.number}
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-5 pt-6 border-t border-border/60">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-primary/10 text-primary border border-primary/20 shadow-2xs shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="truncate">
                {t("permissionsAndRoles") || "الصلاحيات والأدوار"}
              </span>
            </h3>
          </div>
          <div className="flex flex-col gap-5 pt-6 border-t border-border/60">
            <div className="flex flex-wrap items-center gap-2.5">
              {profileData.roles && profileData.roles.length > 0 ? (
                profileData.roles.map((role) => (
                  <div
                    key={role.id}
                    className="px-4 py-2 rounded-2xl bg-primary/5 hover:bg-primary/10 border border-primary/20 text-primary-dark text-xs font-extrabold inline-flex items-center gap-2 transition-all duration-200 shadow-2xs"
                  >
                    <span className="w-2 h-2 rounded-full bg-primary shrink-0 animate-pulse" />
                    <span className="truncate">{role.label}</span>
                  </div>
                ))
              ) : (
                <p className="w-full text-xs text-slate-400 italic font-medium text-center py-4">
                  {t("noRoles") || "لا توجد أدوار معينة"}
                </p>
              )}
            </div>

            <div className="pt-2 flex items-center justify-center">
              <div className="w-full p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 text-xs font-black tracking-wide flex items-center justify-center gap-2.5 shadow-2xs">
                <Lock className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  {t("securityStatussecured") || "الحساب محمي وآمن بالكامل"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
