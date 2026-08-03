import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // 1. أضفنا useNavigate لكي نتمكن من العودة للصفحة السابقة بعد اتخاذ القرار
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSponsorshipById,
  clearSponsorshipDetails,
  updateSponsorshipStatus,
} from "@/store/index";
import { fetchDonorHistory, clearDonorDetails } from "@/store/index";
import { useTranslation } from "@/hooks/useTranslation";
import { useDelayedLoading } from "@/hooks/useDelayedLoading";
import {
  HeartHandshake,
  History,
  User,
  Loader2,
} from "lucide-react"; // أضفنا أيقونة التحقق CheckCircle2

import SponsorshipDetailsCard from "./components/SponsorshipDetailsCard";
import OrphanInfoCard from "./components/OrphanInfoCard";
import DonorSponsorshipHistoryTable from "./components/DonorSponsorshipHistoryTable";
import { RequestActionFooter } from "./components/RequestActionFooter";
import { RejectActionModal } from "../BeneficiaryDetails/components/RejectActionModal";

export default function SponsorshipDetailsPage() {
  const { sponsorshipId } = useParams();
  const navigate = useNavigate(); // تهيئة التنقل بين الصفحات
  const dispatch = useDispatch();
  const { t, lang } = useTranslation();
  const [selectedOrphanId, setSelectedOrphanId] = useState(null);

  const [activeTab, setActiveTab] = useState("info");

  // 2. أضفنا تعريف الـ state الخاصة بالموديل (القبول أو الرفض) وحفظ بيانات سبب الرفض
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

  // استخدام الهوك لمنع ظهور اللودر إلا إذا التأخير طال وكان التحميل لأول مرة
  const isDetailsLoading = detailsStatus === "loading" && !sponsorship;
  const showLoader = useDelayedLoading(isDetailsLoading, 400);

  // جلب تفاصيل الكفالة عند تحميل الصفحة
  useEffect(() => {
    if (
      sponsorshipId &&
      sponsorshipId !== "undefined" &&
      !isNaN(sponsorshipId)
    ) {
      dispatch(
        fetchSponsorshipById({
          resource: "sponsorships",
          id: Number(sponsorshipId),
        }),
      );
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

  // جلب السجل المالي للمتبرع
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

  // 3. دالة إرسال التحديث (قبول أو رفض) إلى الـ API
  const handleActionSubmit = async (e) => {
    if (e) e.preventDefault();
    try {
      const isReject = modalConfig.type === "reject";

      // إذا كان قبول، نرسل الحالة ومعها الـ orphanId الذي اخترناه من القائمة
      const requestData = isReject
        ? rejectData
        : { status: "ACCEPTED", orphanId: Number(selectedOrphanId) };

      // التحقق البسيط قبل الإرسال في حال كان قبول ولم يتم اختيار يتيم
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

  // شاشة التحميل الأولية
  if (showLoader) {
    return (
      <div className="flex flex-col items-center justify-center py-32 space-y-3">
        <Loader2 size={36} className="animate-spin text-primary" />
        <p className="font-medium text-gray-500">
          {t("loading_sponsorship_details") || "جاري تحميل تفاصيل الكفالة..."}
        </p>
      </div>
    );
  }

  // في حال لم يتم العثور على الكفالة
  if (!sponsorship && detailsStatus === "succeeded") {
    return (
      <div className="text-center py-20 font-medium text-gray-400">
        {t("sponsorship_not_found") || "الكفالة غير موجودة"}
      </div>
    );
  }

  return (
    // أضفنا خصائص التصميم لتوزيع العناصر وجعل المحتوى يمتد بسلاسة مع أزرار الأسفل
    <div
      className="p-6 max-w-7xl mx-auto space-y-6 min-h-[85vh] flex flex-col justify-between"
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      <div className="space-y-6 w-full">
        {/* التبويبات العلوية */}
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
            {t("orphan_info")}
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

        {/* محتوى التبويبات */}
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
            <OrphanInfoCard orphan={sponsorship?.orphan} t={t} lang={lang} />
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
      </div>

      {/* 4. شريط الأزرار السفلي (يظهر حصرياً إذا كانت الكفالة بحالة PENDING بداخل المكون نفسه) */}
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

      {/* موديل رفض الكفالة فقط */}
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
