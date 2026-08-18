import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSponsorshipById,
  clearSponsorshipDetails,
  updateSponsorshipStatus,
} from "@/store/index";
import { fetchDonorHistory, clearDonorDetails } from "@/store/index";
import { useTranslation } from "@/hooks/useTranslation";
import { useDelayedLoading } from "@/hooks/useDelayedLoading";
import { HeartHandshake, History, User } from "lucide-react";

import SponsorshipDetailsCard from "./components/SponsorshipDetailsCard";
import OrphanInfoCard from "./components/OrphanInfoCard";
import DonorSponsorshipHistoryTable from "./components/DonorSponsorshipHistoryTable";
import { RequestActionFooter } from "./components/RequestActionFooter";
import { RejectActionModal } from "../BeneficiaryDetails/components/RejectActionModal";
import { ArrowLeft, ArrowRight } from "lucide-react"; // أضفنا أيقونات الأسهم
import { hasPermission } from "@/utils/permissions";

export default function SponsorshipDetailsPage() {
  const { sponsorshipId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t, lang } = useTranslation();
  const [selectedOrphanId, setSelectedOrphanId] = useState(null);
  const { roles } = useSelector((state) => state.auth);

  const [activeTab, setActiveTab] = useState("info");

  const [modalConfig, setModalConfig] = useState({ isOpen: false, type: null });
  const [rejectData, setRejectData] = useState({
    status: "REJECTED",
    rejectionReason: {
      ar: "",
      en: "",
    },
  });

  const { selectedDetails: sponsorship, detailsStatus } = useSelector(
    (state) => state.sponsorships,
  );

  const { selectedDetails: donorHistoryData, detailsStatus: donorStatus } =
    useSelector((state) => state.donors);

  const hasExistingSponsorship =
    sponsorship && String(sponsorship.id) === String(sponsorshipId);

  const [hasLoadedAtLeastOnce, setHasLoadedAtLeastOnce] = useState(
    hasExistingSponsorship,
  );

  const isDetailsLoading = detailsStatus === "loading";
  const isReallyLoading = useDelayedLoading(isDetailsLoading, 100);

  useEffect(() => {
    if (
      sponsorshipId &&
      sponsorshipId !== "undefined" &&
      !isNaN(sponsorshipId)
    ) {
      if (!hasExistingSponsorship) {
        setHasLoadedAtLeastOnce(false);
      }

      dispatch(
        fetchSponsorshipById({
          resource: "sponsorships",
          id: Number(sponsorshipId),
        }),
      ).then(() => {
        setHasLoadedAtLeastOnce(true);
      });
    }

    return () => {
      dispatch(clearSponsorshipDetails());
      dispatch(clearDonorDetails());
    };
  }, [dispatch, sponsorshipId, lang]);

  const donorId =
    sponsorship?.donor?.donorId ||
    sponsorship?.donor?.id ||
    sponsorship?.donorId;

  useEffect(() => {
    if (donorId && donorId !== "undefined" && !isNaN(donorId)) {
      dispatch(
        fetchDonorHistory({
          resource: "donors",
          id: { type: "sponsorships", donorId: Number(donorId) },
        }),
      );
    }
  }, [dispatch, donorId, lang]);

  const handleActionSubmit = async (e) => {
    if (e) e.preventDefault();
    try {
      const isReject = modalConfig.type === "reject";

      const requestData = isReject
        ? rejectData
        : { status: "ACCEPTED", orphanId: Number(selectedOrphanId) };

      if (!isReject && !selectedOrphanId) {
        alert(
          lang === "ar"
            ? "الرجاء اختيار يتيم لربطه بهذه الكفالة"
            : "Please select an orphan to link",
        );
        return;
      }

      await dispatch(
        updateSponsorshipStatus({
          id: Number(sponsorshipId),
          data: requestData,
        }),
      ).unwrap();

      setModalConfig({ isOpen: false, type: null });
      setSelectedOrphanId(null);
      navigate(-1);
    } catch (error) {
      console.error("خطأ أثناء تحديث حالة الكفالة:", error);
      setModalConfig({ isOpen: false, type: null });
    }
  };

  const showSkeleton =
    isReallyLoading && (!hasLoadedAtLeastOnce || !hasExistingSponsorship);

  if (!sponsorship && detailsStatus === "succeeded" && !isReallyLoading) {
    return (
      <div className="text-center py-20 font-medium text-gray-400">
        {t("sponsorship_not_found") || "الكفالة غير موجودة"}
      </div>
    );
  }
  const orphansList =
    sponsorship?.orphans || (sponsorship?.orphan ? [sponsorship.orphan] : []);
  return (
    <div
      className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500 relative"
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      <div className="space-y-6 w-full">
        {/* زر الرجوع فوق التبويبات مباشرة (حسب الـ dir: عربي يمين، إنجليزي يسار تلقائياً بدون فذلكة) */}
        <div className="flex justify-start">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 rounded-xl font-bold transition-all shadow-sm cursor-pointer text-xs shrink-0"
          >
            {lang === "ar" ? <ArrowRight size={16} /> : <ArrowLeft size={16} />}
            <span>{lang === "ar" ? "رجوع" : "Back"}</span>
          </button>
        </div>

        {/* شريط التبويبات */}
        <div className="flex border-b border-border gap-4 overflow-x-auto">
          <button
            onClick={() => setActiveTab("info")}
            className={`flex items-center gap-2 pb-3 px-4 font-semibold text-sm transition-all border-b-2 whitespace-nowrap cursor-pointer ${
              activeTab === "info"
                ? "border-primary text-primary"
                : "border-transparent text-gray-400 hover:text-gray-600"
            }`}
          >
            <HeartHandshake size={18} />
            {t("sponsorship_details")}
          </button>
          <button
            onClick={() => setActiveTab("orphan")}
            className={`flex items-center gap-2 pb-3 px-4 font-semibold text-sm transition-all border-b-2 whitespace-nowrap cursor-pointer ${
              activeTab === "orphan"
                ? "border-primary text-primary"
                : "border-transparent text-gray-400 hover:text-gray-600"
            }`}
          >
            <User size={18} />
            {t("orphan_info")}{" "}
            {orphansList.length > 0 && `(${orphansList.length})`}
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`flex items-center gap-2 pb-3 px-4 font-semibold text-sm transition-all border-b-2 whitespace-nowrap cursor-pointer ${
              activeTab === "history"
                ? "border-primary text-primary"
                : "border-transparent text-gray-400 hover:text-gray-600"
            }`}
          >
            <History size={18} />
            {t("donor_history") || "السجل المالي للمتبرع"}
          </button>
        </div>

        <section className="bg-surface-lowest p-6 rounded-3xl shadow-sm border border-border min-h-[500px] flex flex-col justify-between">
          <div className="relative min-h-[400px] flex flex-col">
            {showSkeleton ? (
              <div className="animate-pulse space-y-6 py-2 w-full">
                <div className="flex items-center justify-between border-b border-border pb-4">
                  <div className="h-6 bg-gray-200 rounded-lg w-1/4"></div>
                  <div className="h-7 bg-gray-200 rounded-full w-20"></div>
                </div>

                <div className="p-4 rounded-2xl border border-border space-y-3 max-w-xl">
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-12 bg-gray-200 rounded-xl w-full"></div>
                </div>

                <div className="p-4 rounded-2xl border border-border space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="h-16 bg-gray-200 rounded-xl"></div>
                    <div className="h-16 bg-gray-200 rounded-xl"></div>
                    <div className="h-16 bg-gray-200 rounded-xl"></div>
                    <div className="h-16 bg-gray-200 rounded-xl"></div>
                  </div>
                </div>
              </div>
            ) : sponsorship ? (
              <>
                {activeTab === "info" && (
                  <div className="animate-fade-in">
                    <SponsorshipDetailsCard
                      sponsorship={sponsorship}
                      t={t}
                      lang={lang}
                    />
                  </div>
                )}

                {activeTab === "orphan" && (
                  <div className="animate-fade-in">
                    <OrphanInfoCard orphans={orphansList} t={t} lang={lang} />
                  </div>
                )}

                {activeTab === "history" && (
                  <div className="animate-fade-in">
                    <DonorSponsorshipHistoryTable
                      historyData={donorHistoryData}
                      loading={donorStatus === "loading"}
                      t={t}
                      lang={lang}
                    />
                  </div>
                )}
              </>
            ) : null}
          </div>
        </section>
      </div>

      {hasPermission(roles, "status:sponsorships") && (
        <RequestActionFooter
          currentStatus={sponsorship?.status}
          t={t}
          onOpenModal={(type) => {
            if (type === "reject") {
              setRejectData({
                status: "REJECTED",
                rejectionReason: { ar: "", en: "" },
              });
              setModalConfig({ isOpen: true, type: "reject" });
            }
          }}
          onAccept={() => {
            navigate(
              `/dashboard/orphans?mode=select&sponsorshipId=${sponsorshipId}`,
            );
          }}
        />
      )}

      <RejectActionModal
        isOpen={modalConfig.isOpen && modalConfig.type === "reject"}
        onClose={() => setModalConfig({ isOpen: false, type: null })}
        onSubmit={handleActionSubmit}
        rejectData={rejectData}
        setRejectData={setRejectData}
        isLoading={detailsStatus === "loading"}
        t={t}
      />
    </div>
  );
}
