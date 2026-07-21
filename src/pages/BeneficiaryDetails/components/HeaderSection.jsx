import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";

export default function HeaderSection({ data }) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const getStatusStyle = (status) => {
    switch (status) {
      case "ACCEPTED":
        return "bg-green-50 text-green-700 border-green-200";
      case "PENDING":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "REJECTED":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 border-gray-200 text-gray-700";
    }
  };

  const status = data?.beneficiary?.status;

  return (
    <div className="flex justify-between items-center bg-white p-6 rounded-3xl border border-border shadow-sm">
      <div className="flex items-center gap-6">
        {" "}
        {/* زيادة المسافة بين الزر والاسم */}
        <button
          onClick={() => navigate(-1)}
          className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors duration-300"
        >
          <ArrowLeft size={20} className="text-gray-700 rtl:rotate-180" />
        </button>
        {/* زيادة التباعد هنا ليعطي مساحة أكبر للحالة */}
        {/* قمت بتغيير gap-6 إلى gap-12 لزيادة المسافة بشكل واضح جداً */}
        <div className="flex items-center gap-12">
          <h1 className="text-2xl font-black text-gray-900">
            {data?.firstName} {data?.lastName}
          </h1>

          {status && (
            <span
              className={`px-8 py-2 rounded-full text-xs font-black uppercase tracking-widest border whitespace-nowrap shadow-sm ${getStatusStyle(status)}`}
            >
              {t(status)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
