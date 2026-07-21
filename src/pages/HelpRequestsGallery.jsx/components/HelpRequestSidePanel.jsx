import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  X,
  User,
  FileText,
  Paperclip,
  Loader2,
  Flame,
  CheckCircle2,
  XCircle,
  Clock,
  MinusCircle,
} from "lucide-react";

import BeneficiaryPersonalInfo from "@/pages/AidDetails/components/BeneficiaryPersonalInfo";
import AidTabContent from "@/pages/AidDetails/components/AidTabContent";
import RequestAttachmentsCard from "@/pages/AidDetails/components/RequestAttachmentsCard";
import { RequestActionModal } from "./RequestActionModal";
import { RequestActionFooter } from "./RequestActionFooter";

import { fetchHelpRequestById, updateHelpRequestStatus } from "@/store/index";

export default function HelpRequestSidePanel({
  request,
  onClose,
  t,
  lang,
  onStatusUpdated,
}) {
  const dispatch = useDispatch();

  const { selectedDetails, detailsStatus } = useSelector(
    (state) => state.helpRequests,
  );

  const [activeTab, setActiveTab] = useState("general");
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    type: null,
  });

  useEffect(() => {
    if (request?.id) {
      dispatch(fetchHelpRequestById({ id: request.id }));
    }
  }, [request?.id, dispatch, lang]);

  const data = selectedDetails?.data || selectedDetails;
  const isRtl = lang === "ar";
  const isUrgent = request?.isUrgent ?? data?.isUrgent;
  const currentStatus = request?.status || data?.status;
  const currentId = request?.id || data?.id;

  const handleActionSubmit = async (formData) => {
    try {
      const payload = {
        status: formData.status,
        title: formData.title?.ar
          ? formData.title
          : {
              ar: data?.title?.ar || "طلب مساعدة",
              en: data?.title?.en || "Help Request",
            },
        description: formData.description?.ar
          ? formData.description
          : {
              ar: data?.description?.ar || "تفاصيل الطلب",
              en: data?.description?.en || "Request details",
            },
        isUrgent: Boolean(isUrgent),
        rejectionReason: formData.rejectionReason || { ar: "", en: "" },
      };

      await dispatch(
        updateHelpRequestStatus({
          id: currentId,
          data: payload,
        }),
      ).unwrap();

      // إغلاق المودال أولاً
      if (typeof onStatusUpdated === "function") {
        onStatusUpdated();
      }

      // إغلاق المودال والـ SidePanel
      setModalConfig({ isOpen: false, type: null });
      if (typeof onClose === "function") {
        onClose();
      }
    } catch (error) {
      console.error("Detailed Validation Error:", error);
    }
  };

  const renderStatusBadge = (status) => {
    const config = {
      PENDING: {
        bg: "bg-amber-500/10 text-amber-600 border-amber-200",
        icon: Clock,
        textKey: "pending",
        defaultText: "قيد الانتظار",
      },
      ACCEPTED: {
        bg: "bg-emerald-500/10 text-emerald-600 border-emerald-200",
        icon: CheckCircle2,
        textKey: "accepted",
        defaultText: "مقبول",
      },
      REJECTED: {
        bg: "bg-rose-500/10 text-rose-600 border-rose-200",
        icon: XCircle,
        textKey: "rejected",
        defaultText: "مرفوض",
      },
      CANCELLED: {
        bg: "bg-gray-100 text-gray-500 border-gray-200",
        icon: MinusCircle,
        textKey: "cancelled",
        defaultText: "ملغى",
      },
    };

    const current = config[status] || config.PENDING;
    const Icon = current.icon;

    return (
      <span
        className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full border ${current.bg}`}
      >
        <Icon className="w-3.5 h-3.5 shrink-0" />
        {t?.(current.textKey) || current.defaultText}
      </span>
    );
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-slate-900/40 backdrop-blur-md flex justify-end transition-all duration-300">
      <div className="flex-1 h-full cursor-pointer" onClick={onClose} />

      <div
        className={`w-full max-w-2xl bg-surface-lowest border-l border-border shadow-2xl h-full flex flex-col transition-transform duration-300 ${
          isRtl ? "rounded-r-3xl text-right" : "rounded-l-3xl text-left"
        }`}
        dir={isRtl ? "rtl" : "ltr"}
      >
        {/* 1. Header */}
        <div className="px-6 py-5 border-b border-border flex items-center justify-between gap-4 bg-surface-lowest sticky top-0 z-10 shrink-0 rounded-t-3xl">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-on-surface-variant hover:bg-gray-100 rounded-xl transition-all shrink-0"
              title={t?.("close") || "إغلاق"}
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col">
              <h2 className="text-lg font-black text-on-surface-variant tracking-tight">
                {t?.("request_details_panel") ||
                  t?.("requestDetails") ||
                  "تفاصيل الطلب"}
              </h2>
              {currentId && (
                <span className="text-xs font-bold text-gray-400 font-mono mt-0.5">
                  #{currentId}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isUrgent && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-extrabold rounded-full border bg-rose-50 text-rose-600 border-rose-200 animate-pulse shadow-sm">
                <Flame className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                {t?.("urgent") || "عاجل"}
              </span>
            )}
            {currentStatus && renderStatusBadge(currentStatus)}
          </div>
        </div>

        {/* 2. Tabs Nav */}
        <div className="p-3 bg-gray-50/50 border-b border-border shrink-0">
          <div className="grid grid-cols-3 gap-2 w-full">
            <button
              onClick={() => setActiveTab("general")}
              className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl font-black text-xs transition-all whitespace-nowrap ${
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
              className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl font-extrabold text-xs transition-all whitespace-nowrap ${
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
              className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl font-extrabold text-xs transition-all whitespace-nowrap ${
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

        {/* 3. Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/20">
          {detailsStatus === "loading" && (
            <div className="flex flex-col items-center justify-center min-h-[300px] text-gray-400 gap-3 bg-white rounded-3xl border border-dashed border-border">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <span className="text-xs font-bold text-gray-500">
                {t?.("loading_data") || t?.("loading") || "جاري التحميل..."}
              </span>
            </div>
          )}

          {detailsStatus === "failed" && (
            <div className="text-center py-8 px-4 bg-rose-50 text-rose-600 rounded-3xl border border-rose-100 text-xs font-bold">
              {t?.("error_loading_data") ||
                t?.("errorLoadingData") ||
                "حدث خطأ أثناء تحميل البيانات"}
            </div>
          )}

          {detailsStatus !== "loading" && data && (
            <div className="animate-in fade-in duration-200">
              {activeTab === "general" && (
                <BeneficiaryPersonalInfo
                  data={data}
                  t={t}
                  lang={lang}
                  isRTL={isRtl}
                />
              )}

              {activeTab === "details" && (
                <AidTabContent
                  selectedDetails={data}
                  t={t}
                  lang={lang}
                  isRTL={isRtl}
                />
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
          )}
        </div>

        {/* 4. Footer Action Bar */}
        <RequestActionFooter
          currentStatus={currentStatus}
          t={t}
          onOpenModal={(type) => setModalConfig({ isOpen: true, type })}
        />

        {/* الـ Modal المشترك */}
        <RequestActionModal
          isOpen={modalConfig.isOpen}
          type={modalConfig.type}
          onClose={() => setModalConfig({ isOpen: false, type: null })}
          onSubmit={handleActionSubmit}
          t={t}
          currentData={data}
        />
      </div>
    </div>
  );
}
