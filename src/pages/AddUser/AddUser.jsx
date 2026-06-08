import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoles } from "@/store/userSlice";
import { translations } from "@/context/translations";
import { useState } from "react"; // تأكدي من إضافة useState هنا
// استيراد المكونات التي برمجناها
import toast from "react-hot-toast";
// استيراد المكتبة

import IdentitySection from "@/pages/AddUser/components/IdentitySection";
import EmploymentSection from "@/pages/AddUser/components/EmploymentSection";
import RolesSection from "@/pages/AddUser/components/RolesSection";
import { useForm } from "@/hooks/useForm";

export default function AddUser() {
  const dispatch = useDispatch();
  const lang = useSelector((state) => state.language.lang);
  const t = (key) => translations[lang][key] || key;
  const { roles } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  // 1. الحالة (State) المركزية لكل النموذج
  const {
    formData,
    setFormData,
    handleInputChange,
    errors,
    setErrors,
    validateForm,
  } = useForm(
    {
      first_name: "",
      last_name: "",
      email: "",
      number: "",
      country_code: "",
      country_name: "",
      gender: "",
      date_of_birth: "",
      personal_photo: null,
      role_ids: [],
    },

    validateEmployee,
  );
  // 2. تحديث الحقول النصية (Identity)

  // 3. تحديث الأدوار (Roles)
  const toggleRole = (roleId) => {
    setFormData((prev) => ({
      ...prev,
      role_ids: prev.role_ids.includes(roleId)
        ? prev.role_ids.filter((id) => id !== roleId)
        : [...prev.role_ids, roleId],
    }));
  };

  useEffect(() => {
    dispatch(fetchRoles());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error(t("pleaseFixErrors"));
      return;
    }

    setIsLoading(true);

    try {
      // --- مكان الربط مع الباك-إند مستقبلاً ---
      // await dispatch(addUser(formData)).unwrap();

      // -- حالياً نترك المحاكاة --
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.success(t("userAddedSuccessfully"), {
        /* التنسيق الخاص بكِ */
      });
    } catch (error) {
      toast.error(t("errorOccurred"));
    } finally {
      setIsLoading(false);
    }
  };
  function validateEmployee(data) {
    let errors = {};

    if (!data.first_name) errors.first_name = t("firstNameIsRequired");
    if (!data.email.includes("@")) errors.email = t("invalidEmail");
    if (data.number.length < 9) errors.number = t("phoneMustBe9Digits");
    if (!data.gender) errors.gender = t("genderIsRequired");

    return errors;
  }

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
          t={t}
        />

        <RolesSection
          roles={roles}
          formData={formData}
          toggleRole={toggleRole}
          t={t}
        />

        <button
          type="submit"
          disabled={isLoading} // يمنع الضغط المتكرر أثناء الحفظ
          className="w-full bg-[#4d4636] text-white py-4 rounded-2xl"
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
