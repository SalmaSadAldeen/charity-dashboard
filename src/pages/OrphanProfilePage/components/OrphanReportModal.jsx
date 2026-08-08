import { HeartHandshake } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { useOrphanReport } from "@/hooks/useOrphanReport";

export default function OrphanReportModal({
  isOpen,
  onClose,
  sponsorshipId,
  orphan,
}) {
  const { t } = useTranslation();

  const {
    reportArRef,
    reportEnRef,
    isSending,
    activeTab,
    setActiveTab,
    handleConfirmAndSend,
    getFieldValue,
  } = useOrphanReport({ sponsorshipId, orphan, onClose, t });

  if (!isOpen || !orphan) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto"
      dir="rtl"
    >
      <div className="rounded-[2rem] p-6 max-w-4xl w-full max-h-[95vh] flex flex-col shadow-2xl bg-surface-lowest">
        {/* شريط التحكم العلوي للمودال */}
        <div className="flex justify-between items-center mb-4 pb-3 border-b border-border">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-on-surface-variant">
              {t("annual_report_preview")}
            </h2>

            {/* أزرار التبديل للمعاينة */}
            <div className="flex bg-surface p-1 rounded-xl border border-border">
              <button
                onClick={() => setActiveTab("ar")}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "ar"
                    ? "bg-[#735c00] text-white shadow-sm"
                    : "text-on-surface-variant/60 hover:text-on-surface-variant"
                }`}
              >
                {t("arabic_version")} 
              </button>
              <button
                onClick={() => setActiveTab("en")}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "en"
                    ? "bg-[#735c00] text-white shadow-sm"
                    : "text-on-surface-variant/60 hover:text-on-surface-variant"
                }`}
              >
                {t("english_version")}
              </button>
            </div>
          </div>

          <button
            onClick={onClose}
            disabled={isSending}
            className="hover:text-error text-xl font-bold px-2 transition-colors cursor-pointer text-on-surface-variant disabled:opacity-50"
          >
            ✕
          </button>
        </div>

        {/* 1. منطقة المعاينة الظاهرة للمستخدم */}
        <div className="overflow-y-auto flex-1 p-4 rounded-2xl flex flex-col items-center relative min-h-[500px] bg-surface">
          {activeTab === "ar" ? (
            <ReportContent
              lang="ar"
              orphan={orphan}
              t={t}
              getFieldValue={getFieldValue}
            />
          ) : (
            <ReportContent
              lang="en"
              orphan={orphan}
              t={t}
              getFieldValue={getFieldValue}
            />
          )}
        </div>

        {/* 2. الديف المخفي للـ html2canvas */}
        <div
          style={{
            position: "absolute",
            left: "-9999px",
            top: "-9999px",
            pointerEvents: "none",
          }}
        >
          <div ref={reportArRef}>
            <ReportContent
              lang="ar"
              orphan={orphan}
              t={t}
              getFieldValue={getFieldValue}
            />
          </div>
          <div ref={reportEnRef}>
            <ReportContent
              lang="en"
              orphan={orphan}
              t={t}
              getFieldValue={getFieldValue}
            />
          </div>
        </div>

        {/* أزرار الإجراءات */}
        <div className="flex justify-end gap-3 mt-4 pt-3 border-t border-border">
          <button
            onClick={onClose}
            disabled={isSending}
            className="px-5 py-2 rounded-xl transition font-medium cursor-pointer bg-surface text-on-surface-variant hover:bg-surface/80 disabled:opacity-50"
          >
            {t("cancel")}
          </button>
          <button
            onClick={handleConfirmAndSend}
            disabled={isSending}
            className="px-6 py-2 font-bold rounded-xl transition flex items-center gap-2 shadow-sm hover:opacity-90 cursor-pointer disabled:opacity-50 bg-primary-container text-primary"
          >
            {isSending
              ? t("generating_and_sending_images")
              : t("confirm_and_send_report")}
          </button>
        </div>
      </div>
    </div>
  );
}

