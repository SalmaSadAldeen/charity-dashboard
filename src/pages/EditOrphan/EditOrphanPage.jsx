import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrphanById, clearOrphanDetails } from "@/store/index";
import EditOrphan from "@/pages/EditOrphan/components/EditOrphan";

export default function EditOrphanPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedDetails: orphan } = useSelector((state) => state.orphans);
  useEffect(() => {
    if (id && orphan?.id !== parseInt(id)) {
      dispatch(clearOrphanDetails());
      dispatch(fetchOrphanById({ id }));
    }
  }, [id]);
  console.log("Orphan Data received in EditOrphan:", orphan);
  if (!orphan) return <div>Loading...</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white rounded-3xl shadow-sm min-h-[80vh]">
      <EditOrphan
        orphanData={orphan}
        onClose={() => navigate(`/dashboard/orphans`)}
      />
    </div>
  );
}
