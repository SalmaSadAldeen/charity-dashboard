import { useState } from "react";
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
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

export default function OrphanInfoCard({ orphans = [], t, lang }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!orphans || orphans.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400 font-medium">
        {t("no_orphan_linked") || "لا يوجد أيتام مرتبطون بهذه الكفالة بعد"}
      </div>
    );
  }

  const orphan = orphans[currentIndex];

  const handleNext = () => {
    if (currentIndex < orphans.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

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
      {/* شريط التنقل بين الأيتام في حال كان هناك أكثر من يتيم */}
      {orphans.length > 1 && (
        <div className="flex items-center justify-between bg-surface-lowest px-5 py-3.5 rounded-2xl border border-border/60 shadow-2xs">
          <span className="text-sm font-bold text-gray-700">
            {lang === "ar"
              ? `اليتيم ${currentIndex + 1} من ${orphans.length}`
              : `Orphan ${currentIndex + 1} of ${orphans.length}`}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="p-2 bg-white border border-gray-200 rounded-xl shadow-xs disabled:opacity-30 hover:bg-gray-50 transition-all cursor-pointer text-gray-700"
            >
              {lang === "ar" ? (
                <ChevronRight size={18} />
              ) : (
                <ChevronLeft size={18} />
              )}
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex === orphans.length - 1}
              className="p-2 bg-white border border-gray-200 rounded-xl shadow-xs disabled:opacity-30 hover:bg-gray-50 transition-all cursor-pointer text-gray-700"
            >
              {lang === "ar" ? (
                <ChevronLeft size={18} />
              ) : (
                <ChevronRight size={18} />
              )}
            </button>
          </div>
        </div>
      )}

      <h3 className="font-bold text-lg text-primary border-b pb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <User size={20} />
          <span>{t("orphan_info")}</span>
        </div>
        {orphans.length > 1 && (
          <span className="text-xs px-3 py-1 bg-primary/10 rounded-full font-medium text-primary">
            ID: #{orphan?.id}
          </span>
        )}
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
