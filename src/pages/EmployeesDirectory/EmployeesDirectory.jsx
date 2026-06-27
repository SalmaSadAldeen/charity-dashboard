import { Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import EmployeeTable from "./components/EmployeeTable";
import EmployeeProfile from "./components/EmployeeProfile";
import StatsCard from "./components/StatsCard";
import ConfirmModal from "./components/ConfirmModal";
import EditUser from "../EditUser/EditUser";
import { fetchEmployees, fetchRoles } from "@/store/index";
import { useEmployeeActions } from "@/hooks/useUserActions";
import { useTranslation } from "@/hooks/useTranslation";

const ITEMS_PER_PAGE = 5;

export default function EmployeesDirectory() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);

  const {
    items: employees = [],
    status,
    pagination,
  } = useSelector((state) => state.employees);
  const { handleDelete } = useEmployeeActions();

  useEffect(() => {
    dispatch(fetchEmployees({ page: currentPage, limit: ITEMS_PER_PAGE }));
    dispatch(fetchRoles());
  }, [dispatch, currentPage]);

  // في // 1. أضيفي هذا الـ state في بداية المكون
  const [employeeToEdit, setEmployeeToEdit] = useState(null);

  // 2. عدلي الدالة بهذا الشكل
  const handleEditClick = (e, emp) => {
    e.stopPropagation();

    // إخفاء البروفايل الجانبي فوراً
    setSelectedEmployee(null);

    // تخزين الموظف في state خاص بالتعديل
    setEmployeeToEdit(emp);

    // فتح المودال
    setIsEditModalOpen(true);
  };
  const confirmDelete = async () => {
    await handleDelete(idToDelete);
    setIsDeleteModalOpen(false);
    if (selectedEmployee?.id === idToDelete) setSelectedEmployee(null);
  };

  return (
    // p-8 و w-full تضمن عدم خروج المحتوى عن الإطار
    <div className="p-8 w-full overflow-hidden">
      <div className="grid grid-cols-12 gap-6 items-start w-full">
        {/* الجدول والإحصائيات */}
        <div
          className={`${selectedEmployee ? "col-span-12 lg:col-span-8" : "col-span-12"} transition-all duration-500`}
        >
          {/* الحاوية هنا أصبحت h-auto لتتمدد حسب عدد الموظفين */}
          <div className="bg-surface-lowest p-6 rounded-3xl shadow-sm border border-border mb-6 flex flex-col h-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-on-surface-variant">
                {t("employeesRecord")}
              </h2>
              <button
                onClick={() => navigate("/dashboard/add-user")}
                className="flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-xl hover:bg-secondary transition-all"
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
                onSelect={(emp) => setSelectedEmployee(emp)}
                selectedEmployee={selectedEmployee}
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
                  <ChevronLeft size={18} />
                </button>
                <button
                  disabled={
                    currentPage >= (pagination?.lastPage || 1) ||
                    status === "loading"
                  }
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  className="p-2 rounded-lg hover:bg-primary-container text-primary disabled:opacity-30"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <StatsCard
              title={t("totalDonors")}
              count="1,284"
              link="/donors"
              bgColor="bg-primary-container"
              textColor="text-on-surface-variant"
            />
            <StatsCard
              title={t("totalBeneficiaries")}
              count="3,450"
              link="/beneficiaries"
              bgColor="bg-primary"
              textColor="text-white"
            />
          </div>
        </div>

        {/* البطاقة الجانبية */}
        <div
          className={`col-span-12 lg:col-span-4 transition-all duration-500 ease-in-out ${
            selectedEmployee
              ? "opacity-100 translate-x-0 w-full"
              : "opacity-0 translate-x-10 w-0 overflow-hidden pointer-events-none"
          }`}
        >
          {/* إزالة الـ sticky والـ h-calc لضمان عدم حدوث تضارب مع السكرول الرئيسي للصفحة */}
          <div className="pr-2">
            <button
              onClick={() => setSelectedEmployee(null)}
              className="mb-4 text-xs font-bold text-primary underline"
            >
              إغلاق التفاصيل
            </button>
            {selectedEmployee && (
              <EmployeeProfile employee={selectedEmployee} />
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
    onClick={() => {
      setIsEditModalOpen(false);
      setEmployeeToEdit(null); // تنظيف عند الإغلاق
    }}
  >
    <div
      className="bg-surface-lowest p-8 rounded-3xl w-full max-w-2xl shadow-xl h-[85vh] flex flex-col overflow-hidden"
      onClick={(e) => e.stopPropagation()}
    >
      <EditUser
        employeeId={employeeToEdit?.id} // استخدام الموظف المخصص للتعديل
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
