// IdentitySection.jsx
export default function IdentitySection({
  formData,
  handleInputChange,
  t,
  errors,
}) {
  return (
    <div className="bg-white p-8 rounded-3xl border border-[#d0c6b0] shadow-sm">
      <h3 className="font-bold text-lg mb-6 text-[#4d4636]">
        {t("primaryUserIdentity")}
      </h3>
      <div className="grid grid-cols-2 gap-6">
        {/* الاسم الأول */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            {t("firstName")}
          </label>
          <input
            name="first_name"
            value={formData.first_name}
            onChange={handleInputChange}
            className="w-full p-4 border border-[#d0c6b0] rounded-2xl shadow-inner"
            placeholder={t("sarah")}
          />
          {errors.first_name && (
            <p className="text-red-500 text-xs mt-1">{errors.first_name}</p>
          )}
        </div>

        {/* اسم العائلة */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            {t("lastName")}
          </label>
          <input
            name="last_name"
            value={formData.last_name}
            onChange={handleInputChange}
            className="w-full p-4 border border-[#d0c6b0] rounded-2xl shadow-inner"
            placeholder={t("alFahad")}
          />
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
            className="w-full p-4 border border-[#d0c6b0] rounded-2xl shadow-inner"
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
            name="country_code"
            value={formData.country_code}
            onChange={handleInputChange}
            className="w-full p-4 border border-[#d0c6b0] rounded-2xl shadow-inner"
            placeholder="+966"
          />
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
            className="w-full p-4 border border-[#d0c6b0] rounded-2xl shadow-inner"
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
            name="country_name"
            value={formData.country_name}
            onChange={handleInputChange}
            className="w-full p-4 border border-[#d0c6b0] rounded-2xl shadow-inner"
            placeholder={t("saudiArabia")}
          />
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
            className="w-full p-4 border border-[#d0c6b0] rounded-2xl shadow-inner bg-white"
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
