import { ArrowRight } from "lucide-react";

export default function StatsCard({
  title,
  count,
  bgColor,
  textColor,
  iconBg,
  icon: Icon,
  onClick, // يمكنك إضافة خاصية onClick اختيارية إذا أردتِ تفاعلاً محلياً لاحقاً
}) {
  return (
    <div
      onClick={onClick}
      className={`relative ${bgColor} ${textColor} p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group border border-white/10`}
    >
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
          <Icon size={52} />
        </div>
      )}

      {/* الأيقونة العلوية أو زر التزيين (يمكنك إزالتها إذا لم تقومي باستخدامها كزر) */}
    
    </div>
  );
}
