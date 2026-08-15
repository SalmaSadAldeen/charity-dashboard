import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "@/hooks/useForm";
import toast from "react-hot-toast";
import { addBeneficiary } from "@/store/index";

export const useBeneficiaryFormLogic = (t, onClose = null) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const validateBeneficiary = (data) => {
    let errors = {};
    if (!data.firstName?.trim()) errors.firstName = t("fieldIsRequired");
    if (!data.lastName?.trim()) errors.lastName = t("fieldIsRequired");
    if (!data.email?.trim()) {
      errors.email = t("fieldIsRequired");
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = t("invalidEmail");
    }
    if (!data.password?.trim()) {
      errors.password = t("fieldIsRequired");
    } else if (data.password.length < 6) {
      errors.password = t("passwordTooShort");
    }
    if (!data.number?.trim()) errors.number = t("fieldIsRequired");
    if (!data.countryName?.trim()) errors.countryName = t("fieldIsRequired");
    if (!data.countryCode?.trim()) errors.countryCode = t("fieldIsRequired");
    if (!data.gender) errors.gender = t("fieldIsRequired");
    if (!data.dateOfBirth) errors.dateOfBirth = t("fieldIsRequired");
    if (!data.addressAr?.trim()) errors.addressAr = t("fieldIsRequired");
    if (!data.addressEn?.trim()) errors.addressEn = t("fieldIsRequired");
    if (!data.socialStatus) errors.socialStatus = t("fieldIsRequired");

    if (!data.personalPhoto || !(data.personalPhoto instanceof File)) {
      errors.personalPhoto = t("fieldIsRequired");
    }
    if (!data.familyStatement || !(data.familyStatement instanceof File)) {
      errors.familyStatement = t("fieldIsRequired");
    }

    return errors;
  };

  const { formData, setFormData, errors, validateForm } = useForm(
    {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      number: "",
      countryName: "",
      countryCode: "",
      gender: "",
      dateOfBirth: "",
      personalPhoto: null,
      familyStatement: null,
      addressAr: "",
      addressEn: "",
      socialStatus: "SINGLE",
      isUnemployed: false,
      monthlyIncome: "",
      numberOfChildren: "",
    },
    validateBeneficiary,
  );

  const handleInputChange = (e) => {
    const { name, value, files, type, checked } = e.target;
    const newValue =
      type === "checkbox"
        ? checked
        : type === "file"
          ? files
            ? files[0]
            : null
          : value;

    setFormData((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error(t("pleaseFixErrors"));
      return;
    }

    setIsLoading(true);
    const dataToSend = new FormData();

    // 1. إرسال العنوان بالشكل الصحيح المطلوبة كـ JSON string
    const addressObject = {
      ar: formData.addressAr,
      en: formData.addressEn,
    };
    dataToSend.append("address", JSON.stringify(addressObject));

    // 2. إرسال باقي الحقول مع ضمان إرسال الحقول الاختيارية حتى لو كانت فارغة (لتجنب خطأ السيرفر)
    // 2. إرسال باقي الحقول مع استبعاد الحقول الاختيارية الفارغة تماماً
    Object.keys(formData).forEach((key) => {
      if (key === "addressAr" || key === "addressEn") return;

      const value = formData[key];

      // إذا كان الحقل اختيارياً (مثل الدخل أو عدد الأطفال) وكان فارغاً، نتجاهله ولا نرسله أبداً
      if (
        (key === "monthlyIncome" || key === "numberOfChildren") &&
        (value === "" || value === null || value === undefined)
      ) {
        return;
      }

      if (value !== null && value !== undefined && value !== "") {
        dataToSend.append(key, value);
      }
    });

    try {
      const result = await dispatch(addBeneficiary(dataToSend)).unwrap();
      toast.success(result?.message || t("successOperation"));

      if (onClose) {
        onClose();
      } else {
        navigate("/dashboard/beneficiaries");
      }
    } catch (error) {
      console.log("Full Error Object:", error);

      let errorMessage = t("errorOccurred");

      // معالجة تفصيلية لرسائل أخطاء السيرفر (NestJS Validation)
      const errorResponseData = error?.response?.data || error;

      if (errorResponseData && Array.isArray(errorResponseData.message)) {
        const messagesArray = [];
        errorResponseData.message.forEach((errItem) => {
          if (errItem?.constraints) {
            Object.values(errItem.constraints).forEach((msg) => {
              messagesArray.push(msg);
            });
          } else if (typeof errItem === "string") {
            messagesArray.push(errItem);
          }
        });

        if (messagesArray.length > 0) {
          errorMessage = messagesArray.join(" - ");
        }
      } else if (Array.isArray(error?.message)) {
        errorMessage = error.message.join(" - ");
      } else if (typeof error === "string") {
        errorMessage = error;
      } else if (error?.message) {
        errorMessage = error.message;
      } else if (error?.constraints) {
        errorMessage = Object.values(error.constraints).join(" - ");
      }

      toast.error(errorMessage, { duration: 6000 });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    handleInputChange,
    errors,
    handleSubmit,
    isLoading,
  };
};
