import { Eye } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { Link } from "react-router-dom";

export default function BeneficiaryTable({ data, isLoading, onRowClick }) {
  const { t, lang } = useTranslation();

  const getAvatarColor = (id) => {
    const palette = [
      "bg-[#735c00]/15 text-[#735c00]",
      "bg-[#5c630e]/15 text-[#5c630e]",
      "bg-[#3b674c]/15 text-[#3b674c]",
    ];
    return palette[(id || 0) % palette.length];
  };

  const getSocialStatusValue = (item) => {
    if (!item?.socialStatus) return "-";

    const statusVal = item.socialStatus.trim().toUpperCase();
    const gender = item.gender ? item.gender.trim().toUpperCase() : "";

    const isFemale = gender === "FEMALE" || gender === "أنثى" || gender === "F";
    const isMale = gender === "MALE" || gender === "ذكر" || gender === "M";

    let possibleKeys = [];

    if (isFemale) {
      possibleKeys = [
        `${statusVal}_FEMALE`,
        `${statusVal.toLowerCase()}_female`,
      ];
    } else if (isMale) {
      possibleKeys = [`${statusVal}_MALE`, `${statusVal.toLowerCase()}_male`];
    }

    possibleKeys.push(statusVal, statusVal.toLowerCase());

    for (const key of possibleKeys) {
      const translated = t?.(key);
      if (translated && translated !== key) {
        return translated;
      }
    }

    return item.socialStatus;
  };

  const getStatusStyle = (itemStatus) => {
    switch (itemStatus) {
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
          {isLoading ? (
            // 1. عرض الـ Skeleton حصراً أثناء التحميل بناءً على الـ prop القادم
            [...Array(5)].map((_, index) => (
              <tr key={index} className="animate-pulse">
                <td className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gray-200 shrink-0" />
                    <div className="h-4 bg-gray-200 rounded-lg w-32" />
                  </div>
                </td>
                <td className="p-4 text-center">
                  <div className="h-7 bg-gray-200 rounded-xl w-24 mx-auto" />
                </td>
                <td className="p-4 text-center">
                  <div className="h-7 bg-gray-200 rounded-xl w-20 mx-auto" />
                </td>
                <td className="p-4 text-center">
                  <div className="w-9 h-9 bg-gray-200 rounded-xl mx-auto" />
                </td>
              </tr>
            ))
          ) : data && data.length > 0 ? (
            // 2. عرض البيانات الحقيقية في حال توفرها
            data.map((item) => (
              <tr
                key={item.id}
                onClick={() => onRowClick?.(item)}
                className="group hover:bg-primary-container/5 transition-all cursor-pointer"
              >
                <td className="p-4 truncate">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs border ${getAvatarColor(
                        item.id,
                      )}`}
                    >
                      {item.firstName?.charAt(0)}
                    </div>
                    <span className="font-bold text-sm text-on-surface-variant">{`${
                      item.firstName || ""
                    } ${item.lastName || ""}`}</span>
                  </div>
                </td>
                <td className="p-4 text-center">
                  <span className="text-[11px] font-bold text-[#5e5846] bg-[#fdfaf0] px-4 py-1.5 rounded-xl border border-[#f2e9d0]">
                    {getSocialStatusValue(item)}
                  </span>
                </td>
                <td className="p-4 text-center">
                  <span
                    className={`inline-block px-4 py-1.5 rounded-xl text-[10px] font-black border uppercase ${getStatusStyle(
                      item.status,
                    )}`}
                  >
                    {t(item.status)}
                  </span>
                </td>
                <td
                  className="p-4 text-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Link
                    to={`/dashboard/beneficiaries/${item.id}`}
                    className="inline-block p-2 bg-white border border-border rounded-xl text-primary hover:bg-primary hover:text-white transition-all shadow-sm"
                  >
                    <Eye size={16} />
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            // 3. عرض رسالة "لا توجد بيانات" عند انتهاء التحميل وعدم وجود عناصر
            <tr>
              <td
                colSpan="4"
                className="text-center py-12 text-gray-400 font-medium text-base"
              >
                {t("noData") ||
                  (lang === "ar"
                    ? "لا توجد بيانات متاحة"
                    : "No data available")}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
