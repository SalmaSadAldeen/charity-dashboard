// // import { useEffect, useState } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { useNavigate } from "react-router-dom";
// // import { OrphanCard } from "@/pages/OrphansGallery/components/OrphanCard";
// // import { useTranslation } from "@/hooks/useTranslation";
// // import FilterBar from "@/pages/Dashboard/components/FilterBar";
// // import { useDelayedLoading } from "@/hooks/useDelayedLoading";
// // import {
// //   Plus,
// //   ChevronLeft,
// //   ChevronRight,
// //   LayoutGrid,
// //   CheckCircle,
// //   XCircle,
// // } from "lucide-react";
// // import { fetchOrphans } from "@/store/index";

// // export default function OrphansGallery() {
// //   const { t, lang } = useTranslation();
// //   const navigate = useNavigate();
// //   const dispatch = useDispatch();

// //   const [supportedFilter, setSupportedFilter] = useState(null);
// //   const [currentPage, setCurrentPage] = useState(1);

// //   const ITEMS_PER_PAGE = 8; // تم تعديلها لتقسيمها على 3 أعمدة (صفين × 3 كاردات)
// //   const { items, pagination, status } = useSelector((state) => state.orphans);
// //   const isReallyLoading = useDelayedLoading(status === "loading", 400);
// //   // 1. طلب البيانات عند تحميل الواجهة أول مرة أو عند تغيير اللغة فقط
// //   useEffect(() => {
// //     dispatch(
// //       fetchOrphans({
// //         page: currentPage,
// //         limit: ITEMS_PER_PAGE,
// //         supported: supportedFilter,
// //       }),
// //     );
// //   }, [dispatch, lang]);

// //   // 2. عند تغيير الفلتر: dispatch مباشر لـ Redux ليدخل في حالة loading فوراً دون رمشة
// //   const handleFilterChange = (val) => {
// //     setSupportedFilter(val);
// //     setCurrentPage(1);
// //     dispatch(
// //       fetchOrphans({
// //         page: 1,
// //         limit: ITEMS_PER_PAGE,
// //         supported: val,
// //       }),
// //     );
// //   };

// //   // 3. عند تغيير الصفحة: dispatch مباشر لضمان بقاء الـ Overlay متزامناً مع الضغطة
// //   const handlePageChange = (newPage) => {
// //     setCurrentPage(newPage);
// //     dispatch(
// //       fetchOrphans({
// //         page: newPage,
// //         limit: ITEMS_PER_PAGE,
// //         supported: supportedFilter,
// //       }),
// //     );
// //   };

// //   // مصفوفة الفلاتر
// //   const filters = [
// //     { label: t("all"), value: null, icon: <LayoutGrid size={16} /> },
// //     { label: t("isSupported"), value: true, icon: <CheckCircle size={16} /> },
// //     { label: t("notSupported"), value: false, icon: <XCircle size={16} /> },
// //   ];

// //   return (
// //     <main className="p-8 min-h-screen flex flex-col transition-all duration-300">
// //       {/* العنوان وزر الإضافة */}
// //       <div className="flex justify-between items-end mb-8">
// //         <div>
// //           <h2 className="text-[32px] font-extrabold text-gray-900 tracking-tight">
// //             {t("orphansList")}
// //           </h2>
// //           <p className="text-gray-500 mt-1 font-medium">
// //             {t("orphansDescription")}
// //           </p>
// //         </div>

// //         <button
// //           onClick={() => navigate("/dashboard/add-orphan")}
// //           className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-bold hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all active:scale-95"
// //         >
// //           <Plus size={20} /> {t("addOrphan")}
// //         </button>
// //       </div>

// //       {/* شريط الفلترة */}
// //       <div className="mb-8">
// //         <FilterBar
// //           filters={filters}
// //           active={supportedFilter}
// //           onFilterChange={handleFilterChange}
// //         />
// //       </div>

