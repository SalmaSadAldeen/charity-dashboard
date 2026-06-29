import { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "@/hooks/useForm";
import toast from "react-hot-toast";
import { addOrphan, updateOrphan } from "@/store/index"; // تأكدي من المسار الصحيح

export const useOrphanFormLogic = (t) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const validateOrphan = (data) => {
    let errors = {};
    if (!data.firstName?.trim()) errors.firstName = t("firstNameIsRequired");
    if (!data.lastName?.trim()) errors.lastName = t("lastNameIsRequired");
    if (!data.father_name?.trim())
      errors.father_name = t("fatherNameIsRequired");
    if (!data.mother_name?.trim())
      errors.mother_name = t("motherNameIsRequired");
    if (!data.gender) errors.gender = t("genderIsRequired");
    if (!data.dateOfBirth) errors.dateOfBirth = t("dateIsRequired");
    if (!data.class?.trim()) errors.class = t("classIsRequired");
    if (!data.Guardian_name?.trim())
      errors.Guardian_name = t("guardianNameRequired");
    if (!data.Family_statement) errors.Family_statement = t("fileIsRequired");

    return errors;
  };
  const {
    formData,
    setFormData,
    handleInputChange,
    errors,
    setErrors,
    validateForm,
  } = useForm(
    {
      firstName: "",
      lastName: "",
      father_name: "",
      mother_name: "",
      gender: "",
      dateOfBirth: "",
      class: "",
      Guardian_name: "",
      How_brother_and_sister_number: 0,
      is_supported: 0,
      Diseases: "",
      Family_statement: null,
      guaranteed_phone: 0,
    },
    validateOrphan,
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    // تنفيذ التحقق قبل الإرسال
    if (!validateForm()) {
      toast.error(t("pleaseFixErrors"));
      return;
    }

    const dataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      // إرسال القيم كما هي، الـ FormData تتعامل مع الملفات والنصوص
      if (formData[key] !== null) dataToSend.append(key, formData[key]);
    });

    setIsLoading(true);
    try {
      await dispatch(addOrphan(dataToSend)).unwrap();
      // بدلاً من toast.info(...)
      toast(t("noChangesDetected"), {
        icon: "ℹ️",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      // تصفير النموذج
      setFormData({
        firstName: "",
        lastName: "",
        father_name: "",
        mother_name: "",
        gender: "",
        dateOfBirth: "",
        class: "",
        Guardian_name: "",
        How_brother_and_sister_number: 0,
        is_supported: 0,
        Diseases: "",
        Family_statement: null,
        guaranteed_phone: 0,
      });
      setErrors({});
    } catch (error) {
      toast.error(error.message || t("errorOccurred"));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    setFormData,
    handleInputChange,
    errors,
    handleSubmit,
    isLoading,
  };
};
