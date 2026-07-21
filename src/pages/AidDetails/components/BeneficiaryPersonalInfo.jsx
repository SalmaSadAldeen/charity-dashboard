import {
  User,
  Phone,
  MapPin,
  Briefcase,
  Calendar,
  Heart,
  Info,
} from "lucide-react";

export default function BeneficiaryPersonalInfo({
  data,
  t,
  lang = "ar",
  isRTL = true,
}) {
  if (!data) return null;

  // دالة لاختيار لون الأيقونة والخلفية بناءً على المعرف (ID)
  const getAvatarColor = (id) => {
    const palette = [
      "bg-[#735c00]/15 text-[#735c00]",
      "bg-[#5c630e]/15 text-[#5c630e]",
      "bg-[#3b674c]/15 text-[#3b674c]",
    ];
    return palette[(id || 0) % palette.length];
  };

  const avatarColorClass = getAvatarColor(data.id || data.beneficiaryId);

  // دالة بسيطة لاستخراج النص حسب اللغة للعناوين والمواقع
  const getLocalized = (obj) => {
    if (!obj) return "-";
    if (typeof obj === "string") return obj;
    return obj[lang] || obj["ar"] || obj["en"] || "-";
  };

  // دالة ذكية لمعالجة الحالة الاجتماعية حسب الجنس
  const getSocialStatusValue = () => {
    if (!data.socialStatus) return "-";

    const status = data.socialStatus.trim();
    const statusLower = status.toLowerCase();
    const gender = data.gender ? data.gender.toLowerCase() : "";

    if (gender === "female" || gender === "أنثى" || gender === "f") {
      const femaleKeys = [
        `${statusLower}_female`,
        `${status.toUpperCase()}_FEMALE`,
      ];
      for (const k of femaleKeys) {
        const translated = t?.(k);
        if (translated && translated !== k) return translated;
      }
    } else if (gender === "male" || gender === "ذكر" || gender === "m") {
      const maleKeys = [`${statusLower}_male`, `${status.toUpperCase()}_MALE`];
      for (const k of maleKeys) {
        const translated = t?.(k);
        if (translated && translated !== k) return translated;
      }
    }

    const generalTranslated = t?.(statusLower);
    if (generalTranslated && generalTranslated !== statusLower)
      return generalTranslated;

    return data.socialStatus;
  };

  const fields = [
    {
      label: t?.("fatherName") || "اسم الأب",
      val: data.beneficiaryFatherName,
      icon: <User className="w-4 h-4 text-primary" />,
    },
    {
      label: t?.("phoneNumber") || "رقم الهاتف",
      val: data.number,
      icon: <Phone className="w-4 h-4 text-primary" />,
    },
    {
      label: t?.("socialStatus") || "الحالة الاجتماعية",
      val: getSocialStatusValue(),
      icon: <Heart className="w-4 h-4 text-primary" />,
    },
    {
      label: t?.("age") || "العمر",
      val: data.age ? `${data.age} ${t?.("years") || "سنة"}` : "-",
      icon: <Calendar className="w-4 h-4 text-primary" />,
    },
    {
      label: t?.("gender") || "الجنس",
      val: data.gender
        ? t?.(data.gender.toLowerCase()) !== data.gender.toLowerCase()
          ? t?.(data.gender.toLowerCase())
          : data.gender
        : "-",
      icon: <Info className="w-4 h-4 text-primary" />,
    },
    {
      label: t?.("employmentStatus") || "حالة العمل",
      val: data.isUnemployed
        ? t?.("unemployed") || "عاطل"
        : t?.("employed") || "يعمل",
      icon: <Briefcase className="w-4 h-4 text-primary" />,
    },
    {
      label: t?.("address") || "العنوان",
      val: getLocalized(data.address),
      icon: <MapPin className="w-4 h-4 text-primary" />,
      fullWidth: true,
    },
  ];

  const fullName = `${data.firstName || ""} ${data.lastName || ""}`.trim();

  return (
    <div
      className={`bg-surface-lowest p-6 rounded-3xl border border-border/60 shadow-sm space-y-4 transition-all duration-300 hover:shadow-md ${
        isRTL ? "text-right" : "text-left"
      }`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* الهيدر الرئيسي */}
      <div className="flex items-center gap-3 pb-4 border-b border-border/40">
        <div
          className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg shadow-sm ${avatarColorClass}`}
        >
          {data.firstName?.[0] || <User size={22} />}
        </div>
        <div>
          <h3 className="font-extrabold text-base text-on-surface tracking-tight">
            {fullName || t?.("basicInfo") || "المعلومات الأساسية"}
          </h3>
          <p className="text-xs text-on-surface-variant font-medium mt-0.5">
            {t?.("beneficiaryDetails") || "تفاصيل المستفيد"}
          </p>
        </div>
      </div>

      {/* شبكة البيانات بالاعتماد الكلي على متغيرات الثيم بدون بياض */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
        {fields.map((f, i) => (
          <div
            key={i}
            className={`group p-4 bg-surface/50 rounded-2xl border border-border/60 shadow-2xs hover:border-primary/40 hover:bg-surface/80 hover:shadow-sm transition-all duration-200 flex flex-col justify-between ${
              f.fullWidth ? "sm:col-span-2" : ""
            }`}
          >
            <div className="flex items-center gap-2.5 mb-2">
              <div className="p-2 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors duration-200 shrink-0">
                {f.icon}
              </div>
              <p className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">
                {f.label}
              </p>
            </div>
            <p className="font-bold text-on-surface text-sm px-1 leading-snug">
              {f.val || "-"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
