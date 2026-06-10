import { useSelector } from "react-redux";
import { translations } from "@/context/translations";
import IdentitySection from "@/pages/AddUser/components/IdentitySection";
import EmploymentSection from "@/pages/AddUser/components/EmploymentSection";
import RolesSection from "@/pages/AddUser/components/RolesSection";
import { useAddUserLogic } from "@/hooks/useAddUserLogic"; // الملف الجديد

export default function AddUser() {
  const lang = useSelector((state) => state.language.lang);
  const t = (key) => translations[lang][key] || key;
  const { roles } = useSelector((state) => state.user);

  // استدعاء كل شيء من الـ Hook المنفصل
  const {
    formData,
    setFormData,
    handleInputChange,
    errors,
    toggleRole,
    handleSubmit,
    isLoading,
  } = useAddUserLogic(t);

  return (
    <div className="p-8 bg-[#f5ede0] min-h-screen">
      <h2 className="text-[32px] font-bold mb-8 text-[#1f1b14]">
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
        />

        <RolesSection
          roles={roles}
          formData={formData}
          toggleRole={toggleRole}
          errors={errors}
          t={t}
        />

        <button
          type="submit"
          disabled={isLoading} // يمنع الضغط المتكرر أثناء الحفظ
          className="w-full bg-[#fad564] hover:bg-[#e6c25a] text-[#4d4636] font-bold py-4 rounded-2xl transition-all duration-300 shadow-md hover:shadow-lg active:scale-[0.98]"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              {t("saving")}...
            </span>
          ) : (
            t("confirmAndSave")
          )}
        </button>
      </form>
    </div>
  );
}
