import { Eye, DollarSign, User, HeartHandshake } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { useNavigate } from "react-router-dom";

export default function SponsorshipCard({ sponsorship }) {
  const { t } = useTranslation();
  const navigate = useNavigate();


  const getAvatarColor = (id) => {
    const palette = [
      "bg-[#735c00]/15 text-[#735c00]",
      "bg-[#5c630e]/15 text-[#5c630e]",
      "bg-[#3b674c]/15 text-[#3b674c]",
    ];
    return palette[(id || 0) % palette.length];
  };


  const getStatusStyle = (itemStatus) => {
    switch (itemStatus) {
      case "ACCEPTED":
        return "bg-[#3b674c]/10 text-[#3b674c] border-[#3b674c]/20";
      case "PENDING":
        return "bg-[#735c00]/10 text-[#735c00] border-[#735c00]/20";
      case "REJECTED":
      case "CANCELLED":
        return "bg-[#d93025]/10 text-[#d93025] border-[#d93025]/20";
      default:
        return "bg-surface text-on-surface-variant/60 border-border";
    }
  };

  return (
    <div
      onClick={() => navigate(`/dashboard/sponsorships/${sponsorship.id}`)}
      className="cursor-pointer group h-full"
    >
      <div className="h-full flex flex-col p-6 rounded-[2rem] border-2 border-border bg-surface-lowest shadow-[0_5px_30px_rgba(0,0,0,0.05)] transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-lg justify-between gap-6">
        
        {/* رأس البطاقة */}
        <div className="flex justify-between items-start">
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-lg ${getAvatarColor(
              sponsorship.id
            )}`}
          >
            {sponsorship.donor?.firstName?.charAt(0) || "S"}
          </div>
          
        </div>

        {/* تفاصيل الكفيل والمكفول */}
        <div className="flex-grow space-y-4 min-w-0">
          <div className="flex items-center gap-3 truncate">
            <User size={15} className="text-primary shrink-0" />
            <div className="truncate">
              <span className="text-[11px] text-on-surface-variant/60 block font-medium">
                {t("donor")}
              </span>
              <span className="font-bold text-sm text-on-surface-variant truncate block">
                {sponsorship.donor
                  ? `${sponsorship.donor.firstName || ""} ${sponsorship.donor.lastName || ""}`
                  : "-"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 truncate">
            <HeartHandshake size={15} className="text-secondary shrink-0" />
            <div className="truncate">
              <span className="text-[11px] text-on-surface-variant/60 block font-medium">
                {t("orphan")}
              </span>
              <span className="font-bold text-sm text-on-surface-variant truncate block">
                {sponsorship.orphan
                  ? `${sponsorship.orphan.firstName || ""} ${sponsorship.orphan.lastName || ""}`
                  : "-"}
              </span>
            </div>
          </div>
        </div>

        {/* تفاصيل المبلغ والتاريخ */}
        <div className="pt-4 border-t border-border flex justify-between items-center text-xs">
          <div className="flex items-center gap-1.5 font-black text-primary text-sm">
            <DollarSign size={16} />
            <span>{sponsorship.monthlyAmount}</span>
          </div>
        
        </div>

        {/* الجزء السفلي: الحالة وزر العرض */}
        <div className="pt-4 border-t border-border flex justify-between items-center">
          <span
            className={`px-3 py-1 rounded-full text-[9px] font-black uppercase border ${getStatusStyle(
              sponsorship.status
            )}`}
          >
            {t(sponsorship.status) || sponsorship.status}
          </span>
          <div className="flex items-center gap-1 text-xs font-bold text-primary group-hover:underline">
            <Eye size={16} />
            <span>{t("view_details")}</span>
          </div>
        </div>

      </div>
    </div>
  );
}