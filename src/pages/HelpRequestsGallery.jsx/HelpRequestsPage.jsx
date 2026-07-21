import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "@/hooks/useTranslation";
import {
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { fetchHelpRequests } from "@/store/index";

import HelpRequestSidePanel from "./components/HelpRequestSidePanel";
import HelpRequestsTable from "./components/HelpRequestsTable";
import FilterBar from "@/pages/Dashboard/components/FilterBar";

export default function HelpRequestsPage() {
  const { t, lang } = useTranslation();
  const dispatch = useDispatch();

  // الحالة للفلترة والـ Pagination
  const [statusFilter, setStatusFilter] = useState(null); // null يعني "الكل"
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedReq, setSelectedReq] = useState(null);

  const ITEMS_PER_PAGE = 5;

  const { items, status, pagination } = useSelector(
    (state) => state.helpRequests,
  );

  // جلب البيانات عند تغير الفلتر أو الصفحة
  useEffect(() => {
    dispatch(
      fetchHelpRequests({
        status: statusFilter || "", // إرسال فارغ للكل
        page: currentPage,
        limit: ITEMS_PER_PAGE,
      }),
    );
  }, [statusFilter, currentPage, lang, dispatch]);

  const filters = [
    { label: t("all"), value: null },
    {
      label: t("ACCEPTED"),
      value: "ACCEPTED",
      icon: <CheckCircle size={16} />,
    },
    { label: t("PENDING"), value: "PENDING", icon: <Clock size={16} /> },

    { label: t("REJECTED"), value: "REJECTED", icon: <XCircle size={16} /> },
    { label: t("cancel"), value: "CANCELLED", icon: <XCircle size={16} /> },
  ];

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500 relative">
      {/* 1. Header */}
      <header className="flex justify-between items-end border-b border-border pb-6">
        <div>
          <h2 className="text-3xl font-black text-on-surface-variant tracking-tight">
            {t("helpRequests")}
          </h2>
          <p className="text-gray-500 font-medium mt-1.5 text-sm">
            {t("manageRequestsDescription")}
          </p>
        </div>
      </header>

      {/* 2. Main Section */}
      <section className="bg-surface-lowest p-6 rounded-3xl shadow-sm border border-border">
        <div className="mb-8">
          <FilterBar
            filters={filters}
            active={statusFilter}
            onFilterChange={(val) => {
              setStatusFilter(val);
              setCurrentPage(1);
              setSelectedReq(null);
            }}
          />
        </div>

        <div
          className={`transition-opacity duration-300 ${
            status === "loading" ? "opacity-30" : "opacity-100"
          }`}
        >
          {items.length > 0 ? (
            <HelpRequestsTable data={items} onRowClick={setSelectedReq} />
          ) : (
            <div className="py-20 text-center text-gray-400 font-bold border-2 border-dashed border-border rounded-[2rem]">
              <AlertCircle size={48} className="mx-auto mb-4 opacity-50" />
              {t("noData")}
            </div>
          )}
        </div>

        {/* Pagination */}
        {pagination?.lastPage > 1 && (
          <footer className="flex justify-between items-center mt-8 pt-6 border-t border-border">
            <span className="text-xs font-bold text-on-surface-variant opacity-60">
              {t("showing")} {currentPage} {t("from")} {pagination.lastPage}
            </span>
            <div className="flex items-center gap-2">
              <button
                disabled={currentPage === 1 || status === "loading"}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="p-2.5 rounded-xl border border-border bg-white text-primary hover:bg-primary hover:text-white transition-all shadow-sm disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-primary"
              >
                {lang === "ar" ? (
                  <ChevronRight size={18} />
                ) : (
                  <ChevronLeft size={18} />
                )}
              </button>
              <button
                disabled={
                  currentPage >= pagination.lastPage || status === "loading"
                }
                onClick={() => setCurrentPage((p) => p + 1)}
                className="p-2.5 rounded-xl border border-border bg-white text-primary hover:bg-primary hover:text-white transition-all shadow-sm disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-primary"
              >
                {lang === "ar" ? (
                  <ChevronLeft size={18} />
                ) : (
                  <ChevronRight size={18} />
                )}
              </button>
            </div>
          </footer>
        )}
      </section>

      {/* 3. Side Panel مع التأكد من إتاحة خيار الإغلاق بالنقر بالخارج */}
      {selectedReq && (
        <HelpRequestSidePanel
          request={selectedReq}
          onClose={() => setSelectedReq(null)}
          t={t}
          lang={lang}
          onStatusUpdated={() => {
            dispatch(
              fetchHelpRequests({
                status: statusFilter || "",
                page: currentPage,
                limit: ITEMS_PER_PAGE,
              }),
            );
          }}
        />
      )}
    </div>
  );
}