// //       {/* منطقة عرض الكاردات مع الـ Overlay المباشر والارتفاع المضبوط */}
// //       <div className="relative min-h-[300px] flex flex-col">
// //         {/* استبدلنا status === "loading" بـ isReallyLoading */}
// //         {isReallyLoading && (
// //           <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/70 backdrop-blur-[1px] rounded-3xl z-10">
// //             <div className="flex items-center gap-2 text-on-surface-variant/70 text-base font-medium">
// //               <span className="w-2.5 h-2.5 rounded-full bg-primary animate-bounce"></span>
// //               <span className="w-2.5 h-2.5 rounded-full bg-primary animate-bounce [animation-delay:0.2s]"></span>
// //               <span className="w-2.5 h-2.5 rounded-full bg-primary animate-bounce [animation-delay:0.4s]"></span>
// //               <span className="ms-2">
// //                 {lang === "ar" ? "جاري التحميل..." : "Loading..."}
// //               </span>
// //             </div>
// //           </div>
// //         )}

// //         {/* حاوية الـ Grid (تم التعديل لتكون 3 أعمدة: lg:grid-cols-3) */}
// //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
// //           {items && items.length > 0 ? (
// //             items.map((orphan) => (
// //               <OrphanCard key={orphan.id} orphan={orphan} />
// //             ))
// //           ) : status !== "loading" ? (
// //             <div className="col-span-full flex items-center justify-center text-center py-20 text-gray-400 bg-white rounded-3xl border border-dashed border-gray-200">
// //               {t("noData") ||
// //                 (lang === "ar" ? "لا توجد بيانات متاحة" : "No data available")}
// //             </div>
// //           ) : null}
// //         </div>
// //       </div>

// //       {/* الـ Pagination */}
// //       {pagination?.lastPage > 1 && (
// //         <div className="flex justify-center items-center gap-4 mt-10">
// //           <button
// //             disabled={currentPage === 1 || status === "loading"}
// //             onClick={() => handlePageChange(currentPage - 1)}
// //             className="p-3 rounded-xl bg-white border border-gray-200 hover:border-primary disabled:opacity-30 transition-all shadow-sm"
// //           >
// //             {lang === "ar" ? (
// //               <ChevronRight size={20} />
// //             ) : (
// //               <ChevronLeft size={20} />
// //             )}
// //           </button>

// //           <span className="font-bold text-sm text-gray-600 bg-white px-6 py-2 rounded-xl border border-gray-200 shadow-sm">
// //             {currentPage} / {pagination.lastPage}
// //           </span>

// //           <button
// //             disabled={
// //               currentPage === pagination.lastPage || status === "loading"
// //             }
// //             onClick={() => handlePageChange(currentPage + 1)}
// //             className="p-3 rounded-xl bg-white border border-gray-200 hover:border-primary disabled:opacity-30 transition-all shadow-sm"
// //           >
// //             {lang === "ar" ? (
// //               <ChevronLeft size={20} />
// //             ) : (
// //               <ChevronRight size={20} />
// //             )}
// //           </button>
// //         </div>
// //       )}
// //     </main>
// //   );
// // }

// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import { OrphanCard } from "@/pages/OrphansGallery/components/OrphanCard";
// import { useTranslation } from "@/hooks/useTranslation";
// import FilterBar from "@/pages/Dashboard/components/FilterBar";
// import { useDelayedLoading } from "@/hooks/useDelayedLoading";
// import {
//   Plus,
//   ChevronLeft,
//   ChevronRight,
//   LayoutGrid,
//   CheckCircle,
//   XCircle,
// } from "lucide-react";
// import { fetchOrphans, updateSponsorshipStatus } from "@/store/index";

// export default function OrphansGallery() {
//   const { t, lang } = useTranslation();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [searchParams] = useSearchParams();

//   // التحقق من وضع اختيار يتيم لكفالة عبر الـ URL
//   const selectMode = searchParams.get("mode") === "select";
//   const targetSponsorshipId = searchParams.get("sponsorshipId");

//   const [supportedFilter, setSupportedFilter] = useState(
//     selectMode ? false : null,
//   );
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedOrphanId, setSelectedOrphanId] = useState(null);

