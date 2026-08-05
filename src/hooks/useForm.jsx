import { useState } from "react";

export const useForm = (initialState, validate) => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});

  const updateFormData = (newData) => {
    setFormData((prev) => ({
      ...prev,
      ...(typeof newData === "function" ? newData(prev) : newData),
    }));
  };

  const handleInputChange = (e) => {
    const { name, value, files, type } = e.target;


    let newValue;
    if (name === "number") {
      newValue = value.replace(/[^0-9]/g, "").slice(0, 10);
    } else {
      newValue = type === "file" ? (files ? files[0] : null) : value;
    }

    updateFormData({ [name]: newValue });

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
    setFormData: updateFormData,
    handleInputChange,
    errors,
    setErrors,
    validateForm,
    clearError,
  };
};
