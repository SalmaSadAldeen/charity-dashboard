import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "@/store/userSlice";
import { useForm } from "@/hooks/useForm";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { fetchRoles } from "@/store/userSlice"; // استورديها هنا

export const useAddUserLogic = (t) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const validateEmployee = (data) => {
    let errors = {};

    // 1. التحقق من الأسماء
    if (!data.first_name || !data.first_name.trim())
      errors.first_name = t("firstNameIsRequired");
    if (!data.last_name || !data.last_name.trim())
      errors.last_name = t("lastNameIsRequired");

    // 2. التحقق من الإيميل
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email))
      errors.email = t("invalidEmail");

    // 3. التحقق من رقم الهاتف
    if (!data.number || data.number.length < 9)
      errors.number = t("phoneMustBe9Digits");

    // 4. التحقق من الجنس
    if (!data.gender) errors.gender = t("genderIsRequired");

    // 5. التحقق من تاريخ الميلاد
    if (!data.date_of_birth) errors.date_of_birth = t("dateIsRequired");

    // 6. التحقق من الأدوار (لازم يختار واحد على الأقل)
    if (!data.role_ids || data.role_ids.length === 0)
      errors.role_ids = t("selectAtLeastOneRole");

    // 7. التحقق من الدولة (الرمز والاسم)
    if (!data.country_code || !data.country_code.trim())
      errors.country_code = t("countryCodeRequired");
    if (!data.country_name || !data.country_name.trim())
      errors.country_name = t("countryNameRequired");

    // 8. التحقق من الصورة الشخصية
    if (!data.personal_photo)
      errors.personal_photo = t("personalPhotoIsRequired");

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
  useEffect(() => {
    dispatch(fetchRoles());
  }, [dispatch]);

  const toggleRole = (roleId) => {
    setFormData((prev) => ({
      ...prev,
      role_ids: prev.role_ids.includes(roleId)
        ? prev.role_ids.filter((id) => id !== roleId)
        : [...prev.role_ids, roleId],
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error(t("pleaseFixErrors"));
      return;
    }

    const dataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null) dataToSend.append(key, formData[key]);
    });

    setIsLoading(true);
    try {
      await dispatch(addUser(dataToSend)).unwrap();
      toast.success(t("userAddedSuccessfully"));

      // هنا التصفير الحقيقي
      setFormData({
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
      });
      setErrors({});
    } catch (error) {
      toast.error(error.response?.data?.message || t("errorOccurred"));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    setFormData,
    handleInputChange,
    errors,
    toggleRole,
    handleSubmit,
    isLoading,
  };
};
