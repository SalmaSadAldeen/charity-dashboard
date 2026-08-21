import { Plus, ChevronLeft, ChevronRight, X } from "lucide-react";
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
import { fetchUsersCount } from "@/store/dashboardSlice";

import {
  setEmployee,
  clearEmployee,
  fetchEmployees,
  fetchEmployeeById,
} from "@/store/index";
import { Users, HeartHandshake } from "lucide-react";
import { hasPermission } from "@/utils/permissions";

const ITEMS_PER_PAGE = 4;

export default function EmployeesDirectory() {
  const { t, lang } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { roles } = useSelector((state) => state.auth); // عدلي هذا السطر ليجلب الـ roles
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
  const { usersCount } = useSelector((state) => state.dashboard); // تأكدِ من اسم الـ slice في الـ store
  const hasExistingItems = Array.isArray(employees) && employees.length > 0;
  const [hasLoadedAtLeastOnce, setHasLoadedAtLeastOnce] =
    useState(hasExistingItems);
  const isReallyLoading = useDelayedLoading(status === "loading", 2000);
  const { handleDelete, isLoading } = useGenericDelete("employee");

  const totalPages = pagination?.lastPage || 1;
  const showPagination = totalPages > 1;

  useEffect(() => {
    if (!hasExistingItems) {
      setHasLoadedAtLeastOnce(false);
    }
    dispatch(fetchEmployees({ page: currentPage, limit: ITEMS_PER_PAGE })).then(
      () => {
        setHasLoadedAtLeastOnce(true);
      },
    );
  }, [dispatch, currentPage, lang]);

  useEffect(() => {
    if (selectedItem?.id) {
      dispatch(fetchEmployeeById({ id: selectedItem.id }));
    }
  }, [dispatch, selectedItem?.id, lang]);
  useEffect(() => {
    dispatch(fetchUsersCount());
  }, [dispatch, lang]);
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

  const showSkeleton = isReallyLoading && !hasExistingItems;

  return (
    <div className="p-8 w-full max-w-7xl mx-auto space-y-6 relative">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatsCard
          title={t("totalDonors")}
          count={usersCount?.donors_count ?? "..."}
          icon={HeartHandshake}
          bgColor="bg-primary-container"
          textColor="text-on-surface-variant"
          iconBg="bg-on-surface-variant/10"
        />
        <StatsCard
          title={t("totalBeneficiaries")}
          count={usersCount?.beneficiaries_count ?? "..."}
          icon={Users}
          bgColor="bg-primary"
          textColor="text-white"
          iconBg="bg-white/20"
        />
      </div>

      <div className="w-full">
        <div className="bg-[#ffffff] p-6 rounded-[2rem] shadow-sm border border-[#d0c6b0] min-h-[500px] flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#4d4636]">
                {t("employeesRecord")}
              </h2>

              {hasPermission(roles, "create:employees") && (
                <button
                  onClick={() => navigate("/dashboard/add-user")}
                  className="flex items-center gap-2 bg-[#f5ede0] border border-[#d0c6b0] text-[#735c00] px-6 py-2.5 rounded-xl hover:bg-[#735c00] hover:text-[#ffffff] transition-all shadow-2xs font-bold cursor-pointer"
                >
                  <Plus size={20} /> {t("addEmployee")}
                </button>
              )}
            </div>

            <div className="relative min-h-[300px] flex flex-col">
              <EmployeeTable
                data={employees}
                status={showSkeleton ? "loading" : status}
                selectedItem={selectedItem}
                onSelect={handleSelect}
                onDeleteRequest={(id) => setDeleteId(id)}
                onEdit={handleEditClick}
                lang={lang}
                t={t}
              />
            </div>
          </div>

          {showPagination && (
            <div className="flex justify-between items-center mt-6 px-6 py-4 bg-[#f9f7f4] rounded-2xl border border-[#d0c6b0]">
              <span className="text-xs font-medium text-[#4d4636]">
                {t("showing")} {pagination?.currentPage || 1} {t("from")}{" "}
                {totalPages}
              </span>
              <div className="flex items-center gap-1">
                <button
                  disabled={currentPage === 1 || showSkeleton}
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                  className="p-2 rounded-lg hover:bg-[#f5ede0] text-[#735c00] disabled:opacity-35 transition-colors cursor-pointer"
                >
                  {lang === "ar" ? (
                    <ChevronRight size={18} />
                  ) : (
                    <ChevronLeft size={18} />
                  )}
                </button>
                <button
                  disabled={currentPage >= totalPages || showSkeleton}
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  className="p-2 rounded-lg hover:bg-[#f5ede0] text-[#735c00] disabled:opacity-35 transition-colors cursor-pointer"
                >
                  {lang === "ar" ? (
                    <ChevronLeft size={18} />
                  ) : (
                    <ChevronRight size={18} />
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {selectedItem && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs transition-all">
          <div className="w-full max-w-md bg-[#fdfcfa] h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300 border-s border-[#d0c6b0]/40">
            <div className="sticky top-0 z-20 bg-gradient-to-r from-[#f5ede0] to-[#fdfcfa] px-6 py-4 border-b border-[#d0c6b0]/50 flex justify-between items-center shadow-2xs">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#735c00]"></div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#4d4636]">
                  {lang === "ar" ? "ملف الموظف التعريفي" : "Employee Profile"}
                </span>
              </div>
              <button
                onClick={() => dispatch(clearEmployee())}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#d0c6b0] text-xs font-bold text-[#735c00] hover:bg-[#735c00] hover:text-white transition-all shadow-2xs cursor-pointer"
              >
                <X size={15} />
                <span>{t("closeDetails")}</span>
              </button>
            </div>
            <div className="p-6 overflow-y-auto flex-1">
              <EmployeeProfile />
            </div>
          </div>
        </div>
      )}

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
            className="bg-[#ffffff] p-8 rounded-[2rem] w-full max-w-2xl shadow-xl h-[85vh] flex flex-col overflow-hidden border border-[#d0c6b0]"
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
