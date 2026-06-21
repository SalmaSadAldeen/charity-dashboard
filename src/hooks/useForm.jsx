import { useState } from "react";

export const useForm = (initialState, validate) => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, files, type } = e.target;

    // إذا كان الحقل من نوع ملف، نأخذ أول ملف مختار، وإلا نأخذ القيمة النصية
    const newValue = type === "file" ? files[0] : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    // مسح الخطأ عند التعديل
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  const validateForm = () => {
    const validationErrors = validate(formData); // استخدام دالة التحقق التي مررتِها للهوك
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
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
