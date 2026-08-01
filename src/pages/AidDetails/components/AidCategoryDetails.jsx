import {
  Stethoscope,
  Users,
  Utensils,
  GraduationCap,
  Building2,
  Calendar,
  Briefcase,
  Layers,
  Home,
  DollarSign,
  MapPin,
  Lock,
  FileText,
  Sparkles,
} from "lucide-react";

export default function AidCategoryDetails({
  aidDetails,
  categoryId,
  t,
  lang,
}) {
  if (!aidDetails) return null;

  const isRTL = lang === "ar";

  const getLocalized = (obj) => {
    if (!obj) return null;
    if (typeof obj === "string") return obj;
    return obj[lang] || obj["ar"] || obj["en"] || null;
  };

  const getFields = () => {
    const fields = [];

    if (aidDetails.academicAchievement) {
      const achievementKey = aidDetails.academicAchievement.trim().toUpperCase();
      fields.push({
        label: t?.("academicAchievement") || "المستوى التعليمي",
        val:
          t?.(achievementKey) !== achievementKey
            ? t?.(achievementKey)
            : aidDetails.academicAchievement,
        icon: <GraduationCap className="w-4 h-4 text-primary" />,
      });
    }
    if (aidDetails.institutionName) {
      fields.push({
        label: t?.("institutionName") || "اسم المؤسسة / الجامعة",
        val: getLocalized(aidDetails.institutionName),
        icon: <Building2 className="w-4 h-4 text-primary" />,
      });
    }
    if (aidDetails.year) {
      fields.push({
        label: t?.("academicYear") || "السنة الدراسية",
        val: aidDetails.year,
        icon: <Calendar className="w-4 h-4 text-primary" />,
      });
    }

    if (
      aidDetails.numberIndividuals !== null &&
      aidDetails.numberIndividuals !== undefined
    ) {
      fields.push({
        label: t?.("numberOfIndividuals") || "عدد الأفراد المستفيدين",
        val: aidDetails.numberIndividuals,
        icon: <Users className="w-4 h-4 text-primary" />,
      });
    }

    if (aidDetails.projectName) {
      fields.push({
        label: t?.("projectName") || "اسم المشروع",
        val: getLocalized(aidDetails.projectName),
        icon: <Briefcase className="w-4 h-4 text-primary" />,
        fullWidth: true,
      });
    }
    if (aidDetails.projectCategory) {
      fields.push({
        label: t?.("projectCategory") || "فئة المشروع",
        val: getLocalized(aidDetails.projectCategory),
        icon: <Layers className="w-4 h-4 text-primary" />,
      });
    }
    if (
      aidDetails.numberOfPeopleSupported !== null &&
      aidDetails.numberOfPeopleSupported !== undefined
    ) {
      fields.push({
        label: t?.("supportedPeopleCount") || "عدد المعالين من المشروع",
        val: aidDetails.numberOfPeopleSupported,
        icon: <Users className="w-4 h-4 text-primary" />,
      });
    }

    if (aidDetails.currentHousingSituation) {
      fields.push({
        label: t?.("currentHousingSituation") || "وضع السكن الحالي",
        val: getLocalized(aidDetails.currentHousingSituation),
        icon: <Home className="w-4 h-4 text-primary" />,
      });
    }
    if (aidDetails.currentRent) {
      fields.push({
        label: t?.("currentRent") || "الإيجار الحالي",
        val: `$${aidDetails.currentRent}`,
        icon: <DollarSign className="w-4 h-4 text-primary" />,
      });
    }
    if (aidDetails.currentPlaceOfResidence) {
      fields.push({
        label: t?.("currentPlaceOfResidence") || "مكان الإقامة الحالي",
        val: getLocalized(aidDetails.currentPlaceOfResidence),
        icon: <MapPin className="w-4 h-4 text-primary" />,
      });
    }
    if (aidDetails.housingSpecifications) {
      fields.push({
        label: t?.("housingSpecifications") || "مواصفات السكن",
        val: getLocalized(aidDetails.housingSpecifications),
        icon: <FileText className="w-4 h-4 text-primary" />,
      });
    }
    if (aidDetails.reasonForLock) {
      fields.push({
        label: t?.("reasonForLock") || "سبب الإغلاق / القفل",
        val: getLocalized(aidDetails.reasonForLock),
        icon: <Lock className="w-4 h-4 text-primary" />,
      });
    }

    if (aidDetails.typeAid) {
      fields.push({
        label: t?.("aidType") || "نوع الإعانة",
        val: t?.(aidDetails.typeAid.toLowerCase()) || aidDetails.typeAid,
        icon:
          Number(categoryId) === 1 ? (
            <Stethoscope className="w-4 h-4 text-primary" />
          ) : (
            <Utensils className="w-4 h-4 text-primary" />
          ),
      });
    }

    return fields;
  };

  const fields = getFields();
  if (fields.length === 0) return null;

  return (
    <div
      className={`bg-surface-lowest p-6 rounded-3xl border border-border/60 shadow-sm space-y-4 transition-all duration-300 hover:shadow-md ${
        isRTL ? "text-right" : "text-left"
      }`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="flex items-center gap-2.5 pb-3 border-b border-border/60">
        <div className="p-2 rounded-xl bg-primary/10 text-primary">
          <Sparkles className="w-4 h-4" />
        </div>
        <h3 className="font-extrabold text-base text-on-surface tracking-tight">
          {t?.("categorySpecificDetails") || "تفاصيل فئة الإعانة"}
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
        {fields.map((f, i) => (
          <div
            key={i}
            className={`group p-4 bg-surface/50 rounded-2xl border border-border/60 hover:border-primary/40 hover:bg-surface/80 hover:shadow-sm transition-all duration-200 flex flex-col justify-between ${
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
