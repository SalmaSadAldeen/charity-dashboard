import { Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import EmployeeTable from "./components/EmployeeTable";
import EmployeeProfile from "./components/EmployeeProfile";
import StatsCard from "./components/StatsCard";
import ConfirmModal from "./components/ConfirmModal";
import EditUser from "../EditUser/EditUser";
import { useTranslation } from "@/hooks/useTranslation";
import { useGenericDelete } from "@/hooks/useGenericDelete";
import { useDelayedLoading } from "@/hooks/useDelayedLoading";
import {
  setEmployee,
  clearEmployee,
  fetchEmployees,
  fetchEmployeeById,
} from "@/store/index";
import { Users, HeartHandshake } from "lucide-react";

const ITEMS_PER_PAGE = 5;

export default function EmployeesDirectory() {
  const { t, lang } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [employeeToEdit, setEmployeeToEdit] = useState(null);

  const {
    items: employees = [],
    status,
    pagination,
    selectedItem,
  } = useSelector((state) => state.employees);
  const isReallyLoading = useDelayedLoading(status === "loading", 300);
  const { handleDelete, isLoading } = useGenericDelete("employee");

  useEffect(() => {
    dispatch(fetchEmployees({ page: currentPage, limit: ITEMS_PER_PAGE }));
  }, [dispatch, currentPage, lang]);

  useEffect(() => {
    if (selectedItem?.id) {
      dispatch(fetchEmployeeById({ id: selectedItem.id }));
    }
  }, [dispatch, selectedItem?.id, lang]);

  const handleEditClick = (e, emp) => {
    e.stopPropagation();
    setEmployeeToEdit(emp);
    setIsEditModalOpen(true);
  };

  const confirmDelete = async () => {
    handleDelete(deleteId, () => {
      setDeleteId(null);
      dispatch(fetchEmployees({ page: currentPage, limit: ITEMS_PER_PAGE }));
    });
  };

  const handleSelect = (emp) => {
    dispatch(setEmployee(emp));
  };

  return (
    <div className="p-8 w-full max-w-7xl mx-auto space-y-6">
      {/* القسم الأول: الإحصائيات في الأعلى */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatsCard
          title={t("totalDonors")}
          count="1,284"
          icon={HeartHandshake}
          bgColor="bg-primary-container"
          textColor="text-on-surface-variant"
          iconBg="bg-on-surface-variant/10"
        />
        <StatsCard
          title={t("totalBeneficiaries")}
          count="3,450"
          icon={Users}
          bgColor="bg-primary"
          textColor="text-white"
          iconBg="bg-white/20"
        />
      </div>
      <div className="grid grid-cols-12 gap-6 items-start w-full">
        <div
          className={`${selectedItem ? "col-span-12 lg:col-span-8" : "col-span-12"} transition-all duration-500`}
        >
          <div className="bg-surface-lowest p-6 rounded-3xl shadow-sm border border-border min-h-[500px] flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-on-surface-variant">
                  {t("employeesRecord")}
                </h2>
                <button
                  onClick={() => navigate("/dashboard/add-user")}
                  className="flex items-center gap-2 bg-primary-container text-on-surface-variant px-6 py-2.5 rounded-xl hover:bg-secondary transition-all"
                >
                  <Plus size={20} /> {t("addEmployee")}
                </button>
              </div>

              {/* منطقة الجدول مع الأفرلاي الخاص بالتحميل المؤجل لمنع الرجة */}
              <div className="relative min-h-[300px] flex flex-col">
                {isReallyLoading && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/70 backdrop-blur-[1px] rounded-2xl z-20">
                    <div className="flex items-center gap-2 text-on-surface-variant/80 text-base font-medium">
                      <span className="w-2.5 h-2.5 rounded-full bg-primary animate-bounce"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-primary animate-bounce [animation-delay:0.2s]"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-primary animate-bounce [animation-delay:0.4s]"></span>
                      <span className="ms-2">
                        {lang === "ar" ? "جاري التحميل..." : "Loading..."}
                      </span>
                    </div>
                  </div>
                )}

                <EmployeeTable
                  data={employees}
                  status={status}
                  isReallyLoading={isReallyLoading}
                  selectedItem={selectedItem}
                  onSelect={handleSelect}
                  onDeleteRequest={(id) => setDeleteId(id)}
                  onEdit={handleEditClick}
                  lang={lang}
                  t={t}
                />
              </div>
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
        </div>

        {/* البطاقة الجانبية */}
        <div
          className={`col-span-12 lg:col-span-4 transition-all duration-500 ease-in-out ${selectedItem ? "opacity-100 translate-x-0 w-full" : "opacity-0 w-0 overflow-hidden pointer-events-none"}`}
        >
          <div className="pr-2">
            {selectedItem && (
              <>
                <button
                  onClick={() => dispatch(clearEmployee())}
                  className="mb-4 text-xs font-bold text-primary underline"
                >
                  {t("closeDetails")}
                </button>
                <EmployeeProfile />
              </>
            )}
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={!!deleteId}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteId(null)}
        isLoading={isLoading}
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
                if (selectedItem?.id === employeeToEdit?.id) {
                  dispatch(fetchEmployeeById({ id: employeeToEdit.id }));
                }
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
