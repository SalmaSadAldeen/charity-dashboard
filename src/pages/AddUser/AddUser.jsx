import { useSelector, useDispatch } from "react-redux";
import IdentitySection from "@/pages/AddUser/components/IdentitySection";
import EmploymentSection from "@/pages/AddUser/components/EmploymentSection";
import RolesSection from "@/pages/AddUser/components/RolesSection";
import { useUserFormLogic } from "@/hooks/useUserFormLogic"; // الملف الجديد
import { fetchRoles } from "@/store";
import { useTranslation } from "@/hooks/useTranslation";
import { useEffect } from "react";
export default function AddUser() {
  const { t, lang } = useTranslation();
  const dispatch = useDispatch();
  const roles = useSelector((state) => state.roles.items);
  console.log("Roles from Redux:", roles);
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
  } = useUserFormLogic(t);
  // في AddUser.jsx
  useEffect(() => {
    console.log("AddUser: useEffect بدأ التنفيذ...");
    const token = localStorage.getItem("token");

    if (token) {
      console.log("AddUser: التوكن موجود، سأقوم الآن بطلب الأدوار...");
      console.log("AddUser: التوكن موجود، جاري طلب الأدوار...");
      dispatch(fetchRoles()); // تأكدي أن fetchRoles مستوردة من store.js
    } else {
      console.warn("AddUser: لا يوجد توكن!");
    }
  }, [dispatch]);
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
          roles={roles.map((r) => ({ ...r, id: Number(r.id) }))}
          formData={formData} // تأكدي أن هذا السطر موجود
          toggleRole={toggleRole}
          errors={errors}
          t={t}
          clearError={clearError}
        />
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full font-bold py-4 rounded-2xl transition-all duration-300 shadow-md hover:shadow-lg active:scale-[0.98] 
    ${
      isLoading
        ? "bg-[#d0c6b0] cursor-not-allowed opacity-70"
        : "bg-primary-container hover:bg-[#e6c25a] text-on-surface-variant"
    }`}
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
