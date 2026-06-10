import { useState } from "react";
import { useDispatch } from "react-redux";
import { addOrphan } from "@/store/orphanSlice";
import { useForm } from "@/hooks/useForm";
import toast from "react-hot-toast";

export const useOrphanFormLogic = (t) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const validateOrphan = (data) => {
    let errors = {};
    if (!data.first_name?.trim()) errors.first_name = t("firstNameIsRequired");
    if (!data.last_name?.trim()) errors.last_name = t("lastNameIsRequired");
    if (!data.father_name?.trim())
      errors.father_name = t("fatherNameIsRequired");
    if (!data.mother_name?.trim())
      errors.mother_name = t("motherNameIsRequired");
    if (!data.gender) errors.gender = t("genderIsRequired");
    if (!data.date_of_birth) errors.date_of_birth = t("dateIsRequired");
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
      first_name: "",
      last_name: "",
      father_name: "",
      mother_name: "",
      gender: "",
      date_of_birth: "",
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
      toast.success(t("orphanAddedSuccessfully"));

      // تصفير النموذج
      setFormData({
        first_name: "",
        last_name: "",
        father_name: "",
        mother_name: "",
        gender: "",
        date_of_birth: "",
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
