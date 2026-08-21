import { useSelector, useDispatch } from "react-redux";
import IdentitySection from "@/pages/AddUser/components/IdentitySection";
import EmploymentSection from "@/pages/AddUser/components/EmploymentSection";
import RolesSection from "@/pages/AddUser/components/RolesSection";
import { useUserFormLogic } from "@/hooks/useUserFormLogic";
import { useTranslation } from "@/hooks/useTranslation";
import { useEffect } from "react";
import { fetchRoles } from "@/store/index";
import AppButton from "@/pages/Dashboard/components/AppButton";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react"; // تم إضافة ArrowLeft هنا
export default function AddUser() {
  const { t, lang } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const roles = useSelector((state) => state.roles.items);

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
  });

  const rolesStatus = useSelector((state) => state.roles.status);
  useEffect(() => {
    dispatch(fetchRoles());
  }, [dispatch, lang]);
  return (
    <div
      className={`p-8 bg-surface-container min-h-screen ${lang === "ar" ? "rtl" : "ltr"}`}
    >
      {/* رأس الصفحة مع زر الرجوع والعنوان بجانب بعضهما */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="p-2.5 bg-white shadow-sm border border-gray-200 rounded-full hover:bg-gray-50 transition-all duration-300 shrink-0 cursor-pointer"
          type="button"
        >
          <ArrowLeft size={20} className="text-gray-700 rtl:rotate-180" />
        </button>
        <h2 className="text-[32px] font-bold mb-8 text-on-surface-variant">
          {t("addNewSystemUser")}
        </h2>
      </div>{" "}
      {/* <-- تم إغلاق الـ div هنا بشكل صحيح */}
      <form onSubmit={handleSubmit} className="space-y-8">
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
          lang={lang}
        />
        <RolesSection
          roles={roles}
          formData={formData}
          toggleRole={toggleRole}
          errors={errors}
          t={t}
          lang={lang}
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
