import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function StatsCard({
  title,
  count,
  link,
  bgColor,
  textColor,
  iconBg,
}) {
  return (
    <Link
      to={link}
      className={`relative ${bgColor} ${textColor} p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 group`}
    >
      <h3 className="font-bold text-lg mb-2 opacity-80">{title}</h3>
      <p className="text-5xl font-black">{count}</p>

      {/* السهم في الزاوية العلوية */}
      <div
        className={`absolute top-6 end-6 ${iconBg} p-2 rounded-full group-hover:bg-opacity-20 transition-all`}
      >
        <ArrowLeft size={20} className="rtl:rotate-180" />
      </div>
    </Link>
  );
}
