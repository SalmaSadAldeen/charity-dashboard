import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";
import { useCreateAidRequest } from "@/hooks/useCreateAidRequest";
import { ArrowLeft, Sparkles } from "lucide-react";
import { AnimatePresence } from "framer-motion";

import { CommonAidFields } from "@/pages/AddAidRequests/components/CommonAidFields";
import { HealthForm } from "@/pages/AddAidRequests/components/HealthForm";
import { FoodForm } from "@/pages/AddAidRequests/components/FoodForm";
import { EducationForm } from "@/pages/AddAidRequests/components/EducationForm";
import { HousingForm } from "@/pages/AddAidRequests/components/HousingForm";
import { SmallProjectsForm } from "@/pages/AddAidRequests/components/SmallProjectsForm";

export default function CreateAidRequestPage() {
  const { id: beneficiaryId } = useParams();
  const navigate = useNavigate();
  const { t, lang } = useTranslation();
  const { submitAidRequest, loading } = useCreateAidRequest(beneficiaryId);

  const [aidType, setAidType] = useState("HEALTH");

  const [commonForm, setCommonForm] = useState({
    beneficiaryFatherName: "",
    cost: "",
    isUrgent: false,
    titleAr: "",
    titleEn: "",
    detailsAr: "",
    detailsEn: "",
    descAr: "",
    descEn: "",
    donorImage: null,
    media: [],
  });

  const [specificForm, setSpecificForm] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const categoryMapping = {
      HEALTH: { categoryId: 1 },
      FOOD: { categoryId: 2 },
      HOUSING: {
        categoryId: 3,
        subCategoryId: specificForm.subCategoryId
          ? Number(specificForm.subCategoryId)
          : 1,
      },
      EDUCATION: { categoryId: 4 },
      SMALL_PROJECTS: { categoryId: 5 },
    };

    // تجهيز الـ payload الأساسي مع تحويل حقول المشاريع الصغيرة إلى كائنات لغوية
    const payload = {
      ...commonForm,
      ...specificForm,
      ...categoryMapping[aidType],
      title: { ar: commonForm.titleAr, en: commonForm.titleEn },
      details: { ar: commonForm.detailsAr, en: commonForm.detailsEn },
      description: { ar: commonForm.descAr, en: commonForm.descEn },

      // تجهيز projectName بصيغة كائن تماماً مثل title و description
      projectName:
        aidType === "SMALL_PROJECTS"
          ? {
              ar: specificForm.projectNameAr || "",
              en: specificForm.projectNameEn || "",
            }
          : undefined,

      // تجهيز projectCategory بصيغة كائن تماماً كما يطلب الـ Swagger
      projectCategory:
        aidType === "SMALL_PROJECTS"
          ? {
              ar: specificForm.projectCategoryAr || "",
              en: specificForm.projectCategoryEn || "",
            }
          : undefined,
    };

    // إرسال typeAid في حال كان القسم غداء أو صحة
    if (aidType === "FOOD" || aidType === "HEALTH") {
      payload.typeAid = specificForm.typeAid;
    }

    // تنظيف الحقول الزائدة التي لا تخص القسم الحالي
    if (aidType !== "HOUSING") {
      delete payload.currentHousingSituation;
      delete payload.currentPlaceOfResidence;
      delete payload.reasonForLock;
      delete payload.housingSpecifications;
      delete payload.currentRent;
    }

    if (aidType !== "SMALL_PROJECTS") {
      delete payload.projectNameAr;
      delete payload.projectNameEn;
      delete payload.projectCategoryAr;
      delete payload.projectCategoryEn;
    }

    const res = await submitAidRequest(aidType, payload);
    if (res.success) {
      navigate("/dashboard/requests");
    }
  };
  const getTabColor = (index, isActive) => {
    const palette = [
      "bg-[#735c00]/15 text-[#735c00] hover:bg-[#735c00]/25",
      "bg-[#5c630e]/15 text-[#5c630e] hover:bg-[#5c630e]/25",
      "bg-[#3b674c]/15 text-[#3b674c] hover:bg-[#3b674c]/25",
    ];

    const activePalette = [
      "bg-[#735c00] text-white shadow-md",
      "bg-[#5c630e] text-white shadow-md",
      "bg-[#3b674c] text-white shadow-md",
    ];

    if (isActive) {
      return activePalette[index % activePalette.length];
    }
    return palette[index % palette.length];
  };

  const tabs = [
    { id: "HEALTH", label: t("aid_type_health") },
    { id: "FOOD", label: t("aid_type_food") },
    { id: "EDUCATION", label: t("aid_type_education") },
    { id: "HOUSING", label: t("aid_type_housing") },
    { id: "SMALL_PROJECTS", label: t("aid_type_small_projects") },
  ];

  return (
    <div
      className="p-6 md:p-8 max-w-3xl mx-auto space-y-6"
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      <div className="flex items-center gap-4 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
        <button
          onClick={() => navigate(-1)}
          className="p-2.5 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors"
        >
          <ArrowLeft size={20} className="text-slate-700 rtl:rotate-180" />
        </button>
        <div>
          <h1 className="text-lg font-black text-slate-900">
            {t("create_aid_request")}
          </h1>
         
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 bg-slate-100 p-1.5 rounded-2xl">
        {tabs.map((tab, index) => {
          const isActive = aidType === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                setAidType(tab.id);
                setSpecificForm({});
              }}
              className={`py-2.5 px-3 rounded-xl text-xs font-black transition-all ${getTabColor(index, isActive)}`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6"
      >
        <CommonAidFields
          commonForm={commonForm}
          setCommonForm={setCommonForm}
          t={t}
        />

        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
          <AnimatePresence mode="wait">
            {aidType === "HEALTH" && (
              <HealthForm
                key="health"
                form={specificForm}
                setForm={setSpecificForm}
                t={t}
              />
            )}
            {aidType === "FOOD" && (
              <FoodForm
                key="food"
                form={specificForm}
                setForm={setSpecificForm}
                t={t}
              />
            )}
            {aidType === "EDUCATION" && (
              <EducationForm
                key="education"
                form={specificForm}
                setForm={setSpecificForm}
                t={t}
              />
            )}
            {aidType === "HOUSING" && (
              <HousingForm
                key="housing"
                form={specificForm}
                setForm={setSpecificForm}
                t={t}
              />
            )}
            {aidType === "SMALL_PROJECTS" && (
              <SmallProjectsForm
                key="projects"
                form={specificForm}
                setForm={setSpecificForm}
                t={t}
              />
            )}
          </AnimatePresence>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 text-white font-black text-sm transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <Sparkles size={18} />
          {loading ? t("processing") : t("submit_request")}
        </button>
      </form>
    </div>
  );
}
