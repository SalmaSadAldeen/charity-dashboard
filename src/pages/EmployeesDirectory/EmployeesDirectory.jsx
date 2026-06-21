import { Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import EmployeeTable from "./components/EmployeeTable";
import StatsCard from "./components/StatsCard";
import ConfirmModal from "./components/ConfirmModal";
import EditUser from "../EditUser/EditUser";
import { fetchEmployees, fetchRoles } from "@/store/index";
import { useEmployeeActions } from "@/hooks/useUserActions";

// عدلي هذا الرقم كما ترغبين (10, 5, 20...)
const ITEMS_PER_PAGE = 10;

export default function EmployeesDirectory() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 1. استخراج البيانات من الـ Store (يجب أن يكون في الأعلى)
  const {
    items: employees = [],
    status,
    pagination,
  } = useSelector((state) => state.employees);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);

  const { handleDelete } = useEmployeeActions();

  // جلب البيانات عند التحميل أو عند تغيير الصفحة
  useEffect(() => {
    const page = pagination?.currentPage || 1;
    dispatch(fetchEmployees({ page, limit: ITEMS_PER_PAGE }));
    dispatch(fetchRoles());
  }, [dispatch, pagination?.currentPage]);

  const handleEditClick = (emp) => {
    setSelectedEmployee(emp);
    setIsEditModalOpen(true);
  };

  const confirmDelete = async () => {
    await handleDelete(idToDelete);
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="p-8 bg-[#fbfaf8] min-h-screen">
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#4d4636]">سجل الموظفين</h2>
          <button
            onClick={() => navigate("/dashboard/add-user")}
            className="flex items-center gap-2 bg-[#735c00] text-white px-6 py-2.5 rounded-xl hover:bg-[#5e4b00] transition-all"
          >
            <Plus size={20} /> إضافة موظف
          </button>
        </div>

        {status === "loading" ? (
          <div className="text-center p-10">جاري تحميل البيانات...</div>
        ) : (
          <>
            <EmployeeTable
              data={employees}
              onEdit={handleEditClick}
              onDelete={(id) => {
                setIdToDelete(id);
                setIsDeleteModalOpen(true);
              }}
            />

            <ConfirmModal
              isOpen={isDeleteModalOpen}
              onConfirm={confirmDelete}
              onCancel={() => setIsDeleteModalOpen(false)}
            />

            <div className="flex justify-between items-center mt-6 px-6 py-4 bg-gray-50/50 rounded-2xl border border-gray-100">
              <span className="text-xs font-medium text-gray-500">
                عرض {pagination?.currentPage || 1} من{" "}
                {pagination?.lastPage || 1}
              </span>

              <div className="flex items-center gap-1">
                {/* زر السابق */}
                <button
                  disabled={pagination?.currentPage === 1}
                  onClick={() =>
                    dispatch(
                      fetchEmployees({
                        page: pagination.currentPage - 1,
                        limit: ITEMS_PER_PAGE,
                      }),
                    )
                  }
                  className="p-2 rounded-lg hover:bg-[#fad564]/20 text-[#735c00] disabled:opacity-30 transition-all"
                >
                  <ChevronLeft size={18} />
                </button>

                {/* زر التالي */}
                <button
                  disabled={pagination?.currentPage === pagination?.lastPage}
                  onClick={() =>
                    dispatch(
                      fetchEmployees({
                        page: pagination.currentPage + 1,
                        limit: ITEMS_PER_PAGE,
                      }),
                    )
                  }
                  className="p-2 rounded-lg hover:bg-[#fad564]/20 text-[#735c00] disabled:opacity-30 transition-all"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* باقي التصميم (StatsCard & Modal) كما هو دون تغيير */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <StatsCard
          title="إجمالي المتبرعين"
          count="1,284"
          link="/donors"
          bgColor="bg-[#fad564]"
          textColor="text-[#4d4636]"
          iconBg="bg-[#4d4636]/10"
        />
        <StatsCard
          title="إجمالي المستفيدين"
          count="3,450"
          link="/beneficiaries"
          bgColor="bg-[#735c00]"
          textColor="text-white"
          iconBg="bg-white/10"
        />
      </div>

      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-3xl w-full max-w-2xl shadow-xl max-h-[90vh] overflow-y-auto">
            <EditUser
              employeeId={selectedEmployee?.id}
              onClose={() => setIsEditModalOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
