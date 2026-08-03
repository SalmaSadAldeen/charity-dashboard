import { User, Phone, Mail } from "lucide-react";

export default function DonorInfoCard({ donor, t }) {
  if (!donor) return null;

  const fullName = `${donor?.firstName || ""} ${donor?.lastName || ""}`.trim();
  const phone = donor?.phone || donor?.phoneNumber || donor?.phone_number;
  const email = donor?.email;

  return (
    <div className="bg-surface/30 p-6 rounded-3xl space-y-4 border border-border/50">
      <h3 className="font-bold text-lg text-primary border-b pb-3 flex items-center gap-2">
        <User size={20} />
        {t("donor_info")}
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* عرض الاسم إذا وجد */}
        {fullName && (
          <div className="bg-surface-lowest p-4 rounded-2xl border border-border/60 shadow-2xs flex flex-col justify-between space-y-1.5 sm:col-span-2">
            <div className="flex items-center gap-2 text-xs font-medium text-gray-400">
              <User size={16} className="text-primary" />
              <span>{t("donor_name")}</span>
            </div>
            <div className="text-base font-bold text-on-surface-variant">
              {fullName}
            </div>
          </div>
        )}

        {/* عرض رقم الهاتف إذا وجد فقط، وإذا لم يوجد يختفي مع الليبل */}
        {phone && (
          <div className="bg-surface-lowest p-4 rounded-2xl border border-border/60 shadow-2xs flex flex-col justify-between space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-medium text-gray-400">
              <Phone size={16} className="text-primary" />
              <span>{t("phone") || "رقم الهاتف"}</span>
            </div>
            <div className="text-sm font-bold text-on-surface-variant" dir="ltr">
              {phone}
            </div>
          </div>
        )}

        {/* عرض البريد الإلكتروني إذا وجد فقط، وإذا لم يوجد يختفي مع الليبل */}
        {email && (
          <div className="bg-surface-lowest p-4 rounded-2xl border border-border/60 shadow-2xs flex flex-col justify-between space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-medium text-gray-400">
              <Mail size={16} className="text-primary" />
              <span>{t("email") || "البريد الإلكتروني"}</span>
            </div>
            <div className="text-sm font-bold text-on-surface-variant truncate">
              {email}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}