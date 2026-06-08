import { Routes, Route, Navigate } from "react-router-dom";
// import Dashboard from "../pages/Dashboard/components/Dashboard";
import DashboardLayout from "@/pages/DashboardLayout";
import AddUser from "@/pages/AddUser/AddUser";

export default function AppRoutes() {
  return (
    <Routes>
      {/* تحويل الرابط الرئيسي إلى الداشبورد مباشرة */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* الربط هنا: الـ DashboardLayout هو الأب، والـ Dashboard هو الابن */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route
          index
          element={
            // <Dashboard />
            <AddUser />
          }
        />

        {/* إذا أضفتِ صفحات مستقبلاً، ستكون هنا، مثال: */}
        {/* <Route path="donations" element={<DonationsPage />} /> */}
      </Route>
    </Routes>
  );
}
