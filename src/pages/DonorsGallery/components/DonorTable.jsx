import { Eye, ShieldCheck, Heart, Mail, Phone, Calendar } from "lucide-react";

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
      {/* شاشة التحميل (Overlay) تغطي المحتوى تماماً وبنفس الارتفاع */}
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/70 backdrop-blur-[1px] z-20 min-h-[200px]">
          <div className="flex items-center gap-2 text-on-surface-variant/80 text-base font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-primary animate-bounce"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-primary animate-bounce [animation-delay:0.2s]"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-primary animate-bounce [animation-delay:0.4s]"></span>
            <span className="ms-2">
              {t("loading") ||
                (lang === "ar" ? "جاري التحميل..." : "Loading...")}
            </span>
          </div>
        </div>
      )}

      <table className="w-full border-collapse table-fixed">
        <thead className="bg-[#f9f7f4] border-b border-border">
          <tr className="text-on-surface-variant/90">
            <th className="p-5 text-right font-black uppercase text-[11px] tracking-widest w-1/4">
              {t("donorName")}
            </th>
            <th className="p-5 text-center font-black uppercase text-[11px] tracking-widest w-1/4">
              {t("contactInfo")}
            </th>
            <th className="p-5 text-center font-black uppercase text-[11px] tracking-widest w-1/6">
              {t("sponsorStatus")}
            </th>
            <th className="p-5 text-center font-black uppercase text-[11px] tracking-widest w-1/6">
              {t("joinDate")}
            </th>
            <th className="p-5 text-center font-black uppercase text-[11px] tracking-widest w-1/6">
              {t("actions")}
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border bg-white">
          {!isLoading && isEmpty ? (
            <tr>
              <td
                colSpan="5"
                className="text-center py-16 text-gray-400 font-medium"
              >
                {lang === "ar" ? "لا توجد بيانات متاحة" : "No data available"}
              </td>
            </tr>
          ) : (
            (data || []).map((item) => (
              <tr
                key={item.donorId || item.id}
                onClick={() => onRowClick && onRowClick(item)}
                className="group hover:bg-primary-container/5 transition-all cursor-pointer"
              >
                {/* الاسم والبريد الإلكتروني */}
                <td className="p-4 truncate">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs border ${getAvatarColor(
                        item.donorId || item.id,
                      )}`}
                    >
                      {item.firstName?.charAt(0)}
                    </div>
                    <div className="flex flex-col truncate">
                      <span className="font-bold text-sm text-on-surface-variant truncate">
                        {`${item.firstName || ""} ${item.lastName || ""}`}
                      </span>
                      <span className="text-[11px] text-gray-400 flex items-center gap-1 truncate">
                        <Mail size={12} className="text-primary shrink-0" />
                        {item.email}
                      </span>
                    </div>
                  </div>
                </td>

                {/* معلومات الاتصال */}
                <td className="p-4 text-center">
                  <span
                    className="text-xs font-bold text-[#5e5846] bg-[#fdfaf0] px-3 py-1.5 rounded-xl border border-[#f2e9d0] inline-flex items-center gap-1"
                    dir="ltr"
                  >
                    <Phone size={12} className="text-primary" />
                    {item.countryCode} {item.number}
                  </span>
                </td>

                {/* حالة الكفالة */}
                <td className="p-4 text-center">
                  {item.isSponsor ? (
                    <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-[10px] font-black bg-[#eefcf4] text-[#1b6b3e] border border-[#c8e6d5]">
                      <ShieldCheck size={12} />
                      {t("activeSponsor")}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-[10px] font-black bg-gray-50 text-gray-600 border border-gray-200">
                      <Heart size={12} />
                      {t("generalDonor")}
                    </span>
                  )}
                </td>

                {/* تاريخ الانضمام */}
                <td className="p-4 text-center">
                  <span
                    className="text-xs text-gray-500 font-medium inline-flex items-center gap-1"
                    dir="ltr"
                  >
                    <Calendar size={12} className="text-primary" />
                    {new Date(item.createdAt).toLocaleDateString("en-GB")}
                  </span>
                </td>

                {/* الإجراءات */}
                <td className="p-4 text-center">
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      onRowClick && onRowClick(item);
                    }}
                    className="inline-block p-2 bg-white border border-border rounded-xl text-primary hover:bg-primary hover:text-white transition-all shadow-sm"
                  >
                    <Eye size={16} />
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
