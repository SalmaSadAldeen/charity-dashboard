import { useDispatch } from "react-redux";
import { addHelpRequest } from "@/store/index"; // عدلي المسار حسب مكان الـ store لديكِ
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

      // 1. الحقول المشتركة لكل الطلبات
      formData.append("categoryId", rawData.categoryId);
      if (rawData.subCategoryId)
        formData.append("subCategoryId", rawData.subCategoryId);
      formData.append("beneficiaryFatherName", rawData.beneficiaryFatherName);
      formData.append("cost", rawData.cost);
      formData.append("isUrgent", rawData.isUrgent ?? false);

      // حقول الـ JSON (ar / en) المشتركة
      formData.append("details", JSON.stringify(rawData.details));
      formData.append("title", JSON.stringify(rawData.title));
      formData.append("description", JSON.stringify(rawData.description));

      // الملفات والصور المشتركة
      if (rawData.donorImage) {
        formData.append("donorImage", rawData.donorImage);
      }
      if (rawData.media && Array.isArray(rawData.media)) {
        rawData.media.forEach((file) => formData.append("media", file));
      }

      // 2. الحقول الخاصة بكل نوع طلب بناءً على الـ Endpoint
      if (aidType === "HEALTH") {
        formData.append("typeAid", rawData.typeAid || "MEDICINE_INSURANCE");
      } else if (aidType === "FOOD") {
        formData.append("typeAid", rawData.typeAid || "FOOD_BASKET");
        formData.append("numberIndividuals", rawData.numberIndividuals);
      } else if (aidType === "EDUCATION") {
        formData.append(
          "academicAchievement",
          rawData.academicAchievement || "BACHELOR",
        );
        formData.append(
          "institutionName",
          JSON.stringify(rawData.institutionName),
        );
        formData.append("year", rawData.year);
      } else if (aidType === "HOUSING") {
        if (rawData.currentHousingSituation)
          formData.append(
            "currentHousingSituation",
            JSON.stringify(rawData.currentHousingSituation),
          );
        if (rawData.currentRent)
          formData.append("currentRent", rawData.currentRent);
        if (rawData.currentPlaceOfResidence)
          formData.append(
            "currentPlaceOfResidence",
            JSON.stringify(rawData.currentPlaceOfResidence),
          );
        if (rawData.reasonForLock)
          formData.append(
            "reasonForLock",
            JSON.stringify(rawData.reasonForLock),
          );
        if (rawData.housingSpecifications)
          formData.append(
            "housingSpecifications",
            JSON.stringify(rawData.housingSpecifications),
          );
      } else if (aidType === "SMALL_PROJECTS") {
        formData.append("projectName", JSON.stringify(rawData.projectName));
        formData.append(
          "projectCategory",
          JSON.stringify(rawData.projectCategory),
        );
        formData.append(
          "numberOfPeopleSupported",
          rawData.numberOfPeopleSupported,
        );
      }

      // إرسال الطلب عبر الـ Redux Thunk الذي أضفناه سابقاً
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
