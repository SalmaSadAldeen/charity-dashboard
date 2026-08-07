import { User, Phone, Mail } from "lucide-react";

export default function DonorInfoCard({ donor, t }) {
  if (!donor) return null;

  const fullName = `${donor?.firstName || ""} ${donor?.lastName || ""}`.trim();
  const phone = donor?.number;
  const email = donor?.email;

  return (
    <div className="w-full bg-surface/35 p-4 rounded-3xl space-y-3 border border-border/50">
      <h3 className="font-bold text-base text-primary border-b border-border/40 pb-2.5 flex items-center gap-2">
        <User size={18} />
        {t("donor_info")}
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
        {/* الاسم يأخذ العرض كامل */}
        {fullName && (
          <div className="w-full bg-surface-lowest p-3 rounded-2xl border border-border/60 shadow-2xs flex flex-col justify-between space-y-1 sm:col-span-2">
            <div className="flex items-center gap-2 text-[11px] font-medium text-gray-400">
              <User size={14} className="text-primary" />
              <span>{t("donor_name")}</span>
            </div>
            <div className="text-sm font-bold pl-3  text-on-surface-variant">
              {fullName}
            </div>
          </div>
        )}

        {/* الهاتف */}
        {phone && (
          <div className="w-full bg-surface-lowest p-3 rounded-2xl border border-border/60 shadow-2xs flex flex-col justify-between space-y-1">
            <div className="flex items-center gap-2 text-[11px] font-medium text-gray-400">
              <Phone size={14} className="text-primary" />
              <span>{t("phone")}</span>
            </div>
            <div
              className="text-xs font-bold pl-3 text-on-surface-variant tracking-wide"
              dir="ltr"
            >
              {phone}
            </div>
          </div>
        )}

        {/* البريد الإلكتروني */}
        {email && (
          <div className="w-full bg-surface-lowest p-3 rounded-2xl border border-border/60 shadow-2xs flex flex-col justify-between space-y-1">
            <div className="flex items-center gap-2 text-[11px] font-medium text-gray-400">
              <Mail size={14} className="text-primary" />
              <span>{t("email")}</span>
            </div>
            <div className="text-xs font-bold pl-3 text-on-surface-variant truncate">
              {email}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
