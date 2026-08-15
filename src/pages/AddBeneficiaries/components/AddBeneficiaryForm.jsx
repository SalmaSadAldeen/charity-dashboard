import PersonalInfoSection from "./PersonalInfoSection";
import ContactAndLocationSection from "./ContactAndLocationSection";
import SocioEconomicSection from "./SocioEconomicSection";
import DocumentsSection from "./DocumentsSection";

export default function AddBeneficiaryForm({
  formData,
  onChange,
  errors,
  onSubmit,
  isLoading,
  t,
  lang,
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-6" autoComplete="off">
      <PersonalInfoSection
        formData={formData}
        onChange={onChange}
        errors={errors}
        t={t}
        lang={lang}
      />
      <ContactAndLocationSection
        formData={formData}
        onChange={onChange}
        errors={errors}
        t={t}
        lang={lang}
      />
      <SocioEconomicSection formData={formData} onChange={onChange} t={t} />
      <DocumentsSection onChange={onChange} errors={errors} t={t} />

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-4 bg-primary text-white rounded-2xl font-extrabold shadow-lg hover:opacity-90 transition-all cursor-pointer disabled:opacity-50 text-base"
      >
        {isLoading
          ? t("loading") || "Loading..."
          : t("saveAndCreateAccount") || "Save & Create Account"}
      </button>
    </form>
  );
}
