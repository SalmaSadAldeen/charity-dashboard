import { useTranslation } from "@/hooks/useTranslation";
import OrphanHeader from "./components/OrphanHeader";
import OrphanInfoGrid from "./components/OrphanInfoGrid";
import OrphanJsonSection from "./components/OrphanJsonSection";
import FamilyStats from "./components/FamilyStats";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrphanById, clearOrphanDetails } from "@/store/index";
import { useGenericDelete } from "@/hooks/useGenericDelete";
import ConfirmModal from "@/pages/EmployeesDirectory/components/ConfirmModal";

export default function OrphanProfilePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { handleDelete } = useGenericDelete("orphan");
  const { selectedDetails: orphan } = useSelector((state) => state.orphans);
  useEffect(() => {
    // 1. تحقق: هل الـ ID الموجود في الرابط يختلف عن الـ ID الموجود في الـ Store؟
    // 2. إذا كان مختلفاً، قم بمسح القديم أولاً ثم اطلب الجديد
    if (id && orphan?.id !== parseInt(id)) {
      dispatch(clearOrphanDetails()); // مسح البيانات القديمة فوراً
      dispatch(fetchOrphanById({ id })); // طلب البيانات الجديدة
    }
  }, [id]);
  if (!orphan) {
    return (
      <div className="p-8 text-center text-lg font-bold">{t("loading")}</div>
    );
  }

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      <OrphanHeader
        orphan={orphan}
        onEdit={() => navigate(`/dashboard/orphans/edit/${id}`)}
        onDelete={() => setIsDeleteModalOpen(true)}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <OrphanInfoGrid orphan={orphan} />
          <OrphanJsonSection orphan={orphan} />
        </div>
        <div className="space-y-6">
          <FamilyStats orphan={orphan} />
        </div>
      </div>

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onConfirm={async () => {
          await handleDelete(id, () => setIsDeleteModalOpen(false));
          navigate("/dashboard/orphans");
        }}
        onCancel={() => setIsDeleteModalOpen(false)}
        isLoading={false}
      />
    </div>
  );
}
