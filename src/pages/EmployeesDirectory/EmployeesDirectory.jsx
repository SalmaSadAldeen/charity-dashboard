import { Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import EmployeeTable from "./components/EmployeeTable";
import EmployeeProfile from "./components/EmployeeProfile";
import StatsCard from "./components/StatsCard";
import ConfirmModal from "./components/ConfirmModal";
import EditUser from "../EditUser/EditUser";
import { fetchEmployees } from "@/store/index";
import { useUserActions } from "@/hooks/useUserActions";
import { useTranslation } from "@/hooks/useTranslation";
import { setSelectedItem, clearSelected } from "@/store/index";
import { Users, HeartHandshake } from "lucide-react";
const ITEMS_PER_PAGE = 5;

export default function EmployeesDirectory() {
  const { t, lang } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [idToDelete] = useState(null);
  const [employeeToEdit, setEmployeeToEdit] = useState(null);

  // استخدام selectedItem الموحد من الـ Store
  const {
    items: employees = [],
    status,
    pagination,
    selectedItem,
  } = useSelector((state) => state.employees);

  const { handleDelete } = useUserActions();

  useEffect(() => {
    dispatch(fetchEmployees({ page: currentPage, limit: ITEMS_PER_PAGE }));
    // dispatch(fetchRoles());
  }, [dispatch, currentPage]);

  const handleEditClick = (e, emp) => {
    e.stopPropagation();
    dispatch(clearSelected()); // إغلاق البروفايل الجانبي فوراً عبر الـ Store
    // إغلاق البروفايل عند فتح مودال التعديل
    setEmployeeToEdit(emp);
    setIsEditModalOpen(true);
  };

  const confirmDelete = async () => {
    await handleDelete(idToDelete);
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="p-8 w-full overflow-hidden">
      <div className="grid grid-cols-12 gap-6 items-start w-full">
        {/* الجدول والإحصائيات */}
        <div
          className={`${selectedItem ? "col-span-12 lg:col-span-8" : "col-span-12"} transition-all duration-500`}
        >
          <div className="bg-surface-lowest p-6 rounded-3xl shadow-sm border border-border mb-6 flex flex-col h-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-on-surface-variant">
                {t("employeesRecord")}
              </h2>
              <button
                onClick={() => navigate("/dashboard/add-user")}
                className="flex items-center gap-2 bg-primary-container  opacity-150 text-on-surface-variant px-6 py-2.5 rounded-xl hover:bg-secondary transition-all"
              >
                <Plus size={20} /> {t("addEmployee")}
              </button>
            </div>

            <div
              className={`transition-opacity duration-300 ${status === "loading" ? "opacity-30" : "opacity-100"}`}
            >
              <EmployeeTable
                data={employees}
                onEdit={handleEditClick}
                // هنا نمرر المتغير الصحيح للعرض
                selectedEmployee={selectedItem}
                onSelect={(emp) => dispatch(setSelectedItem(emp))}
                // استخدام الموحد// نمرر الـ selectedItem من الـ Store
              />
            </div>

            <div className="flex justify-between items-center mt-6 px-6 py-4 bg-surface rounded-2xl border border-border">
              <span className="text-xs font-medium text-on-surface-variant">
                {t("showing")} {pagination?.currentPage || 1} {t("from")}{" "}
                {pagination?.lastPage || 1}
              </span>
              <div className="flex items-center gap-1">
                <button
                  disabled={currentPage === 1 || status === "loading"}
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                  className="p-2 rounded-lg hover:bg-primary-container text-primary disabled:opacity-30"
                >
                  {/* في حالة العربي، الـ ChevronLeft يجب أن يصبح أيقونة يمين */}
                  {lang === "ar" ? (
                    <ChevronRight size={18} />
                  ) : (
                    <ChevronLeft size={18} />
                  )}
                </button>

                <button
                  disabled={
                    currentPage >= (pagination?.lastPage || 1) ||
                    status === "loading"
                  }
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  className="p-2 rounded-lg hover:bg-primary-container text-primary disabled:opacity-30"
                >
                  {lang === "ar" ? (
                    <ChevronLeft size={18} />
                  ) : (
                    <ChevronRight size={18} />
                  )}
                </button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <StatsCard
              title={t("totalDonors")}
              count="1,284"
              icon={HeartHandshake}
              bgColor="bg-primary-container"
              textColor="text-on-surface-variant"
            />
            <StatsCard
              title={t("totalBeneficiaries")}
              count="3,450"
              icon={Users}
              bgColor="bg-primary"
              textColor="text-white"
            />
          </div>
        </div>

        {/* البطاقة الجانبية - تم تحديثها لاستخدام selectedItem */}
        <div
          className={`col-span-12 lg:col-span-4 transition-all duration-500 ease-in-out ${
            selectedItem
              ? "opacity-100 translate-x-0 w-full"
              : "opacity-0 translate-x-10 w-0 overflow-hidden pointer-events-none"
          }`}
        >
          <div className="pr-2">
            {/* ملاحظة: بما أننا نعتمد على الـ Store الآن، يفضل أن يكون لديك Action لإلغاء التحديد */}
            {selectedItem && (
              <>
                <button
                  // التعديل الصحيح
                  onClick={() => dispatch(clearSelected())}
                  className="mb-4 text-xs font-bold text-primary underline"
                >
                  {t("closeDetails")}
                </button>
                <EmployeeProfile employee={selectedItem} />
              </>
            )}
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onConfirm={confirmDelete}
        onCancel={() => setIsDeleteModalOpen(false)}
      />

      {isEditModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
          onClick={() => setIsEditModalOpen(false)}
        >
          <div
            className="bg-surface-lowest p-8 rounded-3xl w-full max-w-2xl shadow-xl h-[85vh] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <EditUser
              employeeId={employeeToEdit?.id}
              onClose={() => {
                setIsEditModalOpen(false);
                setEmployeeToEdit(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