//   const ITEMS_PER_PAGE = 8;
//   const { items, pagination, status } = useSelector((state) => state.orphans);
//   const isReallyLoading = useDelayedLoading(status === "loading", 400);

//   // 1. طلب البيانات عند تحميل الواجهة أول مرة أو عند تغيير الفلتر أو الصفحة أو اللغة أو وضع الاختيار
//   useEffect(() => {
//     dispatch(
//       fetchOrphans({
//         page: currentPage,
//         limit: ITEMS_PER_PAGE,
//         supported: selectMode ? false : supportedFilter,
//       }),
//     );
//   }, [dispatch, lang, supportedFilter, currentPage, selectMode]);

//   // 2. عند تغيير الفلتر
//   const handleFilterChange = (val) => {
//     if (selectMode) return;
//     setSupportedFilter(val);
//     setCurrentPage(1);
//     dispatch(
//       fetchOrphans({
//         page: 1,
//         limit: ITEMS_PER_PAGE,
//         supported: val,
//       }),
//     );
//   };

//   // 3. عند تغيير الصفحة
//   const handlePageChange = (newPage) => {
//     setCurrentPage(newPage);
//     dispatch(
//       fetchOrphans({
//         page: newPage,
//         limit: ITEMS_PER_PAGE,
//         supported: selectMode ? false : supportedFilter,
//       }),
//     );
//   };

//   // دالة تأكيد اختيار اليتيم وربطه بالكفالة ثم العودة لواجهة الكفالات
//   const handleConfirmSelection = async () => {
//     if (!selectedOrphanId || !targetSponsorshipId) return;
//     try {
//       await dispatch(
//         updateSponsorshipStatus({
//           id: Number(targetSponsorshipId),
//           data: { status: "ACCEPTED", orphanId: Number(selectedOrphanId) },
//         }),
//       ).unwrap();

//       navigate(-1);
//     } catch (error) {
//       console.error("خطأ أثناء ربط الكفالة باليتيم:", error);
//     }
//   };

//   const filters = [
//     { label: t("all"), value: null, icon: <LayoutGrid size={16} /> },
//     { label: t("isSupported"), value: true, icon: <CheckCircle size={16} /> },
//     { label: t("notSupported"), value: false, icon: <XCircle size={16} /> },
//   ];

//   return (
//     <main className="p-8 min-h-screen flex flex-col transition-all duration-300 pb-24">
//       {/* شريط التنبيه وزر التأكيد إذا كنا بوضع اختيار الكفالة */}
//       {selectMode && (
//         <div className="mb-6 p-4 bg-primary/10 border border-primary/20 rounded-2xl flex items-center justify-between text-primary font-bold shadow-sm">
//           <span>
//             {lang === "ar"
//               ? "يرجى تحديد اليتيم المطلوب من القائمة أدناه ثم اضغط تأكيد الاختيار."
//               : "Please select an orphan below and click confirm to complete sponsorship."}
//           </span>
//           <div className="flex items-center gap-3">
//             <button
//               onClick={() => navigate(-1)}
//               className="text-xs bg-white px-4 py-2 rounded-xl shadow-xs border border-primary/25 hover:bg-gray-50 text-gray-700 transition-all"
//             >
//               {lang === "ar" ? "إلغاء" : "Cancel"}
//             </button>
//             <button
//               disabled={!selectedOrphanId || status === "loading"}
//               onClick={handleConfirmSelection}
//               className="text-xs bg-primary text-white px-5 py-2 rounded-xl shadow-md hover:bg-primary/90 disabled:opacity-50 transition-all font-bold"
//             >
//               {lang === "ar" ? "تأكيد الاختيار" : "Confirm Selection"}
//             </button>
//           </div>
//         </div>
//       )}

//       {/* العنوان وزر الإضافة */}
//       <div className="flex justify-between items-end mb-8">
//         <div>
//           <h2 className="text-[32px] font-extrabold text-gray-900 tracking-tight">
//             {t("orphansList")}
//           </h2>
//           <p className="text-gray-500 mt-1 font-medium">
//             {t("orphansDescription")}
//           </p>
//         </div>

