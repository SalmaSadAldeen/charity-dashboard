import { User } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function PersonalInfoSection({
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
        <User size={18} className="text-primary" />
        <span>{t("personalInformation") || "Personal Information"}</span>
      </h3>

      {/* الصف الأول: الاسم الأول والكنية */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold mb-2 text-gray-700">
            {t("firstName") || "First Name"} *
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={onChange}
            placeholder={t("firstNamePlaceholder")}
            className="w-full border border-gray-200 bg-white p-3.5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
          />
          {errors.firstName && (
            <span className="text-red-500 text-xs mt-1 block font-medium">
              {errors.firstName}
            </span>
          )}
        </div>
        <div>
          <label className="block text-sm font-bold mb-2 text-gray-700">
            {t("lastName") || "Last Name"} *
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={onChange}
            placeholder={t("lastNamePlaceholder")}
            className="w-full border border-gray-200 bg-white p-3.5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
          />
          {errors.lastName && (
            <span className="text-red-500 text-xs mt-1 block font-medium">
              {errors.lastName}
            </span>
          )}
        </div>
      </div>

      {/* الصف الثاني: البريد الإلكتروني وكلمة المرور */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold mb-2 text-gray-700">
            {t("email") || "Email"} *
          </label>
          <input
            type="email"
            name="email"
            autoComplete="off"
            value={formData.email}
            onChange={onChange}
            placeholder={t("emailPlaceholder")}
            className="w-full border border-gray-200 bg-white p-3.5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
          />
          {errors.email && (
            <span className="text-red-500 text-xs mt-1 block font-medium">
              {errors.email}
            </span>
          )}
        </div>
        <div>
          <label className="block text-sm font-bold mb-2 text-gray-700">
            {t("password") || "Password"} *
          </label>
          <input
            type="password"
            name="password"
            autoComplete="new-password"
            value={formData.password}
            onChange={onChange}
            placeholder="••••••••"
            className="w-full border border-gray-200 bg-white p-3.5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
          />
          {errors.password && (
            <span className="text-red-500 text-xs mt-1 block font-medium">
              {errors.password}
            </span>
          )}
        </div>
      </div>

      {/* الصف الثالث والأخير: الجنس، تاريخ الميلاد، والحالة الاجتماعية (موزعة على عامودين ليتطابق الشكل) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold mb-2 text-gray-700">
            {t("gender") || "Gender"} *
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={onChange}
            className="w-full border border-gray-200 bg-white p-3.5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary shadow-sm cursor-pointer"
          >
            <option value="" disabled>
              {t("selectGender") || "Select Gender..."}
            </option>
            <option value="MALE">{t("male") || "Male"}</option>
            <option value="FEMALE">{t("female") || "Female"}</option>
          </select>
          {errors.gender && (
            <span className="text-red-500 text-xs mt-1 block font-medium">
              {errors.gender}
            </span>
          )}
        </div>

        <div>
          <label className="block text-sm font-bold mb-2 text-gray-700">
            {t("dateOfBirth") || "Date of Birth"} *
          </label>

          <DatePicker
            selected={
              formData.dateOfBirth ? new Date(formData.dateOfBirth) : null
            }
            onChange={(date) => {
              const formattedDate = date
                ? date.toISOString().split("T")[0]
                : "";

              onChange({
                target: {
                  name: "dateOfBirth",
                  value: formattedDate,
                },
              });
            }}
            showYearDropdown
            showMonthDropdown
            dropdownMode="select"
            scrollableYearDropdown
            yearDropdownItemNumber={100}
            dateFormat="dd/MM/yyyy"
            placeholderText={t("dateOfBirthPlaceholder")}
            wrapperClassName="w-full"
            className="w-full border border-gray-200 bg-white p-3.5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
          />

          {errors.dateOfBirth && (
            <span className="text-red-500 text-xs mt-1 block font-medium">
              {errors.dateOfBirth}
            </span>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-bold mb-2 text-gray-700">
            {t("socialStatus") || "Social Status"} *
          </label>
          <select
            name="socialStatus"
            value={formData.socialStatus}
            onChange={onChange}
            className="w-full border border-gray-200 bg-white p-3.5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary shadow-sm cursor-pointer"
          >
            <option value="SINGLE">{t("single") || "Single"}</option>
            <option value="MARRIED">{t("married") || "Married"}</option>
            <option value="DIVORCED">{t("divorced") || "Divorced"}</option>
            <option value="WIDOWED">{t("widowed") || "Widowed"}</option>
          </select>
          {errors.socialStatus && (
            <span className="text-red-500 text-xs mt-1 block font-medium">
              {errors.socialStatus}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
