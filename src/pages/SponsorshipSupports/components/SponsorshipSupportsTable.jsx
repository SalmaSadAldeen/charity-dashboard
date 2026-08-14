import { useTranslation } from "@/hooks/useTranslation";
import { ArrowDownRight, Calendar, Wallet } from "lucide-react";

export default function SponsorshipSupportsTable({
  data,
  isLoading,
  onOrphanClick,
}) {
  const { t, lang } = useTranslation();
  const isArabic = lang === "ar";

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
    <div className="w-full overflow-hidden rounded-2xl border border-border shadow-sm">
      <table className="w-full border-collapse table-fixed">
        <thead className="bg-[#f9f7f4] border-b border-border">
          <tr className="text-on-surface-variant/90">
            <th
              className={`p-5 ${isArabic ? "text-right" : "text-left"} font-black uppercase text-[11px] tracking-widest w-[28%]`}
            >
              {t("orphanName")}
            </th>
            <th className="p-5 text-center font-black uppercase text-[11px] tracking-widest w-[18%]">
              {t("amount")}
            </th>
            <th className="p-5 text-center font-black uppercase text-[11px] tracking-widest w-[18%]">
              {t("balanceAfter")}
            </th>
            <th className="p-5 text-center font-black uppercase text-[11px] tracking-widest w-[20%]">
              {t("date")}
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border bg-white">
          {isLoading ? (
            [...Array(5)].map((_, index) => (
              <tr key={index} className="animate-pulse">
                <td className={`p-4 ${isArabic ? "text-right" : "text-left"}`}>
                  <div className="flex items-center gap-4 justify-start">
                    <div className="w-10 h-10 rounded-xl bg-gray-200 shrink-0" />
                    <div className="h-4 bg-gray-200 rounded-lg w-32" />
                  </div>
                </td>
                <td className="p-4 text-center">
                  <div className="h-7 bg-gray-200 rounded-xl w-16 mx-auto" />
                </td>
                <td className="p-4 text-center">
                  <div className="h-7 bg-gray-200 rounded-xl w-16 mx-auto" />
                </td>
                <td className="p-4 text-center">
                  <div className="h-7 bg-gray-200 rounded-xl w-24 mx-auto" />
                </td>
              </tr>
            ))
          ) : data && data.length > 0 ? (
            data.map((item) => (
              <tr
                key={item.id}
                className="group hover:bg-primary-container/5 transition-all"
              >
                {/* اسم اليتيم مع الحفاظ على محاذاة الأفاتار والاسم */}
                <td
                  className={`p-4 ${isArabic ? "text-right" : "text-left"} truncate`}
                >
                  <div
                    className="flex items-center gap-4 justify-start cursor-pointer"
                    onClick={() =>
                      onOrphanClick?.(item.orphan?.id || item.orphanId)
                    }
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs border shrink-0 ${getAvatarColor(
                        item.orphan?.id || item.orphanId,
                      )}`}
                    >
                      {item.orphan?.firstName?.charAt(0) || "O"}
                    </div>
                    <span className="font-bold text-sm text-on-surface-variant hover:text-primary transition-colors truncate">
                      {item.orphan?.firstName} {item.orphan?.lastName}
                    </span>
                  </div>
                </td>

                {/* المبلغ المصروف */}
                <td className="p-4 text-center">
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-rose-50 text-rose-700 text-xs font-black border border-rose-200/50">
                    <ArrowDownRight size={14} />
                    {item.amount}
                  </span>
                </td>

                {/* الرصيد بعد العملية */}
                <td className="p-4 text-center">
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-gray-50 text-on-surface-variant text-xs font-bold border border-gray-200">
                    <Wallet size={13} className="text-gray-400" />
                    {item.balanceAfter}
                  </span>
                </td>

                {/* تاريخ الدعم */}
                <td className="p-4 text-center text-gray-500 font-medium text-xs">
                  <span
                    className={`inline-flex items-center gap-1.5 ${isArabic ? "flex-row-reverse" : ""}`}
                  >
                    <Calendar size={13} className="text-gray-400" />
                    {new Date(item.createdAt).toLocaleDateString(
                      isArabic ? "ar-SA" : "en-US",
                      { year: "numeric", month: "short", day: "numeric" },
                    )}
                  </span>
                </td>
              </tr>
            ))
          ) : !isLoading && data && data.length === 0 ? (
            <tr>
              <td
                colSpan="4"
                className="text-center py-12 text-gray-400 font-medium text-base"
              >
                {t("noData") ||
                  (isArabic ? "لا توجد بيانات متاحة" : "No data available")}
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </div>
  );
}