//         {!selectMode && (
//           <button
//             onClick={() => navigate("/dashboard/add-orphan")}
//             className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-bold hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all active:scale-95"
//           >
//             <Plus size={20} /> {t("addOrphan")}
//           </button>
//         )}
//       </div>

//       {/* شريط الفلترة */}
//       <div
//         className={`mb-8 ${selectMode ? "opacity-60 pointer-events-none" : ""}`}
//       >
//         <FilterBar
//           filters={filters}
//           active={supportedFilter}
//           onFilterChange={handleFilterChange}
//         />
//       </div>

//       {/* منطقة عرض الكاردات */}
//       <div className="relative min-h-[300px] flex flex-col">
//         {isReallyLoading && (
//           <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/70 backdrop-blur-[1px] rounded-3xl z-10">
//             <div className="flex items-center gap-2 text-on-surface-variant/70 text-base font-medium">
//               <span className="w-2.5 h-2.5 rounded-full bg-primary animate-bounce"></span>
//               <span className="w-2.5 h-2.5 rounded-full bg-primary animate-bounce [animation-delay:0.2s]"></span>
//               <span className="w-2.5 h-2.5 rounded-full bg-primary animate-bounce [animation-delay:0.4s]"></span>
//               <span className="ms-2">
//                 {lang === "ar" ? "جاري التحميل..." : "Loading..."}
//               </span>
//             </div>
//           </div>
//         )}

//         {/* حاوية الـ Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//           {items && items.length > 0 ? (
//             items.map((orphan) => {
//               const isSelected = selectedOrphanId === orphan.id;
//               return (
//                 <div
//                   key={orphan.id}
//                   onClick={() => {
//                     // تم تعديل المسار هنا ليطابق تعريف الراوتر لديك: orphan/details/:id
//                     navigate(`/dashboard/orphan/details/${orphan.id}`);
//                   }}
//                   className={`relative cursor-pointer transition-all rounded-3xl hover:shadow-lg ${
//                     selectMode && isSelected
//                       ? "ring-2 ring-primary bg-primary/[0.02]"
//                       : ""
//                   }`}
//                 >
//                   {selectMode && (
//                     <div
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         setSelectedOrphanId(orphan.id);
//                       }}
//                       className="absolute top-3 right-3 z-25 w-7 h-7 rounded-full bg-white border-2 border-primary flex items-center justify-center shadow-md hover:scale-110 transition-transform"
//                       title={
//                         lang === "ar" ? "اختر هذا اليتيم" : "Select this orphan"
//                       }
//                     >
//                       {isSelected && (
//                         <div className="w-3 h-3 rounded-full bg-primary" />
//                       )}
//                     </div>
//                   )}

//                   <OrphanCard orphan={orphan} />
//                 </div>
//               );
//             })
//           ) : status !== "loading" ? (
//             <div className="col-span-full flex items-center justify-center text-center py-20 text-gray-400 bg-white rounded-3xl border border-dashed border-gray-200">
//               {t("noData") ||
//                 (lang === "ar" ? "لا توجد بيانات متاحة" : "No data available")}
//             </div>
//           ) : null}
//         </div>
//       </div>

//       {/* الـ Pagination */}
//       {pagination?.lastPage > 1 && (
//         <div className="flex justify-center items-center gap-4 mt-10">
//           <button
//             disabled={currentPage === 1 || status === "loading"}
//             onClick={() => handlePageChange(currentPage - 1)}
//             className="p-3 rounded-xl bg-white border border-gray-200 hover:border-primary disabled:opacity-30 transition-all shadow-sm"
//           >
//             {lang === "ar" ? (
//               <ChevronRight size={20} />
//             ) : (
//               <ChevronLeft size={20} />
//             )}
//           </button>

