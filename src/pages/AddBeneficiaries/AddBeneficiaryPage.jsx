import { useBeneficiaryFormLogic } from "@/hooks/useBeneficiaryFormLogic";
import AddBeneficiaryForm from "./components/AddBeneficiaryForm";
import { useTranslation } from "@/hooks/useTranslation";

export default function AddBeneficiaryPage() {
  const { t } = useTranslation();
  const { formData, handleInputChange, errors, handleSubmit, isLoading } = 
    useBeneficiaryFormLogic(t);

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white rounded-3xl border border-border shadow-sm my-6">
      <h1 className="text-2xl font-black mb-6 text-on-surface-variant">
        {t("addNewBeneficiary") || "Add New Beneficiary"}
      </h1>
      <AddBeneficiaryForm
        formData={formData}
        onChange={handleInputChange}
        errors={errors}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        t={t}
      />
    </div>
  );
}