import { Edit2, Trash2, Star } from "lucide-react"; // <-- 1. استيراد أيقونة النجمة
import { hasPermission } from "@/utils/permissions";
import { useSelector } from "react-redux";

export default function OrphanHeader({ orphan, onEdit, onDelete, t }) {
  const calculateAge = (birthDate) => {
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    if (
      today.getMonth() < birth.getMonth() ||
      (today.getMonth() === birth.getMonth() &&
        today.getDate() < birth.getDate())
    )
      age--;
    return age;
  };
  const { roles } = useSelector((state) => state.auth);

  return (
    <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-[0_8px_30px_-5px_rgba(0,0,0,0.05)] flex justify-between items-center">
      <div className="space-y-3">
        <h1 className="text-4xl font-black text-gray-900">
          {orphan.firstName} {orphan.lastName}
        </h1>
        <div className="flex items-center gap-3 font-bold text-sm flex-wrap">
          <span className="bg-gray-50 px-4 py-1.5 rounded-full text-gray-600">
            {calculateAge(orphan.birthOfDate)} {t("years")}
          </span>

          {/* حالة الكفالة - استخدام ألوان الـ Container */}
          <span
            className={`px-4 py-1.5 rounded-full ${
              orphan.isSupported
                ? "bg-[#DDE1FF] text-[#00105D]"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {orphan.isSupported ? t("isSupported") : t("notSupported")}
          </span>

          {/* شارة الأولوية الجديدة مع النجمة الصفراء */}
          {orphan.priority && (
            <span className="bg-amber-50 text-amber-700 px-4 py-1.5 rounded-full flex items-center gap-1.5 border border-amber-200/50">
              <Star size={14} className="text-amber-500 fill-amber-400" />
              <span>
                {t("priority")}: {orphan.priority} / 5
              </span>
            </span>
          )}
        </div>
      </div>

      {/* القسم الأيمن: الأزرار */}
      <div className="flex gap-3">
        {hasPermission(roles, "update:orphans") && (
          <button
            onClick={onEdit}
            className="flex items-center gap-2 px-6 py-3 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-2xl font-bold transition-all cursor-pointer"
          >
            <Edit2 size={18} /> {t("edit")}
          </button>
        )}

        {hasPermission(roles, "delete:orphans") && (
          <button
            onClick={onDelete}
            className="flex items-center gap-2 px-6 py-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-2xl font-bold transition-all cursor-pointer"
          >
            <Trash2 size={18} /> {t("delete")}
          </button>
        )}
      </div>
    </div>
  );
}
