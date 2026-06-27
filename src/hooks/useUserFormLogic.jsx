import { useDispatch, useSelector } from "react-redux";
import { useForm } from "@/hooks/useForm";
import toast from "react-hot-toast";
import { addEmployee, updateEmployee } from "@/store/index";
import { useEffect, useState } from "react"; // أضفنا useState
import { API } from "@/services/adminService";

export const useUserFormLogic = (t, initialData = null, onClose) => {
  const dispatch = useDispatch();

  // حالة التحميل الخاصة بعملية الحفظ (لضمان دقة الزر)
  const [isSubmitting, setIsSubmitting] = useState(false);

  // حالة الـ status العامة للـ Store (لأي عمليات أخرى)
  const { status } = useSelector((state) => state.employees);

  const isEdit = !!initialData;
  const employeeId = initialData?.id;

  const validateEmployee = (data) => {
    let errors = {};
    if (!data.firstName || !data.firstName.trim())
      errors.firstName = t("firstNameIsRequired");
    if (!data.lastName || !data.lastName.trim())
      errors.lastName = t("lastNameIsRequired");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email))
      errors.email = t("invalidEmail");
    if (!data.number || data.number.length < 9)
      errors.number = t("phoneMustBe9Digits");
    if (!data.gender) errors.gender = t("genderIsRequired");
    if (!data.dateOfBirth) errors.dateOfBirth = t("dateIsRequired");
    if (!data.roleIds || data.roleIds.length === 0)
      errors.roleIds = t("selectAtLeastOneRole");
    if (!data.countryCode || !data.countryCode.trim())
      errors.countryCode = t("countryCodeRequired");
    if (!data.countryName || !data.countryName.trim())
      errors.countryName = t("countryNameRequired");
    if (!data.personalPhoto)
      errors.personalPhoto = t("personalPhotoIsRequired");
    return errors;
  };

  const {
    formData,
    setFormData,
    handleInputChange,
    errors,
    validateForm,
    clearError,
  } = useForm(
    {
      firstName: "",
      lastName: "",
      email: "",
      number: "",
      countryCode: "",
      countryName: "",
      gender: "",
      dateOfBirth: "",
      personalPhoto: null,
      roleIds: [],
    },
    validateEmployee,
  ); // داخل useUserFormLogic.jsx
  useEffect(() => {
    if (initialData) {
      // 1. هنا نتحقق: هل البيانات التي في الـ Form حالياً (formData)
      // هي نفسها التي وصلت من initialData؟
      // إذا كانت متطابقة، لا داعي لإعادة التحديث.
      if (
        formData.firstName === initialData.firstName &&
        formData.email === initialData.email
      ) {
        return;
      }

      // 2. إذا لم تكن متطابقة، نقوم بالتحديث (Set)
      setFormData({
        firstName: initialData.firstName || "",
        lastName: initialData.lastName || "",
        email: initialData.email || "",
        number: initialData.number || "",
        countryCode: initialData.countryCode || "",
        countryName: initialData.countryName || "",
        gender: initialData.gender || "",
        dateOfBirth: initialData.dateOfBirth || "",
        personalPhoto: initialData.personalPhoto || null,
        // في useUserFormLogic.jsx
        roleIds: initialData.roleIds || [], // استخدمي المفتاح المباشر
      });
    }
  }, [initialData]); // تأكدي أنها تبقى هكذا، ولا تضعي formData في المصفوفة
  const toggleRole = (roleId) => {
    const idAsNumber = Number(roleId); // تأكيد أننا نتعامل مع رقم
    setFormData((prev) => ({
      ...prev,
      roleIds: prev.roleIds.includes(idAsNumber)
        ? prev.roleIds.filter((id) => id !== idAsNumber)
        : [...prev.roleIds, idAsNumber],
    }));
    clearError("roleIds");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const formDataToSend = new FormData();

      // إضافة البيانات النصية
      formDataToSend.append("firstName", formData.firstName);
      formDataToSend.append("lastName", formData.lastName);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("number", formData.number);
      formDataToSend.append("gender", formData.gender.toUpperCase());
      formDataToSend.append("dateOfBirth", formData.dateOfBirth);
      formDataToSend.append("countryCode", formData.countryCode);
      formDataToSend.append("countryName", formData.countryName);

      // التعديل المهم هنا: دمج الأدوار في نص واحد مفصول بفاصلة (مثل: "1,2")
      // هذا هو التنسيق الذي قبله الـ Curl الناجح
      formDataToSend.append("roleIds", formData.roleIds.join(","));
      // أضيفي هذا الكود قبل الإرسال مباشرة لترين ما الذي يتم إرساله
      console.log("البيانات المرسلة للباك إند:");
      for (let pair of formDataToSend.entries()) {
        console.log(pair[0], pair[1]);
      }
      // إضافة الصورة
      if (formData.personalPhoto instanceof File) {
        formDataToSend.append("personalPhoto", formData.personalPhoto);
      }

      // الإرسال
      if (isEdit) {
        await dispatch(
          updateEmployee({ id: employeeId, data: formDataToSend }),
        ).unwrap();
        toast.success(t("userUpdatedSuccessfully"));
      } else {
        await dispatch(addEmployee(formDataToSend)).unwrap();
        toast.success(t("userAddedSuccessfully"));
      }
      if (onClose) onClose();
    } catch (error) {
      console.error("خطأ:", error);
      toast.error(t("errorOccurred"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    setFormData,
    handleInputChange,
    errors,
    toggleRole,
    handleSubmit,
    isLoading: isSubmitting, // نرسل حالة الحفظ للواجهة
    clearError,
    isEdit,
  };
};
