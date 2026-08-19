import {
  User,
  FileText,
  Heart,
  Calendar,
  MapPin,
  Phone,
  Award,
  Activity,
  Users,
  BookOpen,
} from "lucide-react";

export default function OrphanInfoCard({ orphan, t, lang }) {
  if (!orphan) {
    return (
      <div className="text-center py-16 text-gray-400 font-medium">
        {t("no_orphan_linked") || "لا يوجد يتيم مرتبط بهذه الكفالة بعد"}
      </div>
    );
  }

  const openFileWindow = (path) => {
    if (!path) return;
    const cleanPath = path.replace(/\\/g, "/").replace(/^uploads\//, "");
    const fullUrl = `http://localhost:3000/uploads/${cleanPath}`;
    window.open(
      fullUrl,
      "_blank",
      "width=1000,height=800,scrollbars=yes,resizable=yes",
    );
  };

  const orphanFields = [
    {
      label: t("orphan_name"),
      value: `${orphan?.firstName || ""} ${orphan?.lastName || ""}`,
      icon: <User size={16} className="text-primary" />,
      span: "col-span-full",
    },
    {
      label: t("father_name"),
      value: orphan?.fatherName || "-",
      icon: <User size={16} className="text-primary" />,
    },
    {
      label: t("mother_name"),
      value: orphan?.motherName || "-",
      icon: <User size={16} className="text-primary" />,
    },
    {
      label: t("birth_date"),
      value: orphan?.birthOfDate
        ? new Date(orphan.birthOfDate).toLocaleDateString()
        : "-",
      icon: <Calendar size={16} className="text-primary" />,
    },
    {
      label: t("gender"),
      value: orphan?.gender ? t(orphan.gender.toLowerCase()) : "-",
      icon: <User size={16} className="text-primary" />,
    },
    {
      label: t("class_grade"),
      value: orphan?.class || "-",
      icon: <BookOpen size={16} className="text-primary" />,
    },
    {
      label: t("diseases"),
      value: orphan?.Diseases || "-",
      icon: <Activity size={16} className="text-primary" />,
    },
    {
      label: t("siblings_number"),
      value: orphan?.brotherAndSisterNumber ?? "-",
      icon: <Users size={16} className="text-primary" />,
    },
    {
      label: t("guardian_phone"),
      value: orphan?.guaranteedPhone || "-",
      icon: <Phone size={16} className="text-primary" />,
    },
    {
      label: t("body_size"),
      value: orphan?.bodySize || "-",
      icon: <Award size={16} className="text-primary" />,
    },
    {
      label: t("shoes_size"),
      value: orphan?.shoesSize || "-",
      icon: <Award size={16} className="text-primary" />,
    },
    {
      label: t("talent"),
      value: orphan?.talent || "-",
      icon: <Award size={16} className="text-primary" />,
    },
    {
      label: t("current_address"),
      value: orphan?.currentAddress || "-",
      icon: <MapPin size={16} className="text-primary" />,
      span: "sm:col-span-2",
    },
    {
      label: t("previous_address"),
      value: orphan?.previousAddress || "-",
      icon: <MapPin size={16} className="text-primary" />,
      span: "sm:col-span-2",
    },
    {
      label: t("guardian_name"),
      value: orphan?.guardianName || "-",
      icon: <User size={16} className="text-primary" />,
    },
    {
      label: t("is_supported"),
      value: orphan?.isSupported ? t("yes") : t("no"),
      icon: <Heart size={16} className="text-primary" />,
    },
  ];

  return (
    <div className="bg-surface/30 p-6 rounded-3xl space-y-6 border border-border/50">
      <h3 className="font-bold text-lg text-primary border-b pb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <User size={20} />
          <span>{t("orphan_info")}</span>
        </div>
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {orphanFields.map((field, index) => (
          <div
            key={index}
            className={`bg-surface-lowest p-3.5 rounded-2xl border border-border/60 shadow-2xs flex flex-col justify-between space-y-1 ${
              field.span || ""
            }`}
          >
            <div className="flex items-center gap-2 text-xs font-medium text-gray-400">
              {field.icon}
              <span>{field.label}</span>
            </div>
            <div
              className="text-sm font-bold text-on-surface-variant truncate"
              title={field.value}
            >
              {field.value}
            </div>
          </div>
        ))}
      </div>

      {orphan?.FamilyStatement && (
        <div className="pt-4 border-t flex items-center justify-between">
          <div className="flex items-center gap-2 text-on-surface-variant">
            <FileText size={18} className="text-primary" />
            <span className="text-sm font-bold">{t("family_statement")}</span>
          </div>
          <button
            onClick={() => openFileWindow(orphan.FamilyStatement)}
            className="px-4 py-2 bg-primary/10 text-primary rounded-xl text-xs font-bold hover:bg-primary/20 transition-all flex items-center gap-2 cursor-pointer"
          >
            <FileText size={14} />
            {t("view_family_statement") || t("viewFile") || "عرض الملف"}
          </button>
        </div>
      )}
    </div>
  );
}
