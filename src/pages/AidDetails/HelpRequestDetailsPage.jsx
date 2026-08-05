import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { User, FileText, Paperclip } from "lucide-react";
import HelpRequestDetailsHeader from "./components/HelpRequestDetailsHeader";

import BeneficiaryPersonalInfo from "@/pages/AidDetails/components/BeneficiaryPersonalInfo";
import AidTabContent from "@/pages/AidDetails/components/AidTabContent";
import RequestAttachmentsCard from "@/pages/AidDetails/components/RequestAttachmentsCard";
import { RequestActionModal } from "./components/RequestActionModal";
import { RequestActionFooter } from "./components/RequestActionFooter";
import { useTranslation } from "@/hooks/useTranslation";
import { useDelayedLoading } from "@/hooks/useDelayedLoading";

import { fetchHelpRequestById, updateHelpRequestStatus } from "@/store/index";

export default function HelpRequestDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t, lang } = useTranslation();

  const { selectedDetails, detailsStatus } = useSelector(
    (state) => state.helpRequests,
  );

  const isReallyLoading = useDelayedLoading(detailsStatus === "loading", 400);

  // استخراج البيانات بحماية تامة
  const data = selectedDetails?.data || selectedDetails || null;
  const hasExistingData =
    data && typeof data === "object" && Object.keys(data).length > 0;

  const [hasLoadedAtLeastOnce, setHasLoadedAtLeastOnce] =
    useState(hasExistingData);

  const [activeTab, setActiveTab] = useState("general");
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    type: null,
  });

  useEffect(() => {
    if (id) {
      if (!hasExistingData) {
        setHasLoadedAtLeastOnce(false);
      }

      dispatch(fetchHelpRequestById({ id })).then(() => {
        setHasLoadedAtLeastOnce(true);
      });
    }
  }, [id, dispatch, lang]);

  const hasData = hasExistingData;
  const isRtl = lang === "ar";

  const isUrgent = data?.isUrgent ?? false;
  const currentStatus = data?.status ?? null;

  const handleGoBack = () => navigate(-1);

  const handleActionSubmit = async (formData) => {
    try {
      const formDataObj = new FormData();

      const status = formData.status;
      const title = formData.title?.ar
        ? formData.title
        : {
            ar: data?.title?.ar || "طلب مساعدة",
            en: data?.title?.en || "Help Request",
          };
      const description = formData.description?.ar
        ? formData.description
        : {
            ar: data?.description?.ar || "تفاصيل الطلب",
            en: data?.description?.en || "Request details",
          };
      const urgentFlag = Boolean(isUrgent);
      const rejectionReason = formData.rejectionReason || { ar: "", en: "" };

      formDataObj.append("status", status);
      formDataObj.append("title[ar]", title.ar);
      formDataObj.append("title[en]", title.en);
      formDataObj.append("description[ar]", description.ar);
      formDataObj.append("description[en]", description.en);
      formDataObj.append("isUrgent", urgentFlag);
      formDataObj.append("rejectionReason[ar]", rejectionReason.ar);
      formDataObj.append("rejectionReason[en]", rejectionReason.en);

      if (formData.media) {
        formDataObj.append("media", formData.media);
      }

      await dispatch(
        updateHelpRequestStatus({
          id,
          data: formDataObj,
        }),
      ).unwrap();

      setModalConfig({ isOpen: false, type: null });
      navigate(-1);
    } catch (error) {
      console.error("Detailed Validation Error:", error);
    }
  };

  const showSkeleton = isReallyLoading && !hasData;

  return (
    <div
      className="p-6 md:p-8 max-w-5xl mx-auto space-y-6 min-h-[85vh] flex flex-col justify-between"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="space-y-6">
        {/* 1. Header */}
        <HelpRequestDetailsHeader
          id={id}
          isRtl={isRtl}
          isUrgent={isUrgent}
          currentStatus={currentStatus}
          t={t}
          onBack={handleGoBack}
        />

        {/* 2. Main Card with Fixed Layout */}
        <section className="bg-surface-lowest rounded-3xl shadow-sm border border-border overflow-hidden">
          <div>
            {/* Tabs Nav */}
            <div className="p-3 bg-gray-50/50 border-b border-border">
              <div className="grid grid-cols-3 gap-2 w-full">
                <button
                  onClick={() => setActiveTab("general")}
                  className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl font-black text-xs transition-all whitespace-nowrap cursor-pointer ${
                    activeTab === "general"
                      ? "bg-white text-primary shadow-sm border border-border"
                      : "text-gray-500 hover:text-on-surface-variant hover:bg-white/60"
                  }`}
                >
                  <User className="w-4 h-4 shrink-0" />
                  <span className="truncate">
                    {t?.("personal_info_tab") ||
                      t?.("personalInfo") ||
                      "البيانات الشخصية"}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab("details")}
                  className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl font-extrabold text-xs transition-all whitespace-nowrap cursor-pointer ${
                    activeTab === "details"
                      ? "bg-white text-primary shadow-sm border border-border"
                      : "text-gray-500 hover:text-on-surface-variant hover:bg-white/60"
                  }`}
                >
                  <FileText className="w-4 h-4 shrink-0" />
                  <span className="truncate">
                    {t?.("request_details_tab") ||
                      t?.("requestDetails") ||
                      "تفاصيل الدعم"}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab("attachments")}
                  className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl font-extrabold text-xs transition-all whitespace-nowrap cursor-pointer ${
                    activeTab === "attachments"
                      ? "bg-white text-primary shadow-sm border border-border"
                      : "text-gray-500 hover:text-on-surface-variant hover:bg-white/60"
                  }`}
                >
                  <Paperclip className="w-4 h-4 shrink-0" />
                  <span className="truncate">
                    {t?.("attachments_tab") || t?.("attachments") || "المرفقات"}
                  </span>
                  {data?.aidDetails?.mediaUrls?.length > 0 && (
                    <span className="px-1.5 py-0.5 text-[10px] bg-primary/10 text-primary rounded-full font-bold shrink-0">
                      {data.aidDetails.mediaUrls.length}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Content Area */}
            <div className="p-6 bg-gray-50/25 relative min-h-[520px] flex flex-col justify-start">
              {showSkeleton ? (
                <div className="space-y-6 w-full animate-pulse">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gray-200/80 rounded-2xl" />
                    <div className="space-y-2 flex-1">
                      <div className="h-5 bg-gray-200/80 rounded-lg w-1/3" />
                      <div className="h-4 bg-gray-200/80 rounded-lg w-1/4" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                    <div className="h-12 bg-gray-200/80 rounded-xl" />
                    <div className="h-12 bg-gray-200/80 rounded-xl" />
                    <div className="h-12 bg-gray-200/80 rounded-xl" />
                    <div className="h-12 bg-gray-200/80 rounded-xl" />
                  </div>
                  <div className="h-28 bg-gray-200/80 rounded-2xl mt-4" />
                </div>
              ) : detailsStatus === "failed" && !hasData ? (
                <div className="text-center py-12 px-4 bg-rose-50 text-rose-600 rounded-3xl border border-rose-100 text-xs font-bold m-auto">
                  {t?.("error_loading_data") ||
                    t?.("errorLoadingData") ||
                    "حدث خطأ أثناء تحميل البيانات"}
                </div>
              ) : hasData ? (
                <div className="space-y-6 w-full">
                  {activeTab === "general" && (
                    <BeneficiaryPersonalInfo
                      data={data}
                      t={t}
                      lang={lang}
                      isRTL={isRtl}
                    />
                  )}

                  {activeTab === "details" && (
                    <div className="space-y-6">
                      <AidTabContent
                        selectedDetails={data}
                        t={t}
                        lang={lang}
                        isRTL={isRtl}
                      />
                    </div>
                  )}

                  {activeTab === "attachments" && (
                    <RequestAttachmentsCard
                      mediaUrls={data?.aidDetails?.mediaUrls}
                      t={t}
                      lang={lang}
                      isRTL={isRtl}
                    />
                  )}
                </div>
              ) : null}
            </div>
          </div>

          {/* Footer Action Bar */}
          <RequestActionFooter
            currentStatus={currentStatus}
            t={t}
            onOpenModal={(type) => setModalConfig({ isOpen: true, type })}
          />
        </section>
      </div>

      {/* Modal المشترك */}
      <RequestActionModal
        isOpen={modalConfig.isOpen}
        type={modalConfig.type}
        onClose={() => setModalConfig({ isOpen: false, type: null })}
        onSubmit={handleActionSubmit}
        t={t}
        currentData={data}
      />
    </div>
  );
}
