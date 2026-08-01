import { useTranslation } from "@/hooks/useTranslation";
import OrphanHeader from "./components/OrphanHeader";
import OrphanInfoGrid from "./components/OrphanInfoGrid";
import OrphanJsonSection from "./components/OrphanJsonSection";
import FamilyStats from "./components/FamilyStats";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrphanById } from "@/store/index";
import { useGenericDelete } from "@/hooks/useGenericDelete";
import ConfirmModal from "@/pages/EmployeesDirectory/components/ConfirmModal";

export default function OrphanProfilePage() {
  const { t, lang } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { handleDelete } = useGenericDelete("orphan");
  const { selectedDetails: orphan, status } = useSelector(
    (state) => state.orphans,
  );
  useEffect(() => {
    if (id) {
      // جلب البيانات مع كل تغير في الـ ID أو الـ lang
      dispatch(fetchOrphanById({ id }));
    }

    // تنظيف البيانات فقط عند الخروج من الصفحة
    // return () => {
    //   dispatch(clearOrphanDetails());
    // };
  }, [id, lang, dispatch]); // لاحظي وجود lang هنا
  // في الـ return، استخدمي الـ status لإظهار حالة التحميل
  // 1. حماية وقت التحميل أو إذا لم تكن البيانات موجودة بعد
  if (status === "loading" || !orphan) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[85vh]">
        <div className="flex items-center gap-2 text-on-surface-variant/70 text-base font-medium">
          <span className="w-2 h-2 rounded-full bg-primary animate-bounce"></span>
          <span className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:0.2s]"></span>
          <span className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:0.4s]"></span>
          <span className="ms-2">
            {t("loading") || (lang === "ar" ? "جاري التحميل..." : "Loading...")}
          </span>
        </div>
      </div>
    );
  }
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      <OrphanHeader
        orphan={orphan}
        onEdit={() => navigate(`/dashboard/orphans/edit/${id}`)}
        onDelete={() => setIsDeleteModalOpen(true)}
        t={t}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <OrphanInfoGrid orphan={orphan} t={t} lang={lang} />
          <OrphanJsonSection orphan={orphan} t={t} lang={lang} />
        </div>
        <div className="space-y-6">
          <FamilyStats orphan={orphan} t={t} />
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
