import IdentitySection from "@/pages/AddUser/components/IdentitySection";
import EmploymentSection from "@/pages/AddUser/components/EmploymentSection";
import RolesSection from "@/pages/AddUser/components/RolesSection";
import { useUserFormLogic } from "@/hooks/useUserFormLogic";
import { useTranslation } from "@/hooks/useTranslation";
import { fetchRoles } from "@/store/index";
import { useSelector, useDispatch } from "react-redux"; // السطر الأهم
import { useMemo, useEffect } from "react";
// ... باقي الاستيرادات

export default function EditUser({ employeeId, onClose }) {
  const { t, lang } = useTranslation();
  // const dispatch = useDispatch(); // أضيفي هذا
  const roles = useSelector((state) => state.roles.items || []);
  const employee = useSelector((state) =>
    state.employees.items.find((e) => e.id === employeeId),
  );
  // useEffect(() => {
  //   dispatch(fetchRoles());
  // }, [lang, dispatch]);

  const initialData = useMemo(() => {
    //console.log("Employee:", employee);
    if (!employee) return null;
    return {
      ...employee,
      id: employee.id,
      firstName: employee.firstName || "",
      lastName: employee.lastName || "",
      email: employee.email || "",
      number: employee.number || "",
      // countryCode: employee.countryCode || "",
      // countryName: employee.countryName || "",
      gender: employee.gender || "",
      dateOfBirth: employee.employee?.dateOfBirth
        ? employee.employee.dateOfBirth.split("T")[0]
        : "",
      personalPhoto: employee.employee?.personalPhoto || null,
      roleIds: employee.roles ? employee.roles.map((r) => r.roleId) : [],
    };
  }, [employee]);

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

  if (!employee) return <div className="p-8 text-center">{t("loading")}</div>;

  return (
    <div
      className={`flex flex-col h-full w-full ${lang === "ar" ? "rtl" : "ltr"}`}
    >
      {/* 1. الرأس (ثابت) */}
      <div className="shrink-0 mb-6">
        <h2 className="text-[32px] font-bold text-on-surface-variant">
          {t("editProfile")}
        </h2>
        <p className="text-primary font-medium">
          {employee.firstName} {employee.lastName}
        </p>
      </div>

      {/* 2. منطقة المحتوى (سكرول مخفي) */}
      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 min-h-0">
        {" "}
        <form
          id="edit-user-form"
          onSubmit={handleSubmit}
          className="space-y-8 pb-4"
        >
          <div className="bg-[#fffdf9] border-l-4 border-[#735c00] p-4 rounded shadow-sm">
            <h3 className="font-bold text-primary">{t("note")}</h3>
            <p className="text-sm text-on-surface-variant">
              {t("youAreEditingEmployeeInfo")}
            </p>
          </div>

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
            handleInputChange={handleInputChange}
            clearError={clearError}
          />
          <RolesSection
            roles={roles}
            formData={formData}
            toggleRole={toggleRole}
            errors={errors}
            t={t}
            lang={lang} // أضيفي هذا السطر ليتم تمرير اللغة
            clearError={clearError}
          />
        </form>
      </div>

      {/* 3. الأزرار (مثبتة في الأسفل) */}
      <div className="shrink-0 pt-6 border-t mt-2 flex gap-4 bg-surface-lowest">
        {" "}
        <button
          type="button"
          onClick={onClose}
          className="flex-1 bg-white border border-border text-on-surface-variant font-bold py-4 rounded-2xl hover:bg-gray-50 transition-all"
        >
          {t("cancel")}
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isLoading}
          className={`flex-[2] py-4 rounded-2xl transition-all shadow-md active:scale-[0.98] ${
            isEdit
              ? "bg-[#2d5a27] hover:bg-[#1e3d1a]"
              : "bg-primary hover:bg-[#5e4b00]"
          } text-white font-bold`}
        >
          {isLoading
            ? t("saving")
            : isEdit
              ? t("saveChanges")
              : t("addNewEmployee")}
        </button>
      </div>
    </div>
  );
}
