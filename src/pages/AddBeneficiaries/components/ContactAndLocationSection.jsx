import { MapPin } from "lucide-react";

export default function ContactAndLocationSection({
  formData,
  onChange,
  errors,
  t,
  lang,
}) {
  const isArabic = lang === "ar";

  return (
    <div className="space-y-5 p-6 bg-gray-50/50 rounded-3xl border border-gray-100">
      <h3 className="text-base font-bold text-gray-800 flex items-center gap-2 border-b pb-3">
        <MapPin size={18} className="text-primary" />
        <span>{t("contactAndLocation") || "Contact & Location"}</span>
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-bold mb-2 text-gray-700">
            {t("phoneNumber") || "Phone Number"} *
          </label>
          <input
            type="text"
            name="number"
            value={formData.number}
            onChange={onChange}
            placeholder="938608157"
            className="w-full border border-gray-200 bg-white p-3.5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
          />
          {errors.number && (
            <span className="text-red-500 text-xs mt-1 block font-medium">
              {errors.number}
            </span>
          )}
        </div>

        <div>
          <label className="block text-sm font-bold mb-2 text-gray-700">
            {t("countryName") || "Country Name"} *
          </label>
          <input
            type="text"
            name="countryName"
            value={formData.countryName}
            onChange={onChange}
            placeholder={isArabic ? "سوريا" : "Syria"}
            className="w-full border border-gray-200 bg-white p-3.5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
          />
          {errors.countryName && (
            <span className="text-red-500 text-xs mt-1 block font-medium">
              {errors.countryName}
            </span>
          )}
        </div>

        <div>
          <label className="block text-sm font-bold mb-2 text-gray-700">
            {t("countryCode") || "Country Code"} *
          </label>
          <input
            type="text"
            name="countryCode"
            value={formData.countryCode}
            onChange={onChange}
            placeholder="+963"
            className="w-full border border-gray-200 bg-white p-3.5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
          />
          {errors.countryCode && (
            <span className="text-red-500 text-xs mt-1 block font-medium">
              {errors.countryCode}
            </span>
          )}
        </div>
      </div>

      {/* حقول العنوان بالعربي والإنجليزي لإرسالها كـ JSON */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold mb-2 text-gray-700">
            {t("addressAr") || "Address (Arabic)"} *
          </label>
          <input
            type="text"
            name="addressAr"
            value={formData.addressAr}
            onChange={onChange}
            placeholder="مثال: مزة"
            className="w-full border border-gray-200 bg-white p-3.5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
          />
          {errors.addressAr && (
            <span className="text-red-500 text-xs mt-1 block font-medium">
              {errors.addressAr}
            </span>
          )}
        </div>

        <div>
          <label className="block text-sm font-bold mb-2 text-gray-700">
            {t("addressEn") || "Address (English)"} *
          </label>
          <input
            type="text"
            name="addressEn"
            value={formData.addressEn}
            onChange={onChange}
            placeholder="e.g. mezzeh"
            className="w-full border border-gray-200 bg-white p-3.5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
          />
          {errors.addressEn && (
            <span className="text-red-500 text-xs mt-1 block font-medium">
              {errors.addressEn}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
