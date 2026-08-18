import { useBeneficiaryFormLogic } from "@/hooks/useBeneficiaryFormLogic";
import AddBeneficiaryForm from "./components/AddBeneficiaryForm";
import { useTranslation } from "@/hooks/useTranslation";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function AddBeneficiaryPage() {
  const { t } = useTranslation();
  const { formData, handleInputChange, errors, handleSubmit, isLoading } =
    useBeneficiaryFormLogic(t);
  const navigate = useNavigate();

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white rounded-3xl border border-border shadow-sm my-6">
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="p-2.5 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <ArrowLeft size={20} className="text-slate-700 rtl:rotate-180" />
          </button>
          <h1 className="text-2xl font-black text-on-surface-variant m-0">
            {t("addNewBeneficiary") || "Add New Beneficiary"}
          </h1>
      </div>
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
