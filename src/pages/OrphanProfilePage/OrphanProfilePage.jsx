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

export default function OrphanProfilePage() {
  const { t, lang } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { handleDelete, isLoading: isDeleting } = useGenericDelete("orphan");

  const [hasLoadedAtLeastOnce, setHasLoadedAtLeastOnce] = useState(false);

  const { selectedDetails: orphan, status } = useSelector(
    (state) => state.orphans,
  );

  const isReallyLoading = useDelayedLoading(status === "loading", 500);

  useEffect(() => {
    if (id) {
      setHasLoadedAtLeastOnce(false);
      dispatch(fetchOrphanById({ id })).then(() => {
        setHasLoadedAtLeastOnce(true);
      });
    }
  }, [id, lang, dispatch]);

  const showSkeleton = isReallyLoading || !hasLoadedAtLeastOnce || !orphan;

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* 1. رأس الملف الشخصي (Header أو Skeleton الخاص به) */}
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
      ) : (
        <OrphanHeader
          orphan={orphan}
          onEdit={() => navigate(`/dashboard/orphans/edit/${id}`)}
          onDelete={() => setIsDeleteModalOpen(true)}
          t={t}
        />
      )}

      {/* 2. الأقسام السفلية (تظهر بشكل سكيليتون مستقل أو تعرض البيانات فور جاهزيتها) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {showSkeleton ? (
            <>
              <div className="bg-surface-lowest p-6 rounded-[2rem] border border-border/60 h-80 animate-pulse"></div>
              <div className="bg-surface-lowest p-6 rounded-[2rem] border border-border/60 h-64 animate-pulse"></div>
            </>
          ) : (
            <>
              <OrphanInfoGrid orphan={orphan} t={t} lang={lang} />
              <OrphanJsonSection orphan={orphan} t={t} lang={lang} />
            </>
          )}
        </div>

        <div className="space-y-6">
          {showSkeleton ? (
            <div className="bg-surface-lowest p-6 rounded-[2rem] border border-border/60 h-96 animate-pulse"></div>
          ) : (
            <FamilyStats orphan={orphan} t={t} />
          )}
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
    </div>
  );
}
