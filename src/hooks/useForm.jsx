import { useState } from "react";

export const useForm = (initialState, validate) => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newData = { ...formData, [name]: value };
    setFormData(newData);
    // تنفيذ التحقق إذا كان موجوداً
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name]; // مسح الخطأ لهذا الحقل فقط
        return newErrors;
      });
    }
  };
  const validateForm = () => {
    if (validate) {
      const newErrors = validate(formData);
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    }
    return true;
  };
  // داخل useForm.js
  const clearError = (name) => {
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
  };

  return {
    formData,
    setFormData,
    handleInputChange,
    errors,
    setErrors,
    validateForm,
    clearError,
  };
};
