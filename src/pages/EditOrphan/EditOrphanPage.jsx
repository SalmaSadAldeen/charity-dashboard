import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrphanById ,clearOrphanDetails} from "@/store/index";
import EditOrphan from "@/pages/EditOrphan/components/EditOrphan";

export default function EditOrphanPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedDetails: orphan } = useSelector((state) => state.orphans);
useEffect(() => {
  // 1. تحقق: هل الـ ID الموجود في الرابط يختلف عن الـ ID الموجود في الـ Store؟
  // 2. إذا كان مختلفاً، قم بمسح القديم أولاً ثم اطلب الجديد
  if (id && orphan?.id !== parseInt(id)) {
    dispatch(clearOrphanDetails()); // مسح البيانات القديمة فوراً
    dispatch(fetchOrphanById({ id })); // طلب البيانات الجديدة
  }
}, [id]);
  if (!orphan) return <div>Loading...</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white rounded-3xl shadow-sm min-h-[80vh]">
      <EditOrphan
        orphanData={orphan} // مرري الأورفان كما هو بدون معالجة
        onClose={() => navigate(`/dashboard/orphans`)}
      />
    </div>
  );
}
