import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBeneficiariesById, updateBeneficiaryStatus } from "@/store/index";
import HeaderSection from "./components/HeaderSection";
import PersonalInfoCard from "./components/PersonalInfoCard";
import FinancialCard from "./components/FinancialCard";
import DocumentsCard from "./components/DocumentsCard";
import { useTranslation } from "@/hooks/useTranslation";
import { RequestActionFooter } from "./components/RequestActionFooter";
import RejectionNote from "@/pages/BeneficiaryDetails/components/RejectionNote";
import { RejectActionModal } from "./components/RejectActionModal";
import { CheckCircle2 } from "lucide-react";
import { useDelayedLoading } from "@/hooks/useDelayedLoading";
import { hasPermission } from "@/utils/permissions";

import QuickAidModal from "@/pages/QuickAid/components/QuickAidModal";

export default function BeneficiaryDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, lang } = useTranslation();
  const dispatch = useDispatch();
  const { roles } = useSelector((state) => state.auth);
  const { selectedDetails: beneficiary, detailsStatus: status } = useSelector(
    (state) => state.beneficiaries,
  );

  const isReallyLoading = useDelayedLoading(status === "loading", 500);

  const hasExistingData =
    beneficiary &&
    typeof beneficiary === "object" &&
    Object.keys(beneficiary).length > 0;
  const [hasLoadedAtLeastOnce, setHasLoadedAtLeastOnce] =
    useState(hasExistingData);

  const [modalConfig, setModalConfig] = useState({ isOpen: false, type: null });

  const [isQuickAidModalOpen, setIsQuickAidModalOpen] = useState(false);
  const [targetBeneficiaryId, setTargetBeneficiaryId] = useState(null);

  const [rejectData, setRejectData] = useState({
    status: "REJECTED",
    rejectionReason: {
      ar: "",
      en: "",
    },
  });

  useEffect(() => {
    if (id) {
      if (!hasExistingData) {
        setHasLoadedAtLeastOnce(false);
      }
      dispatch(fetchBeneficiariesById({ id })).then(() => {
        setHasLoadedAtLeastOnce(true);
      });
    }
  }, [id, dispatch, lang]);

  const handleActionSubmit = async (e) => {
    if (e) e.preventDefault();
    try {
      const isReject = modalConfig.type === "reject";
      const requestData = isReject ? rejectData : { status: "ACCEPTED" };

      const targetId = beneficiary?.id;

      await dispatch(
        updateBeneficiaryStatus({
          id: targetId,
          data: requestData,
        }),
      ).unwrap();

      setModalConfig({ isOpen: false, type: null });
      navigate(-1);
    } catch (error) {
      console.error("خطأ أثناء التحديث:", error);
      setModalConfig({ isOpen: false, type: null });
      navigate(-1);
    }
  };

  const handleOpenQuickAidModal = (beneficiaryId) => {
    setTargetBeneficiaryId(beneficiaryId);
    setIsQuickAidModalOpen(true);
  };

  const showSkeleton =
    (isReallyLoading || !hasLoadedAtLeastOnce) && !hasExistingData;

  if (showSkeleton)
    return (
      <div
        className="p-6 md:p-8 max-w-5xl mx-auto space-y-6 min-h-[85vh] flex flex-col justify-between animate-pulse"
        dir={lang === "ar" ? "rtl" : "ltr"}
      >
        <div className="space-y-8 w-full">
          <div className="h-28 bg-gray-200 rounded-3xl w-full" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            <div className="h-[420px] bg-gray-200 rounded-3xl" />
            <div className="h-[420px] bg-gray-200 rounded-3xl" />
          </div>
          <div className="h-56 bg-gray-200 rounded-3xl w-full" />
        </div>
      </div>
    );

  if (!beneficiary)
    return (
      <div className="p-20 text-center text-slate-500 font-bold">
        {lang === "ar" ? "لم يتم العثور على البيانات" : "No data found"}
      </div>
    );

  const rawReason = beneficiary.beneficiary?.rejectionReason;
  const rejectionReasonText =
    typeof rawReason === "string"
      ? rawReason
      : rawReason?.[lang] || rawReason?.["ar"] || rawReason?.["en"] || "";

  return (
    <div
      className="p-6 md:p-8 max-w-5xl mx-auto space-y-6 min-h-[85vh] flex flex-col justify-between"
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      <div className="space-y-8 w-full">
        <HeaderSection
          data={beneficiary}
          onOpenQuickAidModal={handleOpenQuickAidModal}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          <div className="h-full">
            <PersonalInfoCard data={beneficiary} />
          </div>
          <div className="h-full">
            <FinancialCard
              data={beneficiary.beneficiary}
              parentData={beneficiary}
            />
          </div>
        </div>

        {rejectionReasonText && (
          <div className="w-full">
            <RejectionNote reason={rejectionReasonText} />
          </div>
        )}

        <DocumentsCard data={beneficiary.beneficiary} />
      </div>

      {hasPermission(roles, "status:beneficiaries") && (
        <RequestActionFooter
          currentStatus={beneficiary.beneficiary?.status}
          t={t}
          onOpenModal={(type) => {
            if (type === "reject") {
              setRejectData({
                status: "REJECTED",
                rejectionReason: { ar: "", en: "" },
              });
            }
            setModalConfig({ isOpen: true, type });
          }}
          onAccept={() => setModalConfig({ isOpen: true, type: "accept" })}
        />
      )}

      <RejectActionModal
        isOpen={modalConfig.isOpen && modalConfig.type === "reject"}
        onClose={() => setModalConfig({ isOpen: false, type: null })}
        onSubmit={handleActionSubmit}
        rejectData={rejectData}
        setRejectData={setRejectData}
        isLoading={status === "loading"}
        t={t}
      />

      {modalConfig.isOpen && modalConfig.type === "accept" && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4"
          dir={t("dir") || "rtl"}
        >
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-border space-y-6 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center gap-4 border-b border-border pb-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900">
                  {t("confirm_acceptance_title")}
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  {t("confirm_acceptance_message")}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setModalConfig({ isOpen: false, type: null })}
                className="flex-1 py-3 px-4 rounded-2xl border border-border bg-slate-50 text-slate-700 hover:bg-slate-100 font-black text-sm transition-all"
              >
                {t("design_cancel") || t("cancel")}
              </button>
              <button
                type="button"
                disabled={status === "loading"}
                onClick={handleActionSubmit}
                className="flex-1 py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm transition-all shadow-md disabled:opacity-50"
              >
                {status === "loading"
                  ? t("processing")
                  : t("confirm_acceptance")}
              </button>
            </div>
          </div>
        </div>
      )}

      <QuickAidModal
        isOpen={isQuickAidModalOpen}
        onClose={() => setIsQuickAidModalOpen(false)}
        defaultBeneficiaryId={targetBeneficiaryId}
      />
    </div>
  );
}
