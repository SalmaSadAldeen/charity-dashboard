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
import { useDelayedLoading } from "@/hooks/useDelayedLoading";
import OrphanReportModal from "./components/OrphanReportModal";

export default function OrphanProfilePage() {
  const { t, lang } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { handleDelete, isLoading: isDeleting } = useGenericDelete("orphan");

  const { selectedDetails: orphan, status } = useSelector(
    (state) => state.orphans,
  );
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  const hasExistingOrphan = orphan && String(orphan.id) === String(id);

  const [hasLoadedAtLeastOnce, setHasLoadedAtLeastOnce] =
    useState(hasExistingOrphan);

  const isReallyLoading = useDelayedLoading(status === "loading", 100);

  useEffect(() => {
    if (id) {
      if (!hasExistingOrphan) {
        setHasLoadedAtLeastOnce(false);
      }

      dispatch(fetchOrphanById({ id })).then(() => {
        setHasLoadedAtLeastOnce(true);
      });
    }
  }, [id, lang, dispatch, hasExistingOrphan]);

  const showSkeleton =
    isReallyLoading && (!hasLoadedAtLeastOnce || !hasExistingOrphan);

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* زر إصدار التقرير السنوي */}
      <div className="flex justify-end">
        <button
          onClick={() => setIsReportModalOpen(true)}
          className="bg-green-700 hover:bg-green-800 text-white px-5 py-2.5 rounded-xl font-medium transition shadow-sm flex items-center gap-2"
        >
          {t("annual_report")}
        </button>
      </div>{" "}
      {/* 1. رأس الملف الشخصي */}
      {showSkeleton ? (
        <div className="bg-surface-lowest p-6 rounded-[2rem] border border-border/60 h-40 flex items-center justify-between animate-pulse w-full">
          <div className="flex items-center gap-6 w-1/2">
            <div className="w-24 h-24 rounded-2xl bg-gray-200 shrink-0"></div>
            <div className="space-y-3 w-full">
              <div className="h-6 bg-gray-200 rounded-xl w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded-lg w-1/2"></div>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="w-24 h-10 bg-gray-200 rounded-xl"></div>
            <div className="w-24 h-10 bg-gray-200 rounded-xl"></div>
          </div>
        </div>
      ) : orphan ? (
        <OrphanHeader
          orphan={orphan}
          onEdit={() => navigate(`/dashboard/orphans/edit/${id}`)}
          onDelete={() => setIsDeleteModalOpen(true)}
          t={t}
        />
      ) : null}
      {/* 2. الأقسام السفلية */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {showSkeleton ? (
            <>
              <div className="bg-surface-lowest p-6 rounded-[2rem] border border-border/60 h-80 animate-pulse"></div>
              <div className="bg-surface-lowest p-6 rounded-[2rem] border border-border/60 h-64 animate-pulse"></div>
            </>
          ) : orphan ? (
            <>
              <OrphanInfoGrid orphan={orphan} t={t} lang={lang} />
              <OrphanJsonSection orphan={orphan} t={t} lang={lang} />
            </>
          ) : null}
        </div>

        <div className="space-y-6">
          {showSkeleton ? (
            <div className="bg-surface-lowest p-6 rounded-[2rem] border border-border/60 h-96 animate-pulse"></div>
          ) : orphan ? (
            <FamilyStats orphan={orphan} t={t} />
          ) : null}
        </div>
      </div>
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onConfirm={async () => {
          await handleDelete(id, () => {
            setIsDeleteModalOpen(false);
            navigate("/dashboard/orphans");
          });
        }}
        onCancel={() => setIsDeleteModalOpen(false)}
        isLoading={isDeleting}
      />
      <OrphanReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        orphan={orphan}
        sponsorshipId={orphan?.sponsorshipId} // <-- أضيفي هذا السطر هنا
        t={t}
        lang={lang}
      />
    </div>
  );
}
