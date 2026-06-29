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
    const phoneRegex = /^\d{10}$/; // 10 أرقام فقط
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // 1. النصوص المطلوبة
    if (!data.firstName?.trim()) errors.firstName = t("firstNameIsRequired");
    if (!data.lastName?.trim()) errors.lastName = t("lastNameIsRequired");

    // 2. البريد الإلكتروني
    if (!data.email || !emailRegex.test(data.email))
      errors.email = t("invalidEmail");

    // 3. رقم الهاتف (المنطق المركز)
    if (!data.number) {
      errors.number = t("phoneIsRequired");
    } else if (!phoneRegex.test(data.number)) {
      errors.number = t("invalidPhoneNumber"); // تأكدي أن هذا المفتاح في ملف JSON للترجمة
    }

    // 4. الحقول الأخرى
    if (!data.gender) errors.gender = t("genderIsRequired");
    if (!data.dateOfBirth) errors.dateOfBirth = t("dateIsRequired");
    if (!data.roleIds || data.roleIds.length === 0)
      errors.roleIds = t("selectAtLeastOneRole");

    // الصورة (نقبل الـ File أو رابط النص إذا كان تعديل)
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
      // countryCode: "",
      // countryName: "",
      gender: "",
      dateOfBirth: "",
      personalPhoto: null,
      roleIds: [],
    },
    validateEmployee,
  ); // داخل useUserFormLogic.jsx
  // هذا الـ useEffect سيقوم بتحديث الفورم فوراً وبشكل إجباري عند تغير initialData
  useEffect(() => {
    if (initialData) {
      setFormData({
        firstName: initialData.firstName || "",
        lastName: initialData.lastName || "",
        email: initialData.email || "",
        number: initialData.number || "",
        // countryCode: initialData.countryCode || "",
        // countryName: initialData.countryName || "",
        gender: initialData.gender || "",
        dateOfBirth: initialData.dateOfBirth || "",
        personalPhoto: initialData.personalPhoto || null,
        roleIds: initialData.roleIds || [],
      });
    }
  }, [initialData]); // حذفنا أي شروط داخلية تعيق التحديث // تأكدي أنها تبقى هكذا، ولا تضعي formData في المصفوفة
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
    console.log("FormData:", JSON.stringify(formData));
    console.log("InitialData:", JSON.stringify(initialData));
    if (isEdit) {
      // 1. استخراج فقط الحقول التي يملكها الـ formData من الـ initialData
      const cleanedInitialData = {
        firstName: initialData.firstName || "",
        lastName: initialData.lastName || "",
        email: initialData.email || "",
        number: initialData.number || "",
        gender: initialData.gender || "",
        dateOfBirth: initialData.dateOfBirth || "",
        // مقارنة الـ roleIds كمصفوفات مرتبة
        roleIds: [...(initialData.roleIds || [])].sort((a, b) => a - b),
      };

      const currentFormData = {
        ...formData,
        roleIds: [...formData.roleIds].sort((a, b) => a - b),
        // نتجاهل الصورة في المقارنة النصية لأنها ملف
        personalPhoto: undefined,
      };

      // 2. المقارنة
      const isDataChanged =
        JSON.stringify(currentFormData) !== JSON.stringify(cleanedInitialData);
      const isPhotoChanged = formData.personalPhoto instanceof File;

      if (!isDataChanged && !isPhotoChanged) {
        // بدلاً من toast.info(...)
        toast(t("noChangesDetected"), {
          icon: "🟡",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
        return;
      }
    }
    setIsSubmitting(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("firstName", formData.firstName);
      formDataToSend.append("lastName", formData.lastName);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("number", formData.number);
      formDataToSend.append("gender", formData.gender.toUpperCase());
      formDataToSend.append("dateOfBirth", formData.dateOfBirth);
      formDataToSend.append("roleIds", formData.roleIds.join(","));

      if (formData.personalPhoto instanceof File) {
        formDataToSend.append("personalPhoto", formData.personalPhoto);
      }

      // إرسال الطلب
      const action = isEdit
        ? updateEmployee({ id: employeeId, data: formDataToSend })
        : addEmployee(formDataToSend);

      const result = await dispatch(action).unwrap();

      // النجاح: نأخذ الرسالة من السيرفر مباشرة
      const msg = result?.message || "تمت العملية بنجاح";
      toast.success(msg);

      if (onClose) onClose();
    } catch (error) {
      //console.log("Error details:", error);

      // 1. استخراج الرسالة من المسار الأساسي (الذي يعمل مع البريد)
      let msg =
        error?.response?.data?.message || // هذا المسار الصحيح للـ Axios
        error?.message ||
        error?.data?.message ||
        (typeof error === "string" ? error : null);

      // 2. إذا لم نجد رسالة من السيرفر وكان الخطأ 500 (انهيار السيرفر عند تكرار الرقم)
      // سنقوم هنا بوضع رسالة مخصصة للرقم
      if (!msg && error?.response?.status === 500) {
        msg = "رقم الهاتف مستخدم مسبقاً";
      }

      // 3. إذا لم نجد أي شيء حتى الآن، نضع القيمة الافتراضية
      const finalMsg = msg || "حدث خطأ غير معروف";

      toast.error(finalMsg);
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
