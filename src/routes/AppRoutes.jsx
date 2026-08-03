import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "@/pages/DashboardLayout";
import Dashboard from "@/pages/Dashboard/Dashboard";
import EmployeesDirectory from "@/pages/EmployeesDirectory/EmployeesDirectory";
import AddUser from "@/pages/AddUser/AddUser";
import LoginPage from "@/pages/Login/LoginPage";
import { PrivateRoute } from "@/routes/PrivateRoute";
import EmployeeProfile from "@/pages/EmployeesDirectory/components/EmployeeProfile"; // استيراد الصفحة الوسيطة
import AddOrphan from "@/pages/AddOrphan/AddOrphan";
import OrphansGallery from "@/pages/OrphansGallery/OrphansGallery";
import OrphanProfilePage from "@/pages/OrphanProfilePage/OrphanProfilePage";
import EditOrphanPage from "@/pages/EditOrphan/EditOrphanPage";
import BeneficiariesPage from "@/pages/BeneficiaryGallery/BeneficiariesPages";
import BeneficiaryDetails from "@/pages/BeneficiaryDetails/BeneficiaryDetails";
import HelpRequestsPage from "@/pages/HelpRequestsGallery.jsx/HelpRequestsPage";
import HelpRequestDetailsPage from "@/pages/AidDetails/HelpRequestDetailsPage";
import { ProfilePage } from "@/pages/ProfilePage/ProfilePage";
import DonorsPage from "@/pages/DonorsGallery/DonorsPage";
import RolesPage from "@/pages/RolesGallery/RolesPage";
import RoleDetailsPage from "@/pages/RoleDetailsPage/RoleDetailsPage";
import SponsorshipsPage from "@/pages/Sponsorships/SponsorshipsPage";
import SponsorshipDetailsPage from "@/pages/SponsorshipDetails/SponsorshipDetailsPage";
export default function AppRoutes() {
  return (
    <Routes>
      {/* 1. مسار تسجيل الدخول (خارج الداشبورد) */}
      <Route path="/login" element={<LoginPage />} />
      {/* 2. المسار الرئيسي (إعادة توجيه للداشبورد أو اللوج إن) */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      {/* 3. مسارات الداشبورد المحمية */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
      >
        <Route path="orphans/edit/:id" element={<EditOrphanPage />} />
        <Route path="add-orphan" element={<AddOrphan />} />
        <Route path="orphans" element={<OrphansGallery />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="donors" element={<DonorsPage />} />
        <Route index element={<Dashboard />} />
        <Route path="employees" element={<EmployeesDirectory />} />
        <Route path="beneficiaries" element={<BeneficiariesPage />} />
        <Route path="sponsorships" element={<SponsorshipsPage />} />
        <Route path="add-user" element={<AddUser />} />
        <Route path="requests" element={<HelpRequestsPage />} />
        <Route path="help-requests/:id" element={<HelpRequestDetailsPage />} />
        <Route path="orphan/details/:id" element={<OrphanProfilePage />} />
        <Route path="employee-profile/:id" element={<EmployeeProfile />} />
        <Route path="beneficiaries/:id" element={<BeneficiaryDetails />} />
        <Route path="roles" element={<RolesPage />} />
        <Route path="roles/:id" element={<RoleDetailsPage />} />
        // إذا كان مكتوباً هكذا:
        <Route
          path="sponsorships/:sponsorshipId"
          element={<SponsorshipDetailsPage />}
        />
        {/* <Route path="donors/:id" element={<DonorHistoryModal />} /> */}
      </Route>
      {/* 4. معالجة أي مسار غير معروف */}
      {/* <Route path="*" element={<Navigate to="/login" replace />} /> */}

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
