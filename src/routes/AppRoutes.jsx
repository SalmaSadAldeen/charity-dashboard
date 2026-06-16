import { Routes, Route, Navigate } from "react-router-dom";
// import Dashboard from "../pages/Dashboard/components/Dashboard";
import DashboardLayout from "@/pages/DashboardLayout";
// import AddUser from "@/pages/AddUser/AddUser";
// import AddOrphan from "@/pages/AddOrphan/AddOrphan";
import EmployeesDirectory from "@/pages/EmployeesDirectory/EmployeesDirectory";
import AddUser from "@/pages/AddUser/AddUser"; // استيراد صفحتك
import Dashboard from "@/pages/Dashboard/Dashboard";
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      <Route path="/dashboard" element={<DashboardLayout />}>
        {/* هذا هو المسار الرئيسي للداشبورد (الصفحة التي تحتوي الإحصائيات) */}
        {/* <Route index element={<Dashboard />} /> */}
        {/* 
        {/* هذا مسار صفحة إضافة مستخدم */}
        {/* <Route path="add-user" element={<AddUser />} />

        {/* مسار الموظفين (مثلاً) */}
        <Route path="employees" element={<EmployeesDirectory />} />
      </Route>
    </Routes>
  );
}
