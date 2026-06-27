import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "@/pages/DashboardLayout";
import Dashboard from "@/pages/Dashboard/Dashboard";
import EmployeesDirectory from "@/pages/EmployeesDirectory/EmployeesDirectory";
import AddUser from "@/pages/AddUser/AddUser";
import LoginPage from "@/pages/Login/LoginPage";
import { PrivateRoute } from "@/routes/PrivateRoute";
import EmployeeProfilePage from "@/pages/EmployeesDirectory/EmployeeProfilePage"; // استيراد الصفحة الوسيطة
export default function AppRoutes() {
  return (
    <Routes>
      {/* 1. مسار تسجيل الدخول (خارج الداشبورد) */}
      <Route path="/login" element={<LoginPage />} />
      {/* 2. المسار الرئيسي (إعادة توجيه للداشبورد أو اللوج إن) */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* 3. مسارات الداشبورد المحمية */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="employees" element={<EmployeesDirectory />} />
        <Route path="add-user" element={<AddUser />} />
        <Route
          path="employee-profile/:id"
          element={<EmployeeProfilePage />}
        />{" "}
      </Route>
      {/* 4. معالجة أي مسار غير معروف */}
      {/* <Route path="*" element={<Navigate to="/login" replace />} /> */}

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
