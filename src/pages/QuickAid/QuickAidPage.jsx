import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchQuickAidSummary,
  fetchQuickAidDisbursements,
} from "@/store/quickAidSlice";
import { useTranslation } from "@/hooks/useTranslation";
import { hasPermission } from "@/utils/permissions"; // دالة التحقق من الصلاحيات المعتمدة لديكم

import QuickAidContent from "@/pages/QuickAid/components/QuickAidContent";
import QuickAidModal from "@/pages/QuickAid/components/QuickAidModal";

export default function QuickAidPage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const roles = useSelector(
    (state) => state.auth.roles || state.auth.permissions || [],
  );

  const canRead = hasPermission(roles, "read:quick_aid_fund");
  const canCreate = hasPermission(roles, "create:quick_aid_disbursements");

  useEffect(() => {
    if (canRead) {
      dispatch(fetchQuickAidSummary());
      dispatch(fetchQuickAidDisbursements({ page: 1, limit: 10 }));
    }
  }, [dispatch, canRead]);

  if (!canRead) {
    return (
      <div className="p-12 text-center text-red-500 font-semibold text-lg">
        {t("unauthorizedAccess") ||
          "ليس لديك الصلاحية لعرض صفحة صندوق المساعدات العاجلة"}
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">
      <QuickAidContent
        canCreate={canCreate}
        onOpenModal={() => setIsModalOpen(true)}
        roles={roles}
      />

      <QuickAidModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
