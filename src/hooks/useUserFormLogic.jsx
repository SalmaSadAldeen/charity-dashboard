import { useDispatch } from "react-redux";
import { useForm } from "@/hooks/useForm";
import toast from "react-hot-toast";
import { addEmployee, updateEmployee } from "@/store/index";
import { useEffect, useState } from "react";

export const useUserFormLogic = (t, initialData = null, onClose) => {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);


  const getToastStyle = () => ({
    direction: document.dir === "rtl" ? "rtl" : "ltr",
    textAlign: document.dir === "rtl" ? "right" : "left",
  });

  const isEdit = !!initialData;
  const employeeId = initialData?.id;

  const validateEmployee = (data) => {
    let errors = {};
    const phoneRegex = /^\d{10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!data.firstName?.trim()) errors.firstName = t("firstNameIsRequired");
    if (!data.lastName?.trim()) errors.lastName = t("firstNameIsRequired");
    if (!data.email || !emailRegex.test(data.email))
      errors.email = t("invalidEmail");
    if (!data.number) {
      errors.number = t("phoneIsRequired");
    } else if (!phoneRegex.test(data.number)) {
      errors.number = t("invalidPhoneNumber");
    }
    if (!data.gender) errors.gender = t("genderIsRequired");
    if (!data.dateOfBirth) errors.dateOfBirth = t("dateIsRequired");
    if (!data.roleIds || data.roleIds.length === 0)
      errors.roleIds = t("selectAtLeastOneRole");
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
      gender: "",
      dateOfBirth: "",
      personalPhoto: null,
      roleIds: [],
    },
    validateEmployee,
  );

  useEffect(() => {
    if (initialData) {
      setFormData({
        firstName: initialData.firstName || "",
        lastName: initialData.lastName || "",
        email: initialData.email || "",
        number: initialData.number || "",
        gender: initialData.gender || "",
        dateOfBirth: initialData.dateOfBirth || "",
        personalPhoto: initialData.personalPhoto || null,
        roleIds: initialData.roleIds || [],
      });
    }
  }, [initialData]);

  const toggleRole = (roleId) => {
    const idAsNumber = Number(roleId);
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

    if (isEdit) {
      const cleanedInitialData = {
        firstName: initialData.firstName || "",
        lastName: initialData.lastName || "",
        email: initialData.email || "",
        number: initialData.number || "",
        gender: initialData.gender || "",
        dateOfBirth: initialData.dateOfBirth || "",
        roleIds: [...(initialData.roleIds || [])].sort((a, b) => a - b),
      };

      const currentFormData = {
        ...formData,
        roleIds: [...formData.roleIds].sort((a, b) => a - b),
        personalPhoto: undefined,
      };

      const isDataChanged =
        JSON.stringify(currentFormData) !== JSON.stringify(cleanedInitialData);
      const isPhotoChanged = formData.personalPhoto instanceof File;

      if (!isDataChanged && !isPhotoChanged) {
        toast(t("noChangesDetected"), {
          icon: "🟡",
          style: {
            ...getToastStyle(),
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

      const action = isEdit
        ? updateEmployee({ id: employeeId, data: formDataToSend })
        : addEmployee(formDataToSend);

      const result = await dispatch(action).unwrap();
      toast.success(result?.message || t("successAdded"), {
        style: getToastStyle(),
      });
      if (onClose) onClose();
    } catch (error) {
      let msg =
        error?.response?.data?.message || error?.message || t("errorOccurred");
      if (!msg && error?.response?.status === 500) msg = t("phoneAlreadyUsed");

      toast.error(msg, { style: getToastStyle() });
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
    isLoading: isSubmitting,
    clearError,
    isEdit,
  };
};
