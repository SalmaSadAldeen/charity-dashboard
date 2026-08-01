import { DetailRow } from "./DetailRow";
import { useTranslation } from "@/hooks/useTranslation";

export default function PersonalInfoCard({ data }) {
  const { t, lang } = useTranslation();

  const address =
    data?.beneficiary?.address?.[lang] || data?.beneficiary?.address?.["ar"];

  const dateOfBirth = data?.beneficiary?.dateOfBirth;

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString;

      return new Intl.DateTimeFormat(lang === "ar" ? "ar-EG" : "en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(date);
    } catch {
      return dateString;
    }
  };
  

   
  return (
    <div
      className="bg-white p-8 rounded-[2rem] border border-border/30 shadow-[0_8px_30px_rgb(0,0,0,0.04)] 
                    hover:border-border hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] 
                    transition-all duration-500 ease-out h-full flex flex-col group"
    >
      <h3 className="text-xl font-black text-primary mb-8 border-b border-gray-100 pb-4">
        {t("basicInfo")}
      </h3>

      {/* هذا الـ div سيأخذ المساحة المتبقية ويوزع السطور بانتظام */}
      <div className="flex flex-col flex-grow justify-evenly space-y-2">
        <DetailRow label={t("email")} value={data?.email} />
        <DetailRow
          label={t("phoneNumber")}
          value={`${data?.countryCode} ${data?.number}`}
        />
        <DetailRow label={t("countryName")} value={t("syria")} />
        <DetailRow label={t("gender")} value={t(data?.gender?.toLowerCase())} />
        <DetailRow label={t("address")} value={address} />
        <DetailRow label={t("dateOfBirth")} value={formatDate(dateOfBirth)} />
      </div>
    </div>
  );
}
