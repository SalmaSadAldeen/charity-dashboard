import { useDispatch } from "react-redux";
import { addHelpRequest } from "@/store/index";
import { useState } from "react";

export const useCreateAidRequest = (beneficiaryId) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitAidRequest = async (aidType, rawData) => {
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();

      formData.append("categoryId", rawData.categoryId);

      // إرسال subCategoryId فقط إذا كان موجوداً (الخاص بقسم السكن)
      if (
        rawData.subCategoryId !== undefined &&
        rawData.subCategoryId !== null &&
        rawData.subCategoryId !== ""
      ) {
        formData.append("subCategoryId", rawData.subCategoryId);
      }

      formData.append("beneficiaryFatherName", rawData.beneficiaryFatherName);
      formData.append("cost", rawData.cost);
      formData.append("isUrgent", rawData.isUrgent ?? false);

      formData.append("details", JSON.stringify(rawData.details));
      formData.append("title", JSON.stringify(rawData.title));
      formData.append("description", JSON.stringify(rawData.description));

      if (rawData.donorImage) {
        formData.append("donorImage", rawData.donorImage);
      }
      if (rawData.media && Array.isArray(rawData.media)) {
        rawData.media.forEach((file) => formData.append("media", file));
      }

      if (aidType === "HEALTH") {
        formData.append("typeAid", rawData.typeAid);
      } else if (aidType === "FOOD") {
        // *** التعديل هنا: إضافة typeAid لقسم الغذاء أيضاً ***
        if (rawData.typeAid) {
          formData.append("typeAid", rawData.typeAid);
        }
        if (rawData.numberIndividuals) {
          formData.append("numberIndividuals", rawData.numberIndividuals);
        }
      } else if (aidType === "EDUCATION") {
        formData.append("academicAchievement", rawData.academicAchievement);
        formData.append(
          "institutionName",
          JSON.stringify(rawData.institutionName),
        );
        formData.append("year", rawData.year);
      } else if (aidType === "HOUSING") {
        if (rawData.currentHousingSituation) {
          formData.append(
            "currentHousingSituation",
            JSON.stringify(rawData.currentHousingSituation),
          );
        }
        if (rawData.currentRent !== undefined && rawData.currentRent !== "") {
          formData.append("currentRent", rawData.currentRent);
        }
        if (rawData.currentPlaceOfResidence) {
          formData.append(
            "currentPlaceOfResidence",
            JSON.stringify(rawData.currentPlaceOfResidence),
          );
        }
      } else if (aidType === "SMALL_PROJECTS") {
        if (rawData.projectName) {
          formData.append("projectName", JSON.stringify(rawData.projectName));
        }
        if (rawData.projectCategory) {
          formData.append(
            "projectCategory",
            JSON.stringify(rawData.projectCategory),
          );
        }
        if (
          rawData.numberOfPeopleSupported !== undefined &&
          rawData.numberOfPeopleSupported !== ""
        ) {
          formData.append(
            "numberOfPeopleSupported",
            rawData.numberOfPeopleSupported,
          );
        }
      }

      const resultAction = await dispatch(
        addHelpRequest({
          beneficiaryId,
          aidType,
          formData,
        }),
      );

      if (addHelpRequest.fulfilled.match(resultAction)) {
        setLoading(false);
        return { success: true, data: resultAction.payload };
      } else {
        throw new Error(resultAction.payload || "فشل في إرسال الطلب");
      }
    } catch (err) {
      setLoading(false);
      setError(err.message || "حدث خطأ غير متوقع");
      return { success: false, error: err.message };
    }
  };

  return { submitAidRequest, loading, error };
};
