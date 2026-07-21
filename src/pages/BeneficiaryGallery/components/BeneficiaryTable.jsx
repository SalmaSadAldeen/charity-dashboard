import { Eye } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { Link } from "react-router-dom";
export default function BeneficiaryTable({ data }) {
  const { t } = useTranslation();

  // دالة الألوان الأصلية التي طلبتِ الحفاظ عليها
  const getAvatarColor = (id) => {
    const palette = [
      "bg-[#735c00]/15 text-[#735c00]",
      "bg-[#5c630e]/15 text-[#5c630e]",
      "bg-[#3b674c]/15 text-[#3b674c]",
    ];
    return palette[(id || 0) % palette.length];
  };

  // ألوان هادئة (Muted) وتناسق في الـ Radius
  const getStatusStyle = (status) => {
    switch (status) {
      case "ACCEPTED":
        return "bg-[#eefcf4] text-[#1b6b3e] border-[#c8e6d5]";
      case "PENDING":
        return "bg-[#fffcf0] text-[#856404] border-[#ffeeba]";
      case "REJECTED":
        return "bg-[#fff0f0] text-[#a94442] border-[#f5c6cb]";
      default:
        return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-border shadow-sm">
      <table className="w-full border-collapse table-fixed">
        <thead className="bg-[#f9f7f4] border-b border-border">
          <tr className="text-on-surface-variant/90">
            <th className="p-5 text-right font-black uppercase text-[11px] tracking-widest w-1/5">
              {t("beneficiary")}
            </th>
            <th className="p-5 text-center font-black uppercase text-[11px] tracking-widest w-2/5">
              {t("socialStatus")}
            </th>
            <th className="p-5 text-center font-black uppercase text-[11px] tracking-widest w-1/5">
              {t("status")}
            </th>
            <th className="p-5 text-center font-black uppercase text-[11px] tracking-widest w-1/5">
              {t("actions")}
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border bg-white">
          {data.map((item) => (
            <tr
              key={item.id}
              className="group hover:bg-primary-container/5 transition-all"
            >
              <td className="p-4 truncate">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs border ${getAvatarColor(item.id)}`}
                  >
                    {item.firstName?.charAt(0)}
                  </div>
                  <span className="font-bold text-sm text-on-surface-variant">{`${item.firstName} ${item.lastName}`}</span>
                </div>
              </td>
              <td className="p-4 text-center">
                {/* تم توحيد الـ Radius هنا */}
                <span className="text-[11px] font-bold text-[#5e5846] bg-[#fdfaf0] px-4 py-1.5 rounded-xl border border-[#f2e9d0]">
                  {t(item.socialStatus)}
                </span>
              </td>
              <td className="p-4 text-center">
                {/* تم توحيد الـ Radius هنا أيضاً */}
                <span
                  className={`inline-block px-4 py-1.5 rounded-xl text-[10px] font-black border uppercase ${getStatusStyle(item.status)}`}
                >
                  {t(item.status)}
                </span>
              </td>
              <td className="p-4 text-center">
                <Link
                  to={`/dashboard/beneficiaries/${item.id}`} // المسار الذي يؤدي لصفحة التفاصيل
                  className="inline-block p-2 bg-white border border-border rounded-xl text-primary hover:bg-primary hover:text-white transition-all shadow-sm"
                >
                  <Eye size={16} />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
