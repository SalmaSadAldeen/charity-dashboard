import { useEffect, useState } from "react";
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

export default function BeneficiaryDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, lang } = useTranslation();
  const dispatch = useDispatch();

  const { selectedDetails: beneficiary, detailsStatus: status } = useSelector(
    (state) => state.beneficiaries,
  );

  const [modalConfig, setModalConfig] = useState({ isOpen: false, type: null });

  const [rejectData, setRejectData] = useState({
    status: "REJECTED",
    rejectionReason: {
      ar: "",
      en: "",
    },
  });

  useEffect(() => {
    dispatch(fetchBeneficiariesById({ id }));
  }, [id, dispatch, lang]);
  const handleActionSubmit = async (e) => {
    if (e) e.preventDefault();
    try {
      const isReject = modalConfig.type === "reject";
      const requestData = isReject ? rejectData : { status: "ACCEPTED" };

      // تعديل لجلب الـ ID الرئيسي الصحيح (رقم 3 في حالتك الحالية)
      const targetId = beneficiary?.id;
      console.log("الـ ID الرئيسي الصحيح المعتمد للإرسال:", targetId);

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
  if (status === "loading")
    return (
      <div className="p-20 text-center text-primary font-bold">
        {lang === "ar" ? "جاري التحميل..." : "Loading..."}
      </div>
    );
  if (!beneficiary)
    return (
      <div className="p-20 text-center">
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
        <HeaderSection data={beneficiary} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          <div className="h-full">
            <PersonalInfoCard data={beneficiary} />
          </div>
          <div className="h-full">
            <FinancialCard
              data={beneficiary.beneficiary}
              parentData={beneficiary}
            />{" "}
          </div>
        </div>

        {rejectionReasonText && (
          <div className="w-full">
            <RejectionNote reason={rejectionReasonText} />
          </div>
        )}

        <DocumentsCard data={beneficiary.beneficiary} />
      </div>

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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-border space-y-6 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center gap-4 border-b border-border pb-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900">
                  {lang === "ar" ? "تأكيد قبول الطلب" : "Confirm Acceptance"}
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  {lang === "ar"
                    ? "هل أنت متأكد من قبول طلب هذا المستفيد؟"
                    : "Are you sure you want to accept this beneficiary request?"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setModalConfig({ isOpen: false, type: null })}
                className="flex-1 py-3 px-4 rounded-2xl border border-border bg-slate-50 text-slate-700 hover:bg-slate-100 font-black text-sm transition-all"
              >
                {lang === "ar" ? "إلغاء" : "Cancel"}
              </button>
              <button
                type="button"
                disabled={status === "loading"}
                onClick={handleActionSubmit}
                className="flex-1 py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm transition-all shadow-md disabled:opacity-50"
              >
                {status === "loading"
                  ? lang === "ar"
                    ? "جاري المعالجة..."
                    : "Processing..."
                  : lang === "ar"
                    ? "تأكيد القبول"
                    : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
