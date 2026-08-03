import {
  Eye,
  ShieldCheck,
  Heart,
  Mail,
  Phone,
  Calendar,
  Globe,
} from "lucide-react";

export default function DonorTable({ data, status, t, lang, onRowClick }) {
  const getAvatarColor = (id) => {
    const palette = [
      "bg-[#735c00]/15 text-[#735c00]",
      "bg-[#5c630e]/15 text-[#5c630e]",
      "bg-[#3b674c]/15 text-[#3b674c]",
    ];
    return palette[(id || 0) % palette.length];
  };

  const isLoading = status === "loading";
  const isEmpty = !data || data.length === 0;

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-border shadow-sm relative">
      <table className="w-full border-collapse table-fixed">
        <thead className="bg-[#f9f7f4] border-b border-border">
          <tr className="text-on-surface-variant/90">
            <th className="p-4 text-right font-black uppercase text-[11px] tracking-widest w-[22%]">
              {t("donorName")}
            </th>
            <th className="p-4 text-center font-black uppercase text-[11px] tracking-widest w-[20%]">
              {t("contactInfo")}
            </th>
            <th className="p-4 text-center font-black uppercase text-[11px] tracking-widest w-[16%]">
              {lang === "ar" ? "الدولة" : "Country"}
            </th>
            <th className="p-4 text-center font-black uppercase text-[11px] tracking-widest w-[15%]">
              {t("sponsorStatus")}
            </th>
            <th className="p-4 text-center font-black uppercase text-[11px] tracking-widest w-[15%]">
              {t("joinDate")}
            </th>
            <th className="p-4 text-center font-black uppercase text-[11px] tracking-widest w-[12%]">
              {t("actions")}
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border bg-white">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <tr key={index} className="animate-pulse">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gray-200 shrink-0"></div>
                    <div className="space-y-2 w-full">
                      <div className="h-4 bg-gray-200 rounded-lg w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded-lg w-1/2"></div>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-center">
                  <div className="h-7 bg-gray-200 rounded-xl w-3/4 mx-auto"></div>
                </td>
                <td className="p-4 text-center">
                  <div className="h-7 bg-gray-200 rounded-xl w-2/3 mx-auto"></div>
                </td>
                <td className="p-4 text-center">
                  <div className="h-6 bg-gray-200 rounded-xl w-20 mx-auto"></div>
                </td>
                <td className="p-4 text-center">
                  <div className="h-4 bg-gray-200 rounded-lg w-24 mx-auto"></div>
                </td>
                <td className="p-4 text-center">
                  <div className="w-9 h-9 bg-gray-200 rounded-xl mx-auto"></div>
                </td>
              </tr>
            ))
          ) : isEmpty ? (
            <tr>
              <td
                colSpan="6"
                className="text-center py-16 text-gray-400 font-medium"
              >
                {lang === "ar" ? "لا توجد بيانات متاحة" : "No data available"}
              </td>
            </tr>
          ) : (
            data.map((item) => (
              <tr
                key={item.donorId || item.id}
                className="group hover:bg-primary-container/5 transition-all"
              >
                <td className="p-4 truncate">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs border shrink-0 ${getAvatarColor(
                        item.donorId || item.id,
                      )}`}
                    >
                      {item.firstName?.charAt(0)}
                    </div>
                    <div className="flex flex-col truncate min-w-0">
                      <span className="font-bold text-sm text-on-surface-variant truncate">
                        {`${item.firstName || ""} ${item.lastName || ""}`}
                      </span>
                      <span className="text-[11px] text-gray-400 flex items-center gap-1 truncate">
                        <Mail size={12} className="text-primary shrink-0" />
                        <span className="truncate text-primary/90">
                          {item.email}
                        </span>
                      </span>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-center truncate">
                  <span
                    className="text-xs font-bold text-[#5e5846] bg-[#fdfaf0] px-2.5 py-1.5 rounded-xl border border-[#f2e9d0] inline-flex items-center gap-1 truncate max-w-full"
                    dir="ltr"
                  >
                    <Phone size={12} className="text-primary shrink-0" />
                    <span className="truncate">
                      {item.countryCode} {item.number}
                    </span>
                  </span>
                </td>
                <td className="p-4 text-center truncate">
                  <span
                    className="text-xs font-bold text-gray-700 bg-gray-50 px-2.5 py-1.5 rounded-xl border border-gray-200 inline-flex items-center gap-1 truncate max-w-full"
                    title={item.countryName}
                  >
                    <Globe size={12} className="text-primary shrink-0" />
                    <span className="truncate">{item.countryName || "-"}</span>
                  </span>
                </td>
                <td className="p-4 text-center">
                  {item.isSponsor ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-[10px] font-black bg-[#eefcf4] text-[#1b6b3e] border border-[#c8e6d5]">
                      <ShieldCheck size={12} />
                      {t("activeSponsor")}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-[10px] font-black bg-gray-50 text-gray-600 border border-gray-200">
                      <Heart size={12} />
                      {t("generalDonor")}
                    </span>
                  )}
                </td>
                <td className="p-4 text-center">
                  <span
                    className="text-xs text-gray-500 font-medium inline-flex items-center gap-1"
                    dir="ltr"
                  >
                    <Calendar size={12} className="text-primary shrink-0" />
                    {item.createdAt
                      ? new Date(item.createdAt).toLocaleDateString(
                          lang === "ar" ? "ar-EG" : "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          },
                        )
                      : "-"}
                  </span>
                </td>
                <td className="p-4 text-center">
                  <button
                    type="button"
                    onClick={() => onRowClick && onRowClick(item)}
                    className="inline-block p-2 bg-white border border-border rounded-xl text-primary hover:bg-primary hover:text-white transition-all shadow-sm cursor-pointer"
                    title={t("view") || "عرض التفاصيل"}
                  >
                    <Eye size={16} />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}