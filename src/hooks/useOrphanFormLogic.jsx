// import { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { useForm } from "@/hooks/useForm";
// import toast from "react-hot-toast";
// import { addOrphan, updateOrphan } from "@/store/index";

// export const useOrphanFormLogic = (t, initialData = null, onClose = null) => {
//   const dispatch = useDispatch();
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const isEdit = !!initialData;

//   const getToastStyle = () => ({
//     direction: document.dir === "rtl" ? "rtl" : "ltr",
//     textAlign: document.dir === "rtl" ? "right" : "left",
//   });

//   const {
//     formData,
//     setFormData,
//     handleInputChange,
//     errors,
//     validateForm,
//     clearError,
//   } = useForm({
//     firstName: "",
//     lastName: "",
//     fatherName: "",
//     motherName: "",
//     guardianName: "",
//     birthOfDate: "",
//     gender: "MALE",
//     brotherAndSisterNumber: "",
//     bodySize: "",
//     shoesSize: "",
//     guaranteedPhone: "",
//     isSupported: false,
//     class: { ar: "", en: "" },
//     Diseases: { ar: "", en: "" },
//     currentAddress: { ar: "", en: "" },
//     previousAddress: { ar: "", en: "" },
//     talent: { ar: "", en: "" },
//     FamilyStatement: null,
//   });

//   useEffect(() => {
//     if (initialData) {
//       // دالة مساعدة لتحويل البيانات إلى object دائماً
//       const parseField = (field) => {
//         if (typeof field === "string") {
//           try {
//             return JSON.parse(field);
//           } catch (e) {
//             return { ar: "", en: "" };
//           }
//         }
//         return field || { ar: "", en: "" };
//       };
//       setFormData({
//         ...initialData,
//         birthOfDate: initialData.birthOfDate?.substring(0, 10) || "",
//         class: parseField(initialData.class),
//         Diseases: parseField(initialData.Diseases),
//         currentAddress: parseField(initialData.currentAddress),
//         previousAddress: parseField(initialData.previousAddress),
//       });
//     }
//   }, [initialData]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) {
//       toast.error(t("pleaseFixErrors"), { style: getToastStyle() });
//       return;
//     }

//     if (isEdit) {
//       const cleanedInitialData = {
//         firstName: initialData.firstName || "",
//         lastName: initialData.lastName || "",
//         fatherName: initialData.fatherName || "",
//         motherName: initialData.motherName || "",
//         guardianName: initialData.guardianName || "",
//         birthOfDate: initialData.birthOfDate?.substring(0, 10) || "",
//         gender: initialData.gender || "MALE",
//         brotherAndSisterNumber: initialData.brotherAndSisterNumber || "",
//         bodySize: initialData.bodySize || "",
//         shoesSize: initialData.shoesSize || "",
//         guaranteedPhone: initialData.guaranteedPhone || "",
//         isSupported: initialData.isSupported || false,
//         class:
//           typeof initialData.class === "string"
//             ? JSON.parse(initialData.class)
//             : initialData.class || { ar: "", en: "" },
//         Diseases:
//           typeof initialData.Diseases === "string"
//             ? JSON.parse(initialData.Diseases)
//             : initialData.Diseases || { ar: "", en: "" },
//         currentAddress:
//           typeof initialData.currentAddress === "string"
//             ? JSON.parse(initialData.currentAddress)
//             : initialData.currentAddress || { ar: "", en: "" },
//         previousAddress:
//           typeof initialData.previousAddress === "string"
//             ? JSON.parse(initialData.previousAddress)
//             : initialData.previousAddress || { ar: "", en: "" },
//         talent:
//           typeof initialData.talent === "string"
//             ? JSON.parse(initialData.talent)
//             : initialData.talent || { ar: "", en: "" },
//       };

//       const currentFormData = {
//         firstName: formData.firstName,
//         lastName: formData.lastName,
//         fatherName: formData.fatherName,
//         motherName: formData.motherName,
//         guardianName: formData.guardianName,
//         birthOfDate: formData.birthOfDate,
//         gender: formData.gender,
//         brotherAndSisterNumber: formData.brotherAndSisterNumber,
//         bodySize: formData.bodySize,
//         shoesSize: formData.shoesSize,
//         guaranteedPhone: formData.guaranteedPhone,
//         isSupported: formData.isSupported,
//         class: formData.class,
//         Diseases: formData.Diseases,
//         currentAddress: formData.currentAddress,
//         previousAddress: formData.previousAddress,
//         talent: formData.talent,
//       };

//       const isDataChanged =
//         JSON.stringify(currentFormData) !== JSON.stringify(cleanedInitialData);
//       const isFileChanged = formData.FamilyStatement instanceof File;

//       if (!isDataChanged && !isFileChanged) {
//         toast(t("noChangesDetected"), {
//           icon: "🟡",
//           style: {
//             ...getToastStyle(),
//             borderRadius: "10px",
//             background: "#333",
//             color: "#fff",
//           },
//         });
//         return;
//       }
//     }

//     setIsSubmitting(true);
//     const dataToSend = new FormData();

//     Object.keys(formData).forEach((key) => {
//       if (key === "FamilyStatement") {
//         if (formData.FamilyStatement instanceof File) {
//           dataToSend.append("FamilyStatement", formData.FamilyStatement);
//         }
//       } else if (
//         [
//           "class",
//           "Diseases",
//           "currentAddress",
//           "previousAddress",
//           "talent",
//         ].includes(key)
//       ) {
//         dataToSend.append(key, JSON.stringify(formData[key]));
//       } else if (formData[key] !== null && formData[key] !== undefined) {
//         dataToSend.append(key, formData[key]);
//       }
//     });

//     try {
//       const action = isEdit
//         ? updateOrphan({ id: initialData.id, data: dataToSend })
//         : addOrphan(dataToSend);

//       const result = await dispatch(action).unwrap();
//       toast.success(result?.message || t("successOperation"), {
//         style: getToastStyle(),
//       });
//       if (onClose) onClose();
//     } catch (error) {
//       toast.error(error?.response?.data?.message || t("errorOccurred"), {
//         style: getToastStyle(),
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return {
//     formData,
//     handleInputChange,
//     errors,
//     handleSubmit,
//     isLoading: isSubmitting,
//     isEdit,
//     clearError,
//   };
// };
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
      gender: "MALE",
      brotherAndSisterNumber: "",
      bodySize: "",
      shoesSize: "",
      guaranteedPhone: "",
      isSupported: false,
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
      // 1. استخراج نسخة نظيفة للمقارنة فقط
      const compareData = (obj) => {
        if (!obj) return {};
        const clean = { ...obj };
        if (clean.birthOfDate) {
          clean.birthOfDate = clean.birthOfDate.toString().substring(0, 10);
        }
        // تحويل الحقول المتداخلة (Objects) إلى String موحد
        const jsonFields = [
          "class",
          "Diseases",
          "currentAddress",
          "previousAddress",
          "talent",
        ];
        jsonFields.forEach((field) => {
          if (clean[field]) {
            // تحويل القيم إلى كائن ثم ترتيبه لضمان المطابقة
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

        // تحويل القيم الرقمية لنصوص لتوحيد المقارنة
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

      // مقارنة الحقول يدوياً للحصول على دقة 100%
      let isDataChanged = false;
      const allKeys = Object.keys(cleanForm);

      for (const key of allKeys) {
        if (key === "FamilyStatement") continue; // نستثني الملف
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

    // ... باقي كود الإرسال كما هو

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
