import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "@/hooks/useForm";
import toast from "react-hot-toast";
import { addOrphan, updateOrphan } from "@/store/index";

export const useOrphanFormLogic = (t, initialData = null, onClose = null) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const isEdit = !!initialData;

  const numericFields = [
    "brotherAndSisterNumber",
    "bodySize",
    "shoesSize",
    "guaranteedPhone",
    "priority",
  ];

  const validateOrphan = (data) => {
    let errors = {};
    if (!data.firstName?.trim()) errors.firstName = t("fieldIsRequired");
    if (!data.lastName?.trim()) errors.lastName = t("fieldIsRequired");
    if (!data.fatherName?.trim()) errors.fatherName = t("fieldIsRequired");
    if (!data.motherName?.trim()) errors.motherName = t("fieldIsRequired");
    if (!data.guardianName?.trim()) errors.guardianName = t("fieldIsRequired");
    if (!data.birthOfDate) errors.birthOfDate = t("fieldIsRequired");
    if (!data.gender) errors.gender = t("fieldIsRequired");

    if (!data.class?.ar?.trim()) errors.class = t("fieldIsRequired");
    if (!data.Diseases?.ar?.trim()) errors.Diseases = t("fieldIsRequired");
    if (!data.currentAddress?.ar?.trim())
      errors.currentAddress = t("fieldIsRequired");
    if (!data.previousAddress?.ar?.trim())
      errors.previousAddress = t("fieldIsRequired");
    if (!data.talent?.ar?.trim()) errors.talent = t("fieldIsRequired");
    numericFields.forEach((field) => {
      const val = data[field];
      if (val === null || val === undefined || val === "") {
        errors[field] = t("fieldIsRequired");
      } else if (field === "guaranteedPhone" && val.toString().length !== 10) {
        errors[field] = t("phoneMustBe10Digits");
      } else if (
        ["bodySize", "shoesSize"].includes(field) &&
        parseInt(val) <= 0
      ) {
        errors[field] = t("mustBeGreaterThanZero");
      } else if (
        field === "priority" &&
        (parseInt(val) < 1 || parseInt(val) > 5)
      ) {
        errors[field] = t(
          "priorityMustBeBetween1And5",
          "الأولوية يجب أن تكون بين 1 و 5",
        ); 
      }
    });
    return errors;
  };

  const { formData, setFormData, errors, validateForm } = useForm(
    {
      firstName: "",
      lastName: "",
      fatherName: "",
      motherName: "",
      guardianName: "",
      birthOfDate: "",
      gender: "",
      brotherAndSisterNumber: "",
      bodySize: "",
      shoesSize: "",
      guaranteedPhone: "",
      isSupported: false,
      priority: "",
      class: { ar: "", en: "" },
      Diseases: { ar: "", en: "" },
      currentAddress: { ar: "", en: "" },
      previousAddress: { ar: "", en: "" },
      talent: { ar: "", en: "" },
      FamilyStatement: null,
    },
    validateOrphan,
  );

  const handleInputChange = (e) => {
    const { name, value, files, type } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value },
      }));
    } else {
      const newValue = type === "file" ? (files ? files[0] : null) : value;
      setFormData((prev) => ({ ...prev, [name]: newValue }));
    }
  };

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        birthOfDate: initialData.birthOfDate?.substring(0, 10) || "",
        brotherAndSisterNumber: initialData.brotherAndSisterNumber ?? "",
        priority: initialData.priority ?? "",
      });
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error(t("pleaseFixErrors"));
      return;
    }

    if (isEdit) {
      const compareData = (obj) => {
        if (!obj) return {};
        const clean = { ...obj };
        if (clean.birthOfDate) {
          clean.birthOfDate = clean.birthOfDate.toString().substring(0, 10);
        }

        const jsonFields = [
          "class",
          "Diseases",
          "currentAddress",
          "previousAddress",
          "talent",
        ];
        jsonFields.forEach((field) => {
          if (clean[field]) {
            const parsed =
              typeof clean[field] === "string"
                ? JSON.parse(clean[field])
                : clean[field];
            clean[field] = JSON.stringify({
              ar: parsed.ar || "",
              en: parsed.en || "",
            });
          }
        });

        Object.keys(clean).forEach((key) => {
          if (
            clean[key] !== null &&
            clean[key] !== undefined &&
            key !== "birthOfDate" &&
            !jsonFields.includes(key)
          ) {
            clean[key] = clean[key].toString();
          }
        });

        return clean;
      };

      const cleanForm = compareData(formData);
      const cleanInitial = compareData(initialData);

      let isDataChanged = false;
      const allKeys = Object.keys(cleanForm);

      for (const key of allKeys) {
        if (key === "FamilyStatement") continue;
        if (cleanForm[key] !== cleanInitial[key]) {
          console.log(
            `اختلاف في الحقل: ${key}`,
            cleanForm[key],
            "vs",
            cleanInitial[key],
          );
          isDataChanged = true;
          break;
        }
      }

      const isFileChanged = formData.FamilyStatement instanceof File;

      if (!isDataChanged && !isFileChanged) {
        toast(t("noChangesDetected"), { icon: "🟡" });
        return;
      }
    }

    setIsLoading(true);
    const dataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (
        [
          "Diseases",
          "currentAddress",
          "previousAddress",
          "talent",
          "class",
        ].includes(key)
      ) {
        dataToSend.append(key, JSON.stringify(formData[key]));
      } else if (formData[key] !== null) {
        dataToSend.append(key, formData[key]);
      }
    });

    try {
      const action = isEdit
        ? updateOrphan({ id: initialData.id, data: dataToSend })
        : addOrphan(dataToSend);
      const result = await dispatch(action).unwrap();
      toast.success(result?.message || t("successOperation"));
      if (onClose) onClose();
    } catch (error) {
      toast.error(error?.response?.data?.message || t("errorOccurred"));
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
    isEdit,
  };
};
