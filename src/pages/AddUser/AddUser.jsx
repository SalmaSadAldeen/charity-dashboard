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
      {" "}
      <h2 className="text-[32px] font-bold mb-8 text-on-surface-variant">
        {t("addNewSystemUser")}
      </h2>
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
