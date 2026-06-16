import { Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import EmployeeTable from "./components/EmployeeTable";
import StatsCard from "./components/StatsCard";
import { fetchEmployees, deleteEmployee } from "@/store/index";
import { useNavigate } from "react-router-dom";
import EditUser from "../EditUser/EditUser";

export default function EmployeesDirectory() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const handleEditClick = (emp) => {
    setSelectedEmployee(emp);
    setIsEditModalOpen(true);
  };
  // 1. استخرجنا pagination من الـ state هنا:
  const {
    items: employees,
    status,
    pagination,
  } = useSelector((state) => state.employees);
  // useEffect(() => {
  //   dispatch(fetchEmployees());
  // }, [dispatch]);

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
              onDelete={(id) => dispatch(deleteEmployee(id))}
            />
            {/* شريط الترقيم (الآن سيعمل لأننا عرفنا pagination في الـ useSelector) */}
            <div className="flex justify-between items-center mt-6 px-6 py-4 bg-gray-50/50 rounded-2xl border border-gray-100">
              <span className="text-xs font-medium text-gray-500">
                عرض {pagination.currentPage} من {pagination.lastPage}
              </span>

              <div className="flex items-center gap-1">
                <button
                  disabled={pagination.currentPage === 1}
                  onClick={() =>
                    dispatch(fetchEmployees(pagination.currentPage + 1))
                  }
                  className="p-2 rounded-lg hover:bg-[#fad564]/20 text-[#735c00] disabled:opacity-30 transition-all"
                >
                  <ChevronLeft size={18} />
                </button>

                <button
                  disabled={pagination.currentPage === pagination.lastPage}
                  onClick={() =>
                    dispatch(fetchEmployees(pagination.currentPage - 1))
                  } // السابق
                  className="p-2 rounded-lg hover:bg-[#fad564]/20 text-[#735c00] disabled:opacity-30 transition-all"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>{" "}
          </>
        )}
      </div>

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
            {/* استدعاء مكون التعديل */}
            <EditUser
              employeeId={selectedEmployee?.id}
              onClose={() => setIsEditModalOpen(false)}
            />
          </div>
          onClick={() => setIsEditModalOpen(false)}
        </div>
      )}
    </div>
  );
}
