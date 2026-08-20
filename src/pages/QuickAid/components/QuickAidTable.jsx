import { useTranslation } from "@/hooks/useTranslation";
import { ArrowDownRight, User } from "lucide-react";

export default function QuickAidTable({ disbursements, isLoading }) {
  const { t, lang } = useTranslation();
  const isArabic = lang === "ar";

  // دالة لتوليد لون أفاتار متناسق بناءً على معرف المستفيد
  const getAvatarColor = (id) => {
    const palette = [
      "bg-[#735c00]/15 text-[#735c00]",
      "bg-[#5c630e]/15 text-[#5c630e]",
      "bg-[#3b674c]/15 text-[#3b674c]",
    ];

    let numericId = id;
    if (typeof id === "string") {
      numericId = id
        .split("")
        .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    }

    return palette[(numericId || 0) % palette.length];
  };

  return (
    <div
      className="w-full overflow-hidden rounded-3xl border border-border shadow-sm bg-white"
      dir={isArabic ? "rtl" : "ltr"}
    >
      <div className="overflow-x-auto">
        <table className="w-full border-collapse table-fixed">
          <thead className="bg-[#f9f7f4] border-b border-border">
            <tr className="text-slate-500">
              <th
                className={`p-5 ${isArabic ? "text-right" : "text-left"} font-black uppercase text-[11px] tracking-widest w-[28%]`}
              >
                {t("beneficiaryName", "اسم المستفيد")}
              </th>
              <th className="p-5 text-center font-black uppercase text-[11px] tracking-widest w-[18%]">
                {t("amount", "المبلغ")}
              </th>
              <th
                className={`p-5 ${isArabic ? "text-right" : "text-left"} font-black uppercase text-[11px] tracking-widest w-[34%] px-6`}
              >
                {t("reason", "السبب")}
              </th>
              <th
                className={`p-5 ${isArabic ? "text-right" : "text-left"} font-black uppercase text-[11px] tracking-widest w-[20%] px-6`}
              >
                {t("employeeName", "الموظف المسؤول")}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-white">
            {isLoading ? (
              [...Array(5)].map((_, index) => (
                <tr key={index} className="animate-pulse">
                  <td
                    className={`p-4 ${isArabic ? "text-right" : "text-left"}`}
                  >
                    <div className="flex items-center gap-4 justify-start">
                      <div className="w-10 h-10 rounded-xl bg-gray-200 shrink-0" />
                      <div className="h-4 bg-gray-200 rounded-lg w-32" />
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <div className="h-7 bg-gray-200 rounded-xl w-16 mx-auto" />
                  </td>
                  <td className="p-4 px-6">
                    <div className="h-4 bg-gray-200 rounded-lg w-48" />
                  </td>
                  <td className="p-4 px-6">
                    <div className="h-4 bg-gray-200 rounded-lg w-28" />
                  </td>
                </tr>
              ))
            ) : disbursements && disbursements.length > 0 ? (
              disbursements.map((item, index) => (
                <tr
                  key={index}
                  className="group hover:bg-slate-50/60 transition-all"
                >
                  {/* اسم المستفيد مع الأفاتار */}
                  <td
                    className={`p-4 ${isArabic ? "text-right" : "text-left"} truncate`}
                  >
                    <div className="flex items-center gap-4 justify-start">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs border shrink-0 ${getAvatarColor(
                          item.beneficiary?.id || item.beneficiaryId,
                        )}`}
                      >
                        {item.beneficiary?.firstName?.charAt(0) || (
                          <User size={16} />
                        )}
                      </div>
                      <span className="font-bold text-sm text-slate-900 truncate">
                        {item.beneficiary
                          ? `${item.beneficiary.firstName} ${item.beneficiary.lastName}`
                          : "-"}
                      </span>
                    </div>
                  </td>

                  {/* المبلغ */}
                  <td className="p-4 text-center">
                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-black border border-emerald-200/50">
                      <ArrowDownRight size={14} />
                      {item.amount}
                    </span>
                  </td>

                  {/* السبب حسب اللغة */}
                  <td
                    className={`p-4 px-6 text-slate-500 text-sm font-medium ${isArabic ? "text-right" : "text-left"} truncate`}
                  >
                    {isArabic
                      ? item.reason?.ar || item.reason
                      : item.reason?.en || item.reason}
                  </td>

                  {/* اسم الموظف المسؤول */}
                  <td
                    className={`p-4 px-6 text-slate-600 font-semibold text-xs ${isArabic ? "text-right" : "text-left"} truncate`}
                  >
                    {item.employee
                      ? `${item.employee.firstName} ${item.employee.lastName}`
                      : "-"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="text-center py-12 text-slate-400 font-bold text-base"
                >
                  {t("noDataFound", "لا توجد بيانات متاحة")}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
