import { useSelector } from "react-redux";
import { translations } from "@/context/translations";
import { useOrphanFormLogic } from "@/hooks/useOrphanFormLogic";
import OrphanIdentitySection from "./components/OrphanIdentitySection";
import OrphanMedicalSection from "./components/OrphanMedicalSection";
import OrphanFamilySection from "./components/OrphanFamilySection";

export default function AddOrphan() {
  const lang = useSelector((state) => state.language.lang);
  const t = (key) => translations[lang][key] || key;

  // استدعاء المنطق (الذي يربط كل شيء)
  const { formData, handleInputChange, errors, handleSubmit, isLoading } =
    useOrphanFormLogic(t);

  return (
    <div className="p-8 bg-[#f5ede0] min-h-screen">
      <h2 className="text-[32px] font-bold mb-8 text-[#1f1b14]">
        {t("addNewOrphan")}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-8">
        <OrphanIdentitySection
          formData={formData}
          handleInputChange={handleInputChange}
          errors={errors}
          t={t}
        />
        <OrphanMedicalSection
          formData={formData}
          handleInputChange={handleInputChange}
          errors={errors}
          t={t}
        />
        <OrphanFamilySection
          formData={formData}
          handleInputChange={handleInputChange}
          errors={errors}
          t={t}
        />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#fad564] hover:bg-[#e6c25a] text-[#4d4636] font-bold py-4 rounded-2xl transition-all duration-300 shadow-md hover:shadow-lg active:scale-[0.98]"
        >
          {isLoading ? t("saving") : t("confirmAndSave")}
        </button>
      </form>
    </div>
  );
}
