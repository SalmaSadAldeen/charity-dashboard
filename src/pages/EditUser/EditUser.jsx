import { useSelector } from "react-redux";
import IdentitySection from "@/pages/AddUser/components/IdentitySection";
import EmploymentSection from "@/pages/AddUser/components/EmploymentSection";
import RolesSection from "@/pages/AddUser/components/RolesSection";
import { useUserFormLogic } from "@/hooks/useUserFormLogic"; // الملف الجديد
import { useTranslation } from "@/hooks/useTranslation";
export default function EditUser({ employeeId, onClose }) {
  const { t, lang } = useTranslation();
  const { roles } = useSelector((state) => state.roles.items);
  const employee = useSelector((state) =>
    state.employees.items.find((e) => e.id === employeeId),
  );
  // 2. تجهيز البيانات (هنا نضع الرابط في personalPhoto)
  const initialData = employee
    ? {
        ...employee,
        // تأكدي أن اسم الحقل في الـ API هو photo_url، إذا كان مختلفاً (مثلاً profile_image) غيريه هنا
        personalPhoto: employee.photo_url || null,
      }
    : null;
  // استدعاء كل شيء من الـ Hook المنفصل
  const {
    formData,
    setFormData,
    handleInputChange,
    errors,
    toggleRole,
    handleSubmit,
    isLoading,
    clearError,
    isEdit,
  } = useUserFormLogic(t, initialData, onClose);
  if (!employee)
    return <div className="p-8">جاري البحث عن بيانات الموظف...</div>;
  console.log(employee);
  return (
    <div
      className={`p-8 bg-[#f5ede0] min-h-screen ${lang === "ar" ? "rtl" : "ltr"}`}
    >
      {" "}
      {/* العنوان الديناميكي */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-[32px] font-bold text-[#1f1b14]">
            {t("editProfile")}
          </h2>
          <p className="text-[#735c00] font-medium">
            {employee.first_name} {employee.last_name}
          </p>
        </div>
        {/* شريط تمييز لوضع التعديل */}
        <span className="bg-[#e5e1da] text-[#4d4636] px-4 py-1 rounded-full text-sm font-bold border border-[#d0c6b0]">
          {t("editMode")}
        </span>
      </div>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-[#fffdf9] border-l-4 border-[#735c00] p-4 rounded shadow-sm">
          <h3 className="font-bold text-[#735c00]">{t("note")}</h3>
          <p className="text-sm text-[#4d4636]">
            {t("youAreEditingEmployeeInfo")}
          </p>
        </div>
        {/* نمرر لكل قسم البيانات والدوال التي يحتاجها فقط */}
        <IdentitySection
          formData={formData}
          handleInputChange={handleInputChange}
          errors={errors}
          t={t}
        />

        <EmploymentSection
          formData={formData}
          setFormData={setFormData}
          errors={errors}
          t={t}
          handleInputChange={handleInputChange} // تمرير الدالة
          clearError={clearError}
        />

        <RolesSection
          roles={roles}
          formData={formData}
          toggleRole={toggleRole}
          errors={errors}
          t={t}
          clearError={clearError}
        />

        <div className="flex gap-4">
          {/* زر إلغاء */}
          <button
            type="button"
            onClick={() => window.history.back()}
            className="flex-1 bg-white border border-[#d0c6b0] text-[#4d4636] font-bold py-4 rounded-2xl hover:bg-gray-50 transition-all"
          >
            {t("cancel")}
          </button>

          {/* زر حفظ - هذا الزر الوحيد الذي يحمل type="submit" */}
          <button
            type="submit"
            disabled={isLoading}
            className={`flex-[2] py-4 rounded-2xl transition-all shadow-md active:scale-[0.98] ${
              isEdit
                ? "bg-[#2d5a27] hover:bg-[#1e3d1a]"
                : "bg-[#735c00] hover:bg-[#5e4b00]"
            } text-white font-bold`}
          >
            {isLoading
              ? t("saving")
              : isEdit
                ? t("saveChanges")
                : t("addNewEmployee")}
          </button>
        </div>
      </form>
    </div>
  );
}
