import { useState } from "react";
import { useOrphanFormLogic } from "@/hooks/useOrphanFormLogic";
import { useTranslation } from "@/hooks/useTranslation";
import OrphanIdentitySection from "@/pages/AddOrphan/components/OrphanIdentitySection";
import JsonFieldsSection from "@/pages/AddOrphan/components/JsonFieldsSection";
import ExtraDataSection from "@/pages/AddOrphan/components/ExtraDataSection";
import FamilyActionsSection from "@/pages/AddOrphan/components/FamilyActionsSection";
import { CheckCircle2 } from "lucide-react";
import AppButton from "@/pages/Dashboard/components/AppButton";
import { useNavigate } from "react-router-dom";
export default function AddOrphan() {
  const { t } = useTranslation();
  const navigate = useNavigate(); // 2. عرفي الـ navigate

  const [currentStep, setCurrentStep] = useState(1);
  const { formData, handleInputChange, handleSubmit, isLoading, errors } =
    useOrphanFormLogic(t, null, () => {
      navigate("/dashboard/orphans");
    });

  const jsonFields = [
    "class",
    "Diseases",
    "currentAddress",
    "previousAddress",
    "talent",
  ];

  // دالة ذكية لفحص وجود أخطاء في خطوات معينة
  const hasErrorInStep = (step) => {
    const fieldsByStep = {
      1: [
        "firstName",
        "lastName",
        "fatherName",
        "motherName",
        "guardianName",
        "birthOfDate",
        "gender",
      ],
      2: ["class", "Diseases", "currentAddress", "previousAddress", "talent"],
      3: [
        "brotherAndSisterNumber",
        "bodySize",
        "shoesSize",
        "guaranteedPhone",
        "FamilyStatement",
      ],
    };
    return fieldsByStep[step]?.some((field) => errors[field]);
  };

  return (
    <div className="min-h-screen bg-[#fcfaf7] py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* العداد الذكي */}
        <div className="sticky top-4 z-50 bg-surface-lowest p-4 rounded-3xl border border-border/30 flex justify-center gap-8 shadow-xl shadow-[#4d4636]/5">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`w-9 h-9 rounded-2xl flex items-center justify-center font-black transition-colors ${
                hasErrorInStep(step)
                  ? "bg-red-500 text-white" // لون أحمر عند وجود خطأ
                  : step === currentStep
                    ? "bg-primary text-white"
                    : "bg-[#fcfaf7] text-on-surface-variant border border-border"
              }`}
            >
              {step === 3 ? <CheckCircle2 size={18} /> : step}
            </div>
          ))}
        </div>

        {/* الفورم */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {currentStep === 1 && (
            <OrphanIdentitySection
              formData={formData}
              handleInputChange={handleInputChange}
              t={t}
              errors={errors}
            />
          )}

          {currentStep === 2 && (
            <JsonFieldsSection
              fields={jsonFields}
              formData={formData}
              handleInputChange={handleInputChange}
              t={t}
              errors={errors}
            />
          )}

          {currentStep === 3 && (
            <div className="space-y-8">
              <ExtraDataSection
                formData={formData}
                handleInputChange={handleInputChange}
                t={t}
                errors={errors}
              />
              <FamilyActionsSection
                formData={formData}
                handleInputChange={handleInputChange}
                t={t}
                errors={errors}
              />
            </div>
          )}

          {/* أزرار التنقل */}
          <div className="flex justify-between items-center pt-8 border-t border-border/20">
            <button
              type="button"
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className="px-8 py-3 rounded-2xl font-bold text-on-surface-variant disabled:opacity-30"
            >
              {t("back")}
            </button>

            {currentStep < 3 ? (
              <button
                type="button"
                onClick={() => setCurrentStep(Math.min(3, currentStep + 1))}
                className="px-8 py-3 bg-primary text-white rounded-2xl font-bold"
              >
                {t("next")}
              </button>
            ) : (
              <AppButton
                isLoading={isLoading}
                text={t("confirmAndSave")}
                loadingText={t("saving")}
              />
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
