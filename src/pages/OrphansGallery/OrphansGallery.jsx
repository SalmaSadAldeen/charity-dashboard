import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { OrphanCard } from "@/pages/OrphansGallery/components/OrphanCard";
import { useTranslation } from "@/hooks/useTranslation";
import FilterBar from "@/pages/Dashboard/components/FilterBar";
import {
  Plus,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { fetchOrphans } from "@/store/index";

export default function OrphansGallery() {
  const { t, lang } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [supportedFilter, setSupportedFilter] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 8;
  const { items, pagination, status } = useSelector((state) => state.orphans);

  useEffect(() => {
    dispatch(
      fetchOrphans({
        page: currentPage,
        limit: ITEMS_PER_PAGE,
        supported: supportedFilter,
      }),
    );
  }, [dispatch, currentPage, lang, supportedFilter]);

  const handleFilterChange = (val) => {
    setSupportedFilter(val);
    setCurrentPage(1);
  };

  // مصفوفة الفلاتر بشكل احترافي
  const filters = [
    { label: t("all"), value: null, icon: <LayoutGrid size={16} /> },
    { label: t("isSupported"), value: true, icon: <CheckCircle size={16} /> },
    { label: t("notSupported"), value: false, icon: <XCircle size={16} /> },
  ];

  return (
    <main className="p-8  min-h-screen flex flex-col transition-all duration-300">
      {/* العنوان وزر الإضافة */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-[32px] font-extrabold text-gray-900 tracking-tight">
            {t("orphansList")}
          </h2>
          <p className="text-gray-500 mt-1 font-medium">
            {t("orphansDescription")}
          </p>
        </div>

        <button
          onClick={() => navigate("/dashboard/add-orphan")}
          className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-bold hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all active:scale-95"
        >
          <Plus size={20} /> {t("addOrphan")}
        </button>
      </div>

      {/* شريط الفلترة الاحترافي (Segmented Control) */}
      <FilterBar
        filters={filters}
        active={supportedFilter}
        onFilterChange={handleFilterChange}
      />

      {/* منطقة عرض الكاردات مع حل مشكلة الرفّة */}
      {/* منطقة عرض الكاردات */}
      <div className="flex-grow">
        {/* حاوية الـ Grid ثابتة، لا تتغير حتى أثناء التحميل */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 transition-opacity duration-300 ${
            status === "loading"
              ? "opacity-40 pointer-events-none"
              : "opacity-100"
          }`}
        >
          {items.length > 0
            ? items.map((orphan) => (
                <OrphanCard key={orphan.id} orphan={orphan} />
              ))
            : // نضع هذا هنا فقط إذا كانت القائمة فارغة فعلياً
              status !== "loading" && (
                <div className="col-span-full text-center py-20 text-gray-400 bg-white rounded-3xl border border-dashed border-gray-200">
                  {t("noData")}
                </div>
              )}
        </div>
      </div>

      {/* الـ Pagination */}
      {pagination?.lastPage > 1 && (
        <div className="flex justify-center items-center gap-4 mt-10">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="p-3 rounded-xl bg-white border border-gray-200 hover:border-primary disabled:opacity-30 transition-all shadow-sm"
          >
            {lang === "ar" ? (
              <ChevronRight size={20} />
            ) : (
              <ChevronLeft size={20} />
            )}
          </button>

          <span className="font-bold text-sm text-gray-600 bg-white px-6 py-2 rounded-xl border border-gray-200 shadow-sm">
            {currentPage} / {pagination.lastPage}
          </span>

          <button
            disabled={currentPage === pagination.lastPage}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="p-3 rounded-xl bg-white border border-gray-200 hover:border-primary disabled:opacity-30 transition-all shadow-sm"
          >
            {lang === "ar" ? (
              <ChevronLeft size={20} />
            ) : (
              <ChevronRight size={20} />
            )}
          </button>
        </div>
      )}
    </main>
  );
}
