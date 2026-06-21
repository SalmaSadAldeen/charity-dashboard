import { useDispatch, useSelector } from "react-redux";
import { useForm } from "@/hooks/useForm";
import toast from "react-hot-toast";
import { addEmployee, updateEmployee } from "@/store/index"; // تأكدي من المسار الصحيح
import { useEffect } from "react";
import { API } from "@/services/adminService";
export const useUserFormLogic = (t, initialData = null) => {
  const dispatch = useDispatch();
  // استنتاج هل نحن في حالة تعديل أم إضافة

  const { status } = useSelector((state) => state.employees);
  const isLoading = status === "loading";
  const isEdit = !!initialData;

  const employeeId = initialData?.id;
  const validateEmployee = (data) => {
    let errors = {};

    // 1. التحقق من الأسماء
    if (!data.firstName || !data.firstName.trim())
      errors.firstName = t("firstNameIsRequired");
    if (!data.lastName || !data.lastName.trim())
      errors.lastName = t("lastNameIsRequired");

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
    if (!data.dateOfBirth) errors.dateOfBirth = t("dateIsRequired");

    // 6. التحقق من الأدوار (لازم يختار واحد على الأقل)
    if (!data.roleIds || data.roleIds.length === 0)
      errors.roleIds = t("selectAtLeastOneRole");

    // 7. التحقق من الدولة (الرمز والاسم)
    if (!data.countryCode || !data.countryCode.trim())
      errors.countryCode = t("countryCodeRequired");
    if (!data.countryName || !data.countryName.trim())
      errors.countryName = t("countryNameRequired");

    // 8. التحقق من الصورة الشخصية
    if (!data.personalPhoto)
      errors.personalPhoto = t("personalPhotoIsRequired");

    return errors;
  };
  // في useUserFormLogic.js - تأكدي أن الأسماء هي نفسها:
  const {
    formData,
    setFormData,
    handleInputChange,
    errors,
    validateForm, // هذه الدالة جاهزة الآن
    clearError,
  } = useForm(
    {
      firstName: "",
      lastName: "", // تأكدي أن الـ input name في الـ Component هو "lastName"
      email: "",
      number: "",
      countryCode: "",
      countryName: "", // تأكدي أن الـ input name في الـ Component هو "countryName"
      gender: "",
      dateOfBirth: "",
      personalPhoto: null,
      roleIds: [], // هنا الاسم roleIds
    },
    validateEmployee,
  );

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData, setFormData]);

  const toggleRole = (roleId) => {
    setFormData((prev) => ({
      ...prev,
      roleIds: prev.roleIds.includes(roleId)
        ? prev.roleIds.filter((id) => id !== roleId)
        : [...prev.roleIds, roleId],
    }));
    clearError("roleIds");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      let photoUrl = formData.personalPhoto; // القيمة الافتراضية

      // إذا كان المختار "ملف" وليس رابطاً، يجب رفعه أولاً
      if (formData.personalPhoto instanceof File) {
        const formDataFile = new FormData();
        formDataFile.append("file", formData.personalPhoto);

        // طلب رفع الصورة للسيرفر
        const uploadResponse = await API.post(
          "/employee/upload",
          formDataFile,
          {
            headers: { "Content-Type": "multipart/form-data" },
          },
        );
        photoUrl = uploadResponse.data.url; // الحصول على الرابط من السيرفر
      }

      // الآن نجهز البيانات لإرسالها
      const dataToSend = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        number: formData.number,
        gender: formData.gender.toUpperCase(),
        dateOfBirth: formData.dateOfBirth,
        countryCode: formData.countryCode,
        countryName: formData.countryName,
        personalPhoto: photoUrl, // هنا الرابط النصي الذي استلمناه
        roleIds: formData.roleIds.map(Number),
      };

      if (isEdit) {
        await dispatch(
          updateEmployee({ id: employeeId, data: dataToSend }),
        ).unwrap();
        toast.success(t("userUpdatedSuccessfully"));
      } else {
        // إذا كان إضافة
        await dispatch(addEmployee(dataToSend)).unwrap();
        toast.success(t("userAddedSuccessfully"));
      }
    } catch (error) {
      console.error("خطأ:", error);
      toast.error(t("errorOccurred"));
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
    clearError,
    isEdit,
  };
};
