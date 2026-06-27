import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployeeById } from "@/store/index"; // تأكدي من تصديرها من الـ store
import EmployeeProfile from "@/pages/EmployeesDirectory/components/EmployeeProfile";

export default function EmployeeProfilePage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  // نفترض أننا نضع الموظف المختار في حالة خاصة في الـ slice
  const employee = useSelector((state) => state.employees.selectedEmployee);
  const status = useSelector((state) => state.employees.status);

  useEffect(() => {
    dispatch(fetchEmployeeById(id));
    return () => {
      // إذا كان لديك أكشن لتصفير الـ state يفضل استخدامه
      // أو يمكنك إضافة reducer بسيط في الـ slice يقوم بعمل reset
    };
  }, [dispatch, id]);

  if (status === "loading") return <div>جاري التحميل...</div>;
  if (!employee) return <div>لا يوجد بيانات</div>;

  return <EmployeeProfile employee={employee} />;
}
