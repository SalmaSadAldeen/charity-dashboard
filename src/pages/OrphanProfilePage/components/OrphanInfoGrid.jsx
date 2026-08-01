import {
  User,
  Users,
  Phone,
  Ruler,
  Footprints,
  Info,
  Calendar,
  Clock,
} from "lucide-react";

export default function OrphanInfoGrid({ orphan,t,lang }) {
  const isRTL = lang === "ar";

  // دالة ذكية لتنسيق التاريخ حسب اللغة (تنسيق اليوم/الشهر/السنة أو العكس تلقائياً)
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "";

    // استخدام ar-EG للعربية (يعرض أرقام عربية مصرية/مشرقية واضحة) و en-GB للإنجليزية
    const locale = isRTL ? "ar-EG" : "en-GB";

    return new Intl.DateTimeFormat(locale, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
  };
  const fields = [
    {
      label: t("fatherName"),
      val: orphan.fatherName,
      icon: <User size={16} />,
    },
    {
      label: t("motherName"),
      val: orphan.motherName,
      icon: <User size={16} />,
    },
    {
      label: t("guardianName"),
      val: orphan.guardianName,
      icon: <Users size={16} />,
    },
    {
      label: t("birthOfDate"),
      val: formatDate(orphan.birthOfDate),
      icon: <Calendar size={16} />,
    },
    {
      label: t("gender"),
      val: t(orphan.gender?.toLowerCase()),
      icon: <Info size={16} />,
    },
    {
      label: t("phoneNumber"),
      val: orphan.guaranteedPhone,
      icon: <Phone size={16} />,
    },
    {
      label: t("bodySize"),
      val: `${orphan.bodySize} cm`,
      icon: <Ruler size={16} />,
    },
    {
      label: t("shoesSize"),
      val: orphan.shoesSize,
      icon: <Footprints size={16} />,
    },
  ];

  return (
    <div
      className={`bg-white p-8 rounded-[2rem] border border-gray-100 shadow-[0_8px_30px_-5px_rgba(0,0,0,0.05)] ${
        isRTL ? "text-right" : "text-left"
      }`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <h3 className="font-black text-xl mb-8 text-gray-900">
        {t("basicInfo")}
      </h3>

      {/* شبكة البيانات الأساسية */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-8">
        {fields.map((f, i) => (
          <div
            key={i}
            className="p-5 bg-gray-50 rounded-2xl border border-gray-100"
          >
            <div
              className={`flex items-center gap-2 text-primary mb-2 ${
                isRTL ? "flex-row-reverse justify-end" : ""
              }`}
            >
              {f.icon}
              <p className="text-[10px] uppercase font-black tracking-widest text-primary/70">
                {f.label}
              </p>
            </div>
            <p className="font-bold text-gray-800 text-base">{f.val}</p>
          </div>
        ))}
      </div>

      {/* قسم التواريخ في الأسفل */}
      {/* قسم التواريخ في الأسفل */}
      <div className="flex flex-wrap justify-center items-center gap-6 pt-6 border-t border-gray-200">
        <div className="flex items-center gap-1">
          {/* الأيقونة والنص سيترتبان تلقائياً حسب dir="rtl" أو dir="ltr" في الحاوية الأب */}
          <Clock size={20} className="text-primary" />
          <p className="text-sm font-black text-gray-500 uppercase flex items-center gap-1">
            {t("updatedAt")}:
            {/* زيادة حجم الخط font-medium أو text-base وتنسيق الأرقام */}
            <span className="text-primary font-mono text-base font-bold m-1">
              {formatDate(orphan.updatedAt)}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
