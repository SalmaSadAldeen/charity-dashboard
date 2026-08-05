import { User } from "lucide-react";

export default function IdentitySection({
  formData,
  handleInputChange,
  t,
  errors,
}) {
  return (
    <div className="bg-surface-lowest p-8 rounded-3xl border border-border shadow-md transition-all hover:shadow-lg">
      <h3 className="font-bold text-lg mb-6 text-on-surface-variant flex items-center gap-2">
        <User size={20} className="text-primary" /> {t("primaryUserIdentity")}
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
        {/* الاسم الأول */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            {t("firstName")}
          </label>
          <input
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className="w-full p-4 border border-border rounded-2xl shadow-inner focus:border-secondary outline-none transition-all"
            placeholder={t("sarah")}
          />
          {errors.firstName && (
            <p className="text-error text-xs mt-1">{errors.firstName}</p>
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
            className="w-full p-4 border border-border rounded-2xl shadow-inner focus:border-secondary outline-none transition-all"
            placeholder={t("alFahad")}
          />
          {errors.lastName && (
            <p className="text-error text-xs mt-1">{errors.lastName}</p>
          )}
        </div>

        {/* البريد الإلكتروني (ملاحظة: هو col-span-2 لذا يجب أن يكون الخطأ داخله) */}
        <div className="col-span-2">
          <label className="block text-sm font-semibold mb-2">
            {t("email")}
          </label>
          <input
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-4 border border-border rounded-2xl shadow-inner focus:border-secondary outline-none transition-all"
            placeholder="name@charityconnect.org"
          />
          {errors.email && (
            <p className="text-error text-xs mt-1">{errors.email}</p>
          )}
        </div>

        {/* رمز الدولة */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            {t("countryCode")}
          </label>
          <input
            name="countryCode"
            value="+963"
            onChange={handleInputChange}
            className="w-full p-4 border border-border rounded-2xl shadow-inner focus:border-secondary outline-none transition-all"

          />
          {/* {errors.countryCode && (
            <p className="text-error text-xs mt-1">{errors.countryCode}</p>
          )} */}
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
            className="w-full p-4 border border-border rounded-2xl shadow-inner focus:border-secondary outline-none transition-all"
            placeholder="501234567"
          />
          {errors.number && (
            <p className="text-error text-xs mt-1">{errors.number}</p>
          )}
        </div>

        {/* اسم الدولة */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            {t("countryName")}
          </label>
          <input
            name="countryName"
            value={t("syria")}
            onChange={handleInputChange}
            className="w-full p-4 border border-border rounded-2xl shadow-inner focus:border-secondary outline-none transition-all"

          />
          {/* {errors.countryName && (
            <p className="text-error text-xs mt-1">{errors.countryName}</p>
          )} */}
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
            className="w-full p-4 border border-border rounded-2xl shadow-inner focus:border-secondary outline-none transition-all"
          >
            <option value="">{t("selectGender")}</option>
            <option value="MALE">{t("male")}</option>{" "}
            {/* لاحظي تغيير القيمة لـ MALE */}
            <option value="FEMALE">{t("female")}</option>{" "}
            {/* لاحظي تغيير القيمة لـ FEMALE */}
          </select>
          {errors.gender && (
            <p className="text-error text-xs mt-1">{errors.gender}</p>
          )}
        </div>
      </div>
    </div>
  );
}