//           <span className="font-bold text-sm text-gray-600 bg-white px-6 py-2 rounded-xl border border-gray-200 shadow-sm">
//             {currentPage} / {pagination.lastPage}
//           </span>

//           <button
//             disabled={
//               currentPage === pagination.lastPage || status === "loading"
//             }
//             onClick={() => handlePageChange(currentPage + 1)}
//             className="p-3 rounded-xl bg-white border border-gray-200 hover:border-primary disabled:opacity-30 transition-all shadow-sm"
//           >
//             {lang === "ar" ? (
//               <ChevronLeft size={20} />
//             ) : (
//               <ChevronRight size={20} />
//             )}
//           </button>
//         </div>
//       )}
//     </main>
//   );
// }

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { OrphanCard } from "@/pages/OrphansGallery/components/OrphanCard";
import { useTranslation } from "@/hooks/useTranslation";
import FilterBar from "@/pages/Dashboard/components/FilterBar";
import { useDelayedLoading } from "@/hooks/useDelayedLoading";
import {
  Plus,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  Check,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { fetchOrphans, updateSponsorshipStatus } from "@/store/index";

export default function OrphansGallery() {
  const { t, lang } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  // التحقق من وضع اختيار يتيم لكفالة عبر الـ URL
  const selectMode = searchParams.get("mode") === "select";
  const targetSponsorshipId = searchParams.get("sponsorshipId");

  const [supportedFilter, setSupportedFilter] = useState(
    selectMode ? false : null,
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrphanId, setSelectedOrphanId] = useState(null);

  const ITEMS_PER_PAGE = 8;
  const { items, pagination, status } = useSelector((state) => state.orphans);
  const isReallyLoading = useDelayedLoading(status === "loading", 400);

  // 1. طلب البيانات عند تحميل الواجهة أول مرة أو عند تغيير الفلتر أو الصفحة أو اللغة أو وضع الاختيار
  useEffect(() => {
    dispatch(
      fetchOrphans({
        page: currentPage,
        limit: ITEMS_PER_PAGE,
        supported: selectMode ? false : supportedFilter,
      }),
    );
  }, [dispatch, lang, supportedFilter, currentPage, selectMode]);

  // 2. عند تغيير الفلتر
  const handleFilterChange = (val) => {
    if (selectMode) return;
    setSupportedFilter(val);
    setCurrentPage(1);
    dispatch(
      fetchOrphans({
        page: 1,
        limit: ITEMS_PER_PAGE,
        supported: val,
      }),
    );
  };

  // 3. عند تغيير الصفحة
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    dispatch(
      fetchOrphans({
        page: newPage,
        limit: ITEMS_PER_PAGE,
        supported: selectMode ? false : supportedFilter,
      }),
    );
  };

  // دالة تأكيد اختيار اليتيم وربطه بالكفالة ثم العودة لواجهة الكفالات
  const handleConfirmSelection = async () => {
    if (!selectedOrphanId || !targetSponsorshipId) return;
    try {
      await dispatch(
        updateSponsorshipStatus({
          id: Number(targetSponsorshipId),
          data: { status: "ACCEPTED", orphanId: Number(selectedOrphanId) },
        }),
      ).unwrap();

      // العودة لواجهة الكفالات مباشرة
      navigate("/dashboard/sponsorships");
    } catch (error) {
      console.error("خطأ أثناء ربط الكفالة باليتيم:", error);
    }
  };

  const filters = [
    { label: t("all"), value: null, icon: <LayoutGrid size={16} /> },
    { label: t("isSupported"), value: true, icon: <CheckCircle size={16} /> },
    { label: t("notSupported"), value: false, icon: <XCircle size={16} /> },
  ];

  return (
    <main className="p-8 min-h-screen flex flex-col transition-all duration-300 pb-24">
      {/* شريط التنبيه وزر التأكيد إذا كنا بوضع اختيار الكفالة */}
      {selectMode && (
        <div className="mb-6 p-4 bg-primary/10 border border-primary/20 rounded-2xl flex items-center justify-between text-primary font-bold shadow-sm">
          <span>
            {lang === "ar"
              ? "يرجى تحديد اليتيم المطلوب من القائمة أدناه ثم اضغط تأكيد الاختيار."
              : "Please select an orphan below and click confirm to complete sponsorship."}
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="text-xs bg-white px-4 py-2 rounded-xl shadow-xs border border-primary/25 hover:bg-gray-50 text-gray-700 transition-all"
            >
              {lang === "ar" ? "إلغاء" : "Cancel"}
            </button>
            <button
              disabled={!selectedOrphanId || status === "loading"}
              onClick={handleConfirmSelection}
              className="text-xs bg-primary text-white px-5 py-2 rounded-xl shadow-md hover:bg-primary/90 disabled:opacity-50 transition-all font-bold"
            >
              {lang === "ar" ? "تأكيد الاختيار" : "Confirm Selection"}
            </button>
          </div>
        </div>
      )}

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

        {!selectMode && (
          <button
            onClick={() => navigate("/dashboard/add-orphan")}
            className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-bold hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all active:scale-95"
          >
            <Plus size={20} /> {t("addOrphan")}
          </button>
        )}
      </div>

      {/* شريط الفلترة */}
      <div
        className={`mb-8 ${selectMode ? "opacity-60 pointer-events-none" : ""}`}
      >
        <FilterBar
          filters={filters}
          active={supportedFilter}
          onFilterChange={handleFilterChange}
        />
      </div>

      {/* منطقة عرض الكاردات */}
      <div className="relative min-h-[300px] flex flex-col">
        {isReallyLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/70 backdrop-blur-[1px] rounded-3xl z-10">
            <div className="flex items-center gap-2 text-on-surface-variant/70 text-base font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-primary animate-bounce"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-primary animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-primary animate-bounce [animation-delay:0.4s]"></span>
              <span className="ms-2">
                {lang === "ar" ? "جاري التحميل..." : "Loading..."}
              </span>
            </div>
          </div>
        )}

        {/* حاوية الـ Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items && items.length > 0 ? (
            items.map((orphan) => {
              const isSelected = selectedOrphanId === orphan.id;
              return (
                <div
                  key={orphan.id}
                  onClick={() => {
                    if (selectMode) {
                      setSelectedOrphanId(orphan.id);
                    } else {
                      navigate(`/dashboard/orphan/details/${orphan.id}`);
                    }
                  }}
                  className={`relative cursor-pointer transition-all rounded-[2rem] ${
                    selectMode && isSelected ? "bg-primary/[0.03]" : ""
                  }`}
                >
                  {selectMode && (
                    <div
                      className={`absolute top-4 right-4 z-25 w-7 h-7 rounded-full border-2 flex items-center justify-center shadow-md transition-transform ${
                        isSelected
                          ? "border-primary bg-primary scale-110 text-white"
                          : "border-gray-300 bg-white hover:scale-110 text-transparent"
                      }`}
                      title={
                        lang === "ar" ? "اختر هذا اليتيم" : "Select this orphan"
                      }
                    >
                      <Check size={16} strokeWidth={3} />
                    </div>
                  )}

                  <OrphanCard
                    orphan={orphan}
                    isSelected={selectMode && isSelected}
                  />
                </div>
              );
            })
          ) : status !== "loading" ? (
            <div className="col-span-full flex items-center justify-center text-center py-20 text-gray-400 bg-white rounded-3xl border border-dashed border-gray-200">
              {t("noData") ||
                (lang === "ar" ? "لا توجد بيانات متاحة" : "No data available")}
            </div>
          ) : null}
        </div>
      </div>

      {/* الـ Pagination */}
      {pagination?.lastPage > 1 && (
        <div className="flex justify-center items-center gap-4 mt-10">
          <button
            disabled={currentPage === 1 || status === "loading"}
            onClick={() => handlePageChange(currentPage - 1)}
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
            disabled={
              currentPage === pagination.lastPage || status === "loading"
            }
            onClick={() => handlePageChange(currentPage + 1)}
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
