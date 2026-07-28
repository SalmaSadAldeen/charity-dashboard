import { useSelector, useDispatch } from "react-redux";
import IdentitySection from "@/pages/AddUser/components/IdentitySection";
import EmploymentSection from "@/pages/AddUser/components/EmploymentSection";
import RolesSection from "@/pages/AddUser/components/RolesSection";
import { useUserFormLogic } from "@/hooks/useUserFormLogic"; // الملف الجديد
import { useTranslation } from "@/hooks/useTranslation";
import { useEffect } from "react";
import { fetchRoles } from "@/store/index";
import AppButton from "@/pages/Dashboard/components/AppButton";
import { useNavigate } from "react-router-dom";
export default function AddUser() {
  const { t, lang } = useTranslation();
  const navigate = useNavigate(); // 2. عرفي الـ navigate
  const dispatch = useDispatch();
  const roles = useSelector((state) => state.roles.items);
  //console.log("Roles from Redux:", roles);
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
  } = useUserFormLogic(t, null, () => {
    navigate("/dashboard/employees");
  }); // ه
  // في AddUser.jsx

  // الحارس الذكي: يجلب الأدوار فقط إذا كانت الحالة idle (يعني لم تُجلب بعد)
  const rolesStatus = useSelector((state) => state.roles.status); // تأكدي من استدعاء هذا السطر

  useEffect(() => {
    // جلب الأدوار فقط إذا كانت الحالة 'idle' (لم يتم الطلب بعد)
    if (rolesStatus === "idle") {
      dispatch(fetchRoles());
    }
  }, [dispatch, rolesStatus],lang); // الاعتماد هنا ثابت ولا يسبب حلقة
  return (
    <div
      className={`p-8 bg-surface-container min-h-screen ${lang === "ar" ? "rtl" : "ltr"}`}
    >
      {" "}
      <h2 className="text-[32px] font-bold mb-8 text-on-surface-variant">
        {t("addNewSystemUser")}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-8">
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
          formData={formData} // تأكدي أن هذا السطر موجود
          toggleRole={toggleRole}
          errors={errors}
          t={t}
          lang={lang} // أضيفي هذا السطر ليتم تمرير اللغة
          clearError={clearError}
        />
        <AppButton
          isLoading={isLoading}
          text={t("confirmAndSave")}
          loadingText={t("saving")}
        />
      </form>
    </div>
  );
}
