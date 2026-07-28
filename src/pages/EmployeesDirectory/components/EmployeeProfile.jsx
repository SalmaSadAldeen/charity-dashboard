import { Mail, Phone, Calendar, User, Clock, Globe } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { useSelector } from "react-redux";

export default function EmployeeProfile() {
  const { t, lang } = useTranslation();
  const details = useSelector((state) => state.employees.selectedDetails);
  const detailsStatus = useSelector((state) => state.employees.detailsStatus);

  if (detailsStatus === "loading") return <div>جاري التحميل...</div>;
  if (!details) return null;

  const isRTL = lang === "ar";
  const { personalPhoto, dateOfBirth } = details.employee || {};

  // دالة موحدة لتنسيق التواريخ حسب لغة التطبيق (عربي/إنجليزي)
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "-";

    const locale = isRTL ? "ar-EG" : "en-GB";

    return new Intl.DateTimeFormat(locale, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
  };

  return (
    <div
      className={`max-w-md mx-auto mt-10 ${isRTL ? "rtl" : "ltr"}`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="bg-surface-lowest rounded-[2rem] border border-border shadow-xl overflow-hidden">
        {/* الهيدر مع الصورة */}
        <div className="h-32 bg-primary relative">
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
            <div className="w-28 h-28 rounded-full border-4 border-white bg-surface-container flex items-center justify-center text-primary font-bold text-4xl shadow-lg overflow-hidden">
              {personalPhoto ? (
                <img
                  src={personalPhoto}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                details.firstName?.charAt(0)
              )}
            </div>
          </div>
        </div>

        <div className="pt-16 pb-8 px-8 text-center">
          <h1 className="text-2xl font-bold text-on-surface-variant">{`${details.firstName} ${details.lastName}`}</h1>

          {/* استخدام Grid لضمان استقامة العناوين والقيم */}
          <div className="grid grid-cols-1 gap-y-4 mt-8">
            <DetailRow
              icon={<Mail size={18} />}
              label={t("email")}
              value={details.email}
            />
            <DetailRow
              icon={<Phone size={18} />}
              label={t("phoneNumber")}
              value={details.number}
            />
            <DetailRow
              icon={<Globe size={18} />}
              label={t("countryName")}
              value={t("syria")}
            />
            <DetailRow
              icon={<Calendar size={18} />}
              label={t("birthDate")}
              value={formatDate(dateOfBirth)}
            />
            <DetailRow
              icon={<Clock size={18} />}
              label={t("joinedAt")}
              value={formatDate(details.createdAt)}
            />
            <DetailRow
              icon={<User size={18} />}
              label={t("gender")}
              value={details.gender === "MALE" ? t("male") : t("female")}
            />
          </div>

          {/* قسم الأدوار */}
          <div className="mt-8 pt-6 border-t border-border">
            <p className="text-xs text-gray-400 uppercase mb-3 text-start font-bold">
              {t("permissionsAndRoles")}
            </p>
            <div className="flex flex-wrap gap-2">
              {details.roles?.map((r) => (
                <span
                  key={r.role.id}
                  className="px-3 py-1 bg-surface-container text-primary rounded-full text-xs font-bold border border-primary/10"
                >
                  {r.role.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// تعديل التنسيق ليكون متساوياً تماماً
const DetailRow = ({ icon, label, value }) => (
  <div className="flex items-center gap-2 text-on-surface-variant">
    <div className="text-primary w-6 flex justify-center">{icon}</div>
    <span className="text-sm font-bold text-gray-500 w-28 text-start flex-shrink-0">
      {label}:
    </span>
    <span className="text-m font-medium text-on-surface text-start truncate">
      {value}
    </span>
  </div>
);
