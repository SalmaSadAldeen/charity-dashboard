import {
  Mail,
  Phone,
  Calendar,
  User,
  Briefcase,
  Clock,
  Globe,
} from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

export default function EmployeeProfile({ employee }) {
  const { t, lang } = useTranslation();
  const employeeDetails = employee.employee || {};

  return (
    <div className={`max-w-md mx-auto mt-10 ${lang === "ar" ? "rtl" : "ltr"}`}>
      <div className="bg-white rounded-[2rem] border border-border shadow-xl overflow-hidden">
        {/* الهيدر مع الصورة */}
        <div className="h-32 bg-primary relative">
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
            <div className="w-28 h-28 rounded-full border-4 border-white bg-surface-container flex items-center justify-center text-primary font-bold text-4xl shadow-lg overflow-hidden">
              {employeeDetails.personalPhoto ? (
                <img
                  src={employeeDetails.personalPhoto}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                employee.firstName?.charAt(0)
              )}
            </div>
          </div>
        </div>

        <div className="pt-16 pb-8 px-8 text-center">
          <h1 className="text-2xl font-bold text-on-surface-variant">{`${employee.firstName} ${employee.lastName}`}</h1>

          {/* هنا نستخدم Grid لضمان استقامة العناوين والقيم */}
          <div className="grid grid-cols-1 gap-y-4 mt-8">
            <DetailRow
              icon={<Mail size={18} />}
              label={t("email")}
              value={employee.email}
            />
            <DetailRow
              icon={<Phone size={18} />}
              label={t("phoneNumber")}
              value={employee.number}
            />
            <DetailRow
              icon={<Globe size={18} />}
              label={t("countryName")}
              value={t("syria")}
            />
            <DetailRow
              icon={<Calendar size={18} />}
              label={t("birthDate")}
              value={
                employeeDetails.dateOfBirth
                  ? new Date(employeeDetails.dateOfBirth).toLocaleDateString()
                  : "-"
              }
            />
            <DetailRow
              icon={<Clock size={18} />}
              label={t("joinedAt")}
              value={new Date(employee.createdAt).toLocaleDateString()}
            />
            <DetailRow
              icon={<Briefcase size={18} />}
              label={t("userType")}
              value={employee.userType}
            />
            <DetailRow
              icon={<User size={18} />}
              label={t("gender")}
              value={employee.gender === "MALE" ? t("male") : t("female")}
            />
          </div>

          {/* قسم الأدوار */}
          <div className="mt-8 pt-6 border-t border-border">
            <p className="text-xs text-gray-400 uppercase mb-3 text-start font-bold">
              {t("grantedRoles:")}
            </p>
            <div className="flex flex-wrap gap-2">
              {employee.roles?.map((r) => (
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
    <span className="text-sm font-bold text-gray-400 w-28 text-start flex-shrink-0">
      {label}:
    </span>
    <span className="text-sm font-medium text-on-surface text-start truncate">
      {value}
    </span>
  </div>
);