{
  /* مكون فرعي موحد للقالبين لتفادي التكرار */
}
function ReportContent({ lang, orphan, t, getFieldValue }) {
  const isAr = lang === "ar";

  return (
    <div
      className={`p-8 w-[800px] shadow-lg rounded-2xl box-border bg-white transition-all border-2 border-border ${isAr ? "mb-6" : ""}`}
      style={{ direction: isAr ? "rtl" : "ltr" }}
    >
      <div className="flex justify-between items-center pb-5 mb-6 border-b-2 border-border">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl shadow-sm bg-primary-container text-primary">
            <HeartHandshake size={32} />
          </div>
          <div>
            <h2 className="font-extrabold text-lg text-primary">
              {isAr ? t("charity_foundation") : "Athar Association"}
            </h2>
            <p className="text-xs font-semibold text-on-surface-variant">
              {isAr ? t("foundation_en") : "جمعية أثر"}
            </p>
          </div>
        </div>
        <div className="text-center">
          <h1 className="font-bold text-xl text-on-surface-variant">
            {isAr ? t("annual_orphan_report") : "Annual Orphan Report"}
          </h1>
          <p className="text-xs font-medium text-on-surface-variant/60">
            {isAr ? "Annual Orphan Report" : "استمارة اليتيم السنوية"}
          </p>
        </div>
      </div>

      <div className="text-sm mb-6 rounded-xl overflow-hidden shadow-sm border border-border">
        <ReportRow
          label={isAr ? t("orphan_name") : "Orphan Name"}
          value={`${orphan.firstName || ""} ${orphan.lastName || ""}`}
          isRtl={isAr}
        />
        <ReportRow
          label={isAr ? t("father_name") : "Father's Name"}
          value={orphan.fatherName}
          isRtl={isAr}
        />
        <ReportRow
          label={isAr ? t("mother_name") : "Mother's Name"}
          value={orphan.motherName}
          isRtl={isAr}
        />
        <ReportRow
          label={isAr ? t("guardian_name") : "Guardian Name"}
          value={orphan.guardianName}
          isRtl={isAr}
        />
        <ReportRow
          label={isAr ? t("birth_date") : "Date of Birth"}
          value={orphan.birthOfDate ? orphan.birthOfDate.split("T")[0] : ""}
          isRtl={isAr}
        />
        <ReportRow
          label={isAr ? t("gender") : "Gender"}
          value={orphan.gender}
          isRtl={isAr}
        />
      </div>

      <div className="p-3 font-bold text-center text-sm rounded-xl mb-3 shadow-sm bg-primary-container text-primary">
        {isAr ? t("detailed_information") : "Detailed Information"}
      </div>

      <div className="text-sm rounded-xl overflow-hidden shadow-sm border border-border">
        <ReportRow
          label={isAr ? t("class_name") : "Class"}
          value={getFieldValue(orphan.class, lang)}
          isRtl={isAr}
        />
        <ReportRow
          label={isAr ? t("health_status") : "Health Status"}
          value={getFieldValue(orphan.Diseases, lang)}
          isRtl={isAr}
        />
        <ReportRow
          label={isAr ? t("current_address") : "Current Address"}
          value={getFieldValue(orphan.currentAddress, lang)}
          isRtl={isAr}
        />
        <ReportRow
          label={isAr ? t("previous_address") : "Previous Address"}
          value={getFieldValue(orphan.previousAddress, lang)}
          isRtl={isAr}
        />
        <ReportRow
          label={isAr ? t("talent") : "Talent"}
          value={getFieldValue(orphan.talent, lang)}
          isRtl={isAr}
        />
      </div>
    </div>
  );
}

function ReportRow({ label, value, isRtl }) {
  return (
    <div className="grid grid-cols-12 border-b last:border-b-0 border-border">
      <div
        className={`col-span-5 p-3 font-bold bg-surface text-primary ${
          isRtl ? "border-l border-border" : "border-r border-border"
        }`}
      >
        {label}
      </div>
      <div className="col-span-7 p-3 font-medium text-on-surface-variant flex items-center">
        {value || "-"}
      </div>
    </div>
  );
}
