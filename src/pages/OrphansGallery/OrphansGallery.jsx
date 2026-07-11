import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { OrphanCard } from "@/pages/OrphansGallery/components/OrphanCard";
import { useTranslation } from "@/hooks/useTranslation";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { fetchOrphans } from "@/store/index";

export default function OrphansGallery() {
  const { t, lang } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);

  // هنا نحدد 4 كاردات في السطر الواحد كما طلبتِ
  // عدد العناصر في الصفحة يجب أن يكون من مضاعفات الـ 4 ليتوازن التصميم
  const ITEMS_PER_PAGE = 8;
  const { items, pagination, status } = useSelector((state) => state.orphans);

  useEffect(() => {
    // الشرط الأفضل: اطلب فقط إذا لم تكن هناك بيانات (أول مرة)
    // أو إذا تغيرت الصفحة (currentPage)
    if (
      status !== "loading" &&
      (items.length === 0 || currentPage !== pagination.currentPage)
    ) {
      dispatch(fetchOrphans({ page: currentPage, limit: ITEMS_PER_PAGE }));
    }
  }, [dispatch, currentPage, pagination.currentPage, items.length, status]); // ملاحظة: لا تضعي items هنا لأنها ستسبب حلقة مفرغة
  return (
    <main className="p-8 bg-surface-container min-h-screen flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-[32px] font-bold">{t("orphansList")}</h2>

        {/* زر مُعدل باحترافية */}
        <button
          onClick={() => navigate("/dashboard/add-orphan")}
          className="flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-md"
        >
          <Plus size={20} /> {t("addOrphan")}
        </button>
      </div>

      <div className="flex-grow">
        {status === "loading" ? (
          <div className="text-center py-20">{t("loading")}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch w-full">
            {" "}
            {items.map((orphan) => (
              <OrphanCard key={orphan.id} orphan={orphan} />
            ))}
          </div>
        )}
      </div>

      {/* الـ Pagination */}
      {pagination.lastPage > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8 py-4">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="p-2 rounded-lg bg-surface border border-border hover:border-primary disabled:opacity-30 transition-all"
          >
            {lang === "ar" ? (
              <ChevronRight size={18} />
            ) : (
              <ChevronLeft size={18} />
            )}
          </button>

          <span className="font-bold text-sm w-16 text-center">
            {currentPage} / {pagination.lastPage}
          </span>

          <button
            disabled={currentPage === pagination.lastPage}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="p-2 rounded-lg bg-surface border border-border hover:border-primary disabled:opacity-30 transition-all"
          >
            {lang === "ar" ? (
              <ChevronLeft size={18} />
            ) : (
              <ChevronRight size={18} />
            )}
          </button>
        </div>
      )}
    </main>
  );
}
