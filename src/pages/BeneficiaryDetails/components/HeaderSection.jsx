import { ArrowLeft, Plus, WalletCards } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { hasPermission } from "@/utils/permissions";
import { useTranslation } from "@/hooks/useTranslation";
import { useSelector } from "react-redux";

export default function HeaderSection({ data, onOpenQuickAidModal }) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { roles } = useSelector((state) => state.auth);

  const getStatusStyle = (status) => {
    switch (status) {
      case "ACCEPTED":
        return "bg-green-50 text-green-700 border-green-200";
      case "PENDING":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "REJECTED":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 border-gray-200 text-gray-700";
    }
  };

  const status = data?.beneficiary?.status || data?.status;
  const beneficiaryId = data?.beneficiary?.id || data?.id;

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-3xl border border-border shadow-sm">
      <div className="flex items-center gap-6">
        <button
          onClick={() => navigate(-1)}
          className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors duration-300 shrink-0"
        >
          <ArrowLeft size={20} className="text-gray-700 rtl:rotate-180" />
        </button>

        <div className="flex flex-wrap items-center gap-6 md:gap-12">
          <h1 className="text-2xl font-black text-gray-900">
            {data?.firstName} {data?.lastName}
          </h1>

          {status && (
            <span
              className={`px-6 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border whitespace-nowrap shadow-sm ${getStatusStyle(status)}`}
            >
              {t(status)}
            </span>
          )}
        </div>
      </div>

      {/* مجموعة الأزرار الجانبية بشكل مرتب بدون ازدحام */}
      <div className="flex items-center gap-3 w-full md:w-auto justify-end">
        {/* 1. زر طلب المساعدة العادي القديم (إذا كانت الحالة مقبولة والصلاحية موجودة) */}
        {status === "ACCEPTED" &&
          hasPermission(roles, "create::aid-requests") && (
            <button
              onClick={() =>
                navigate(
                  `/dashboard/beneficiaries/${beneficiaryId}/create-request`,
                )
              }
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-2xl font-black text-xs transition-all shadow-md shrink-0 cursor-pointer"
            >
              <Plus size={16} />
              {t("add_aid_request_btn")}
            </button>
          )}

        {/* 2. زر المساعدة العاجلة (تصميم مميز وأنيق مع أيقونة محفظة/أموال لعدم التكرار) */}
        {status === "ACCEPTED" &&
          hasPermission(roles, "create:quick_aid_disbursements") && (
            <button
              onClick={() => onOpenQuickAidModal(beneficiaryId)}
              title={t("add_quick_aid_btn", "صرف مساعدة عاجلة")}
              className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-4 py-2.5 rounded-2xl font-black text-xs transition-all shadow-md shrink-0 cursor-pointer group"
            >
              <WalletCards
                size={16}
                className="transition-transform group-hover:scale-110"
              />
              <span className="hidden sm:inline">
                {t("quick_aid_btn", "صرف عاجل")}
              </span>
            </button>
          )}
      </div>
    </div>
  );
}
