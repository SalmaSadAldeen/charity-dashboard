import { useTranslation } from "@/hooks/useTranslation";
// استيراد الصورة (تأكدي من تغيير المسار ليتناسب مع موقع ملف الصورة عندك)
import logoImage from "@/assets/images/photo_2026-06-29_15-16-38.jpg";

const LoginHeader = ({ error }) => {
  const { t } = useTranslation();

  return (
    <div className="pt-8 pb-6 px-8 flex flex-col items-center text-center">
      {/* استبدال الـ div الحاوي للأيقونة بـ img */}
      <div className="w-16 h-16 mb-4 flex items-center justify-center">
        <img
          src={logoImage}
          alt="Logo"
          className="w-full h-full object-contain"
        />
      </div>

      <h1 className="text-2xl font-semibold text-[#4a453e] tracking-tight">
        {t("charityOSAccess")}
      </h1>
      <p className="text-xs text-[#8c8579] mt-2">
        {t("authorizedCredentialsNote")}
      </p>

      {error && (
        <p className="text-xs text-red-500 mt-2 bg-red-50 p-2 rounded w-full border border-red-100">
          {error}
        </p>
      )}
    </div>
  );
};

export default LoginHeader;
