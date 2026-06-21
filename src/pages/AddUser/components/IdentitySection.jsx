import { User } from "lucide-react"; // استيراد
// IdentitySection.jsx
export default function IdentitySection({
  formData,
  handleInputChange,
  t,
  errors,
}) {
  return (
    <div className="bg-white p-8 rounded-3xl border border-[#d0c6b0] shadow-md transition-all hover:shadow-lg">
      <h3 className="font-bold text-lg mb-6 text-[#4d4636] flex items-center gap-2">
        <User size={20} className="text-[#735c00]" /> {t("primaryUserIdentity")}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* الاسم الأول */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            {t("firstName")}
          </label>
          <input
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className="w-full p-4 border border-[#d0c6b0] rounded-2xl shadow-inner focus:border-[#735c00] outline-none transition-all"
            placeholder={t("sarah")}
          />
          {errors.first_name && (
            <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
          )}
        </div>

        {/* اسم العائلة */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            {t("lastName")}
          </label>
          <input
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className="w-full p-4 border border-[#d0c6b0] rounded-2xl shadow-inner focus:border-[#735c00] outline-none transition-all"
            placeholder={t("alFahad")}
          />
          {errors.lastName && (
            <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
          )}
        </div>

        {/* البريد الإلكتروني (ملاحظة: هو col-span-2 لذا يجب أن يكون الخطأ داخله) */}
        <div className="col-span-2">
          <label className="block text-sm font-semibold mb-2">
            {t("corporateEmail")}
          </label>
          <input
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-4 border border-[#d0c6b0] rounded-2xl shadow-inner focus:border-[#735c00] outline-none transition-all"
            placeholder="name@charityconnect.org"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        {/* رمز الدولة */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            {t("countryCode")}
          </label>
          <input
            name="countryCode"
            value={formData.countryCode}
            onChange={handleInputChange}
            className="w-full p-4 border border-[#d0c6b0] rounded-2xl shadow-inner focus:border-[#735c00] outline-none transition-all"
            placeholder="+966"
          />
          {errors.country_code && (
            <p className="text-red-500 text-xs mt-1">{errors.countryCode}</p>
          )}
        </div>

        {/* الهاتف */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            {t("phoneNumber")}
          </label>
          <input
            name="number"
            value={formData.number}
            onChange={handleInputChange}
            className="w-full p-4 border border-[#d0c6b0] rounded-2xl shadow-inner focus:border-[#735c00] outline-none transition-all"
            placeholder="501234567"
          />
          {errors.number && (
            <p className="text-red-500 text-xs mt-1">{errors.number}</p>
          )}
        </div>

        {/* اسم الدولة */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            {t("countryName")}
          </label>
          <input
            name="countryName"
            value={formData.countryName}
            onChange={handleInputChange}
            className="w-full p-4 border border-[#d0c6b0] rounded-2xl shadow-inner focus:border-[#735c00] outline-none transition-all"
            placeholder={t("saudiArabia")}
          />
          {errors.countryName && (
            <p className="text-red-500 text-xs mt-1">{errors.countryName}</p>
          )}
        </div>

        {/* الجنس */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            {t("gender")}
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            className="w-full p-4 border border-[#d0c6b0] rounded-2xl shadow-inner focus:border-[#735c00] outline-none transition-all"
          >
            <option value="">{t("selectGender")}</option>
            <option value="male">{t("male")}</option>
            <option value="female">{t("female")}</option>
          </select>
          {errors.gender && (
            <p className="text-red-500 text-xs mt-1">{errors.gender}</p>
          )}
        </div>
      </div>
    </div>
  );
}
