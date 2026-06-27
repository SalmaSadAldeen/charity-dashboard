import { useState } from "react";

export const useForm = (initialState, validate) => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});

  // تعديل ذكي: الدالة الجديدة بتقبل تحديث جزئي (Merge) بدل ما تمسح كلشي
  const updateFormData = (newData) => {
    setFormData((prev) => {
      // إذا كان newData دالة (مثل التحديث التقليدي)، نفذها. إذا كائن، ادمجه
      const updatedData =
        typeof newData === "function" ? newData(prev) : { ...prev, ...newData };
      return updatedData;
    });
  };

  const handleInputChange = (e) => {
    const { name, value, files, type } = e.target;

    // إذا كان ملف، خذ الملف، وإلا خذ النص
    const newValue =
      type === "file" ? (files && files[0] ? files[0] : null) : value;

    updateFormData({ [name]: newValue });

    // مسح الخطأ عند التعديل (أضفتلك حذف آمن)
    if (errors[name]) {
      setErrors((prev) => {
        const { [name]: _, ...rest } = prev;
        return rest;
      });
    }
  };

  const validateForm = () => {
    const validationErrors = validate(formData);
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const clearError = (name) => {
    setErrors((prev) => {
      const { [name]: _, ...rest } = prev;
      return rest;
    });
  };

  return {
    formData,
    setFormData: updateFormData, // رجعنا الدالة المدمجة
    handleInputChange,
    errors,
    setErrors,
    validateForm,
    clearError,
  };
};
