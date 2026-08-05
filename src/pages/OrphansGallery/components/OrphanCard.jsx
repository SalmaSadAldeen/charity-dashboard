import { useTranslation } from "@/hooks/useTranslation";
import { useNavigate } from "react-router-dom";
import {
  User,
  Calendar,
  MapPin,
  Heart,
  CheckCircle2,
  XCircle,
} from "lucide-react";

export const OrphanCard = ({ orphan ,isSelected}) => {
  const { t, lang } = useTranslation();
  const navigate = useNavigate();

  const calculateAge = (birthDate) => {
    if (!birthDate) return 0;
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate()))
      age--;
    return age;
  };

  const getAvatarColor = (id) => {
    const palette = [
      "bg-[#735c00]/15 text-[#735c00]",
      "bg-[#5c630e]/15 text-[#5c630e]",
      "bg-[#3b674c]/15 text-[#3b674c]",
    ];
    return palette[(id || 0) % palette.length];
  };

  return (
    <div
      onClick={() => navigate(`/dashboard/orphan/details/${orphan.id}`)}
      className="cursor-pointer group h-full"
    >
<div 
        className={`h-full flex flex-col p-6 rounded-[2rem] border-2 bg-surface-lowest shadow-[0_5px_30px_rgba(0,0,0,0.05)] transition-all duration-300 ${
          isSelected 
            ? "border-primary ring-2 ring-primary/20 shadow-lg" 
            : "border-border group-hover:border-primary/50 group-hover:shadow-lg"
        }`}
      >      
        <div className="flex justify-start mb-6">
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-lg ${getAvatarColor(orphan.id)}`}
          >
            {orphan.firstName?.charAt(0) || "?"}
          </div>
        </div>

        {/* المعلومات الأساسية */}
        <div className="flex-grow space-y-4 min-w-0">
          <h3 className="text-[17px] font-black text-on-surface-variant truncate">
            {orphan.firstName} {orphan.lastName}
          </h3>
          <div className="space-y-2.5 text-[12px] font-bold text-on-surface-variant">
            <div className="flex items-center gap-3 truncate">
              <User size={15} className="text-primary shrink-0" />
              <span>
                {t("fatherName")}: {orphan.fatherName}
              </span>
            </div>
            {/* عدلي هذا الجزء تحديداً */}
            <div className="flex items-center gap-3 truncate">
              <MapPin size={15} className="text-primary shrink-0" />
              {/* هنا نستخدم lang للوصول للقيمة الصحيحة داخل الكائن */}
              <span className="truncate">
                {orphan.currentAddress?.[lang] || "-"}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Calendar size={15} className="text-primary shrink-0" />
              <span>
                {calculateAge(orphan.birthOfDate)} {t("years")}
              </span>
            </div>
          </div>
        </div>

        {/* الجزء السفلي (الحالة) */}
        <div className="mt-6 pt-5 border-t border-border flex justify-between items-center">
          <div
            className={`px-3 py-1 rounded-full text-[9px] font-black uppercase flex items-center gap-1.5 border ${orphan.isSupported ? "bg-tertiary/10 text-tertiary border-tertiary/20" : "bg-surface text-on-surface-variant/60 border-border"}`}
          >
            {orphan.isSupported ? (
              <CheckCircle2 size={10} />
            ) : (
              <XCircle size={10} />
            )}
            {orphan.isSupported ? t("isSupported") : t("notSupported")}
          </div>
          <Heart
            size={22}
            className={
              orphan.isSupported
                ? "text-primary-container fill-primary-container"
                : "text-border"
            }
          />
        </div>
      </div>
    </div>
  );
};
