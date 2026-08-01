import { Edit2, Trash2 } from "lucide-react";

export default function OrphanHeader({ orphan, onEdit, onDelete ,t}) {

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

  return (
    <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-[0_8px_30px_-5px_rgba(0,0,0,0.05)] flex justify-between items-center">
      {/* القسم الأيسر: الاسم والحالة */}
      <div className="space-y-3">
        <h1 className="text-4xl font-black text-gray-900">
          {orphan.firstName} {orphan.lastName}
        </h1>
        <div className="flex items-center gap-3 font-bold text-sm">
          {/* العمر */}
          <span className="bg-gray-50 px-4 py-1.5 rounded-full text-gray-600">
            {calculateAge(orphan.birthOfDate)} {t("years")}
          </span>

          {/* حالة الكفالة - استخدام ألوان الـ Container */}
          <span
            className={`px-4 py-1.5 rounded-full ${
              orphan.isSupported
                ? "bg-[#DDE1FF] text-[#00105D]" // لون الـ primary-container
                : "bg-gray-100 text-gray-600" // لون محايد لغير المكفول
            }`}
          >
            {orphan.isSupported ? t("isSupported") : t("notSupported")}
          </span>
        </div>
      </div>

      {/* القسم الأيمن: الأزرار */}
      <div className="flex gap-3">
        <button
          onClick={onEdit}
          className="flex items-center gap-2 px-6 py-3 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-2xl font-bold transition-all"
        >
          <Edit2 size={18} /> {t("edit")}
        </button>
        <button
          onClick={onDelete}
          className="flex items-center gap-2 px-6 py-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-2xl font-bold transition-all"
        >
          <Trash2 size={18} /> {t("delete")}
        </button>
      </div>
    </div>
  );
}
