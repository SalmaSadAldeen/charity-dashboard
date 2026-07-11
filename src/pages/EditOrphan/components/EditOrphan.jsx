import { useOrphanFormLogic } from "@/hooks/useOrphanFormLogic";
import { useTranslation } from "@/hooks/useTranslation";
import OrphanIdentitySection from "@/pages/AddOrphan/components/OrphanIdentitySection";
import JsonFieldsSection from "@/pages/AddOrphan/components/JsonFieldsSection";
import ExtraDataSection from "@/pages/AddOrphan/components/ExtraDataSection";
import FamilyActionsSection from "@/pages/AddOrphan/components/FamilyActionsSection";
export default function EditOrphan({ orphanData, onClose }) {
  const { t } = useTranslation();

  // مرري orphanData مباشرة للـ Hook، والـ Hook سيتولى تنسيق التاريخ
  const { formData, handleInputChange, handleSubmit, isLoading, errors } =
    useOrphanFormLogic(t, orphanData, onClose);

  // ... باقي الكود كما هو
  const jsonFields = [
    "class",
    "Diseases",
    "currentAddress",
    "previousAddress",
    "talent",
  ];

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-8">
        <h2 className="text-2xl font-bold">{t("editOrphanInfo")}</h2>

        <OrphanIdentitySection
          formData={formData}
          handleInputChange={handleInputChange}
          t={t}
          errors={errors}
        />
        <JsonFieldsSection
          fields={jsonFields}
          formData={formData}
          handleInputChange={handleInputChange}
          t={t}
          errors={errors}
        />
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

      {/* الأزرار ثابتة في الأسفل */}
      <div className="pt-6 border-t mt-6 flex gap-4">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 py-3 border rounded-2xl"
        >
          {t("cancel")}
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="flex-[2] py-3 bg-primary text-white rounded-2xl"
        >
          {isLoading ? t("saving") : t("saveChanges")}
        </button>
      </div>
    </form>
  );
}
