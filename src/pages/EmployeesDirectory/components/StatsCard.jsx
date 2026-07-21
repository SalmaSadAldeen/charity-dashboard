import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function StatsCard({
  title,
  count,
  link = "#",
  bgColor,
  textColor,
  iconBg = "bg-white/20",
  icon: Icon, // استقبال الأيقونة كـ Prop
}) {
  return (
    <Link
      to={link}
      className={`relative ${bgColor} ${textColor} p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group border border-white/10`}
    >
      {/* تأثير خلفية خفيف للجمالية */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 transition-transform group-hover:scale-150" />

      <div className="relative z-10">
        <h3 className="font-bold text-base mb-3 opacity-90 tracking-wide">
          {title}
        </h3>
        <p className="text-4xl font-black">{count}</p>
      </div>

      {/* الأيقونة الجانبية - تعبير عن محتوى الكارد */}
      {Icon && (
        <div className="absolute bottom-6 end-6 opacity-20 group-hover:opacity-40 transition-opacity">
          <Icon size={48} />
        </div>
      )}

      {/* السهم الذي يشير للخارج دائماً */}
      <div
        className={`absolute top-6 end-6 ${iconBg} p-2.5 rounded-2xl group-hover:scale-110 transition-transform duration-300`}
      >
        <ArrowRight size={20} className="rtl:rotate-180" />
      </div>
    </Link>
  );
}
