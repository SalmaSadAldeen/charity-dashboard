import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBeneficiariesById } from "@/store/index";
import HeaderSection from "./components/HeaderSection";
import PersonalInfoCard from "./components/PersonalInfoCard";
import FinancialCard from "./components/FinancialCard";
import DocumentsCard from "./components/DocumentsCard";
import { useTranslation } from "@/hooks/useTranslation";
import RejectionNote from "@/pages/BeneficiaryDetails/components/RejectionNote";
export default function BeneficiaryDetails() {
  const { id } = useParams();
  const { t, lang } = useTranslation();
  const dispatch = useDispatch();
  const { selectedDetails: beneficiary, detailsStatus: status } = useSelector(
    (state) => state.beneficiaries,
  );

  useEffect(() => {
    dispatch(fetchBeneficiariesById({ id }));
  }, [id, dispatch]);

  if (status === "loading")
    return (
      <div className="p-20 text-center text-primary font-bold">Loading...</div>
    );
  if (!beneficiary)
    return <div className="p-20 text-center">No data found</div>;

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <HeaderSection data={beneficiary} />

      {/* الـ Grid للكاردات */}
      {/* الـ Grid للكاردات */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        <div className="h-full">
          <PersonalInfoCard data={beneficiary} />
        </div>
        <div className="h-full">
          <FinancialCard data={beneficiary.beneficiary} />
        </div>
      </div>
      {/* هنا وضعت ملاحظة الرفض لتمتد على كامل العرض تحت الكاردين */}
      {beneficiary.beneficiary?.rejectionReason && (
        <div className="w-full">
          <RejectionNote
            reason={
              beneficiary.beneficiary.rejectionReason?.[lang] ||
              beneficiary.beneficiary.rejectionReason?.["ar"]
            }
          />
        </div>
      )}

      <DocumentsCard data={beneficiary.beneficiary} />

      {/* أزرار القبول والرفض */}
      <div className="flex gap-4 pt-4 border-t border-border">
        <button className="flex-1 bg-primary text-white py-3 rounded-2xl font-black hover:opacity-90 transition-all">
          {t("acceptApplication")}
        </button>
        <button className="flex-1 bg-white text-error border-2 border-error py-3 rounded-2xl font-black hover:bg-error hover:text-white transition-all">
          {t("rejectApplication")}
        </button>
      </div>
    </div>
  );
}
