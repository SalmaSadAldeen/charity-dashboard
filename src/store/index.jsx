import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import layoutReducer from "./layoutSlice";
import languageReducer from "./languageSlice";
import dashboardReducer from "./dashboardSlice";
import { createGenericSlice } from "./genericSlice";
// 1. التعريفات الأساسية (مرة واحدة فقط)
// ... (الاستيرادات)

const employeesSlice = createGenericSlice("employees");
const orphansSlice = createGenericSlice("orphans");
const rolesSlice = createGenericSlice("roles");
const beneficiariesData = createGenericSlice("beneficiaries"); // لا تنسي إضافة المستفيدين
const helpRequestsSlice = createGenericSlice("helpRequests");
const profileSlice = createGenericSlice("profile");
const donorsSlice = createGenericSlice("donors");
const permissionsSlice = createGenericSlice("permissions");
const sponsorshipsSlice = createGenericSlice("sponsorships"); // <--- تعريف slice الكفالات
// <--- 2. تعريف slice المتبرعين
// --- 1. تصدير أctions الموظفين ---
export const {
  setSelectedItem: setEmployee,
  clearSelected: clearEmployee,
  clearSelectedDetails: clearEmployeeDetails, // أضيفيها هنا لتكون متاحة
} = employeesSlice.slice.actions;

export const {
  addItem: addEmployee,
  fetchItems: fetchEmployees,
  deleteItem: deleteEmployee,
  updateItem: updateEmployee,
  fetchItemById: fetchEmployeeById,
} = employeesSlice.actions;

// --- 2. تصدير أctions الأيتام (واضحة ومنظمة) ---
export const {
  setSelectedItem: setOrphan,
  clearSelected: clearOrphan,
  clearSelectedDetails: clearOrphanDetails, // سميناها هكذا لمنع التخبيص!
} = orphansSlice.slice.actions;

export const {
  addItem: addOrphan,
  fetchItems: fetchOrphans,
  deleteItem: deleteOrphan,
  updateItem: updateOrphan,
  fetchItemById: fetchOrphanById,
} = orphansSlice.actions;

// --- 3. تصدير أctions المستفيدين (التعديل هنا) ---
export const {
  setSelectedItem: setBeneficiary,
  clearSelected: clearBeneficiary,
  clearSelectedDetails: clearBeneficiaryDetails, // <--- هذا هو النقص
} = beneficiariesData.slice.actions;

export const {
  fetchItems: fetchBeneficiaries,
  fetchItemById: fetchBeneficiariesById,
  updateItemStatus: updateBeneficiaryStatus,
} = beneficiariesData.actions;

export const {
  setSelectedItem: setHelpRequest,
  clearSelected: clearHelpRequest,
  clearSelectedDetails: clearHelpRequestDetails,
} = helpRequestsSlice.slice.actions;

export const {
  fetchItems: fetchHelpRequests,
  fetchItemById: fetchHelpRequestById,
  updateItemStatus: updateHelpRequestStatus, // <--- نعيد تسميتها هنا أثناء التصدير لتناسب المكون, // <--- أضفها هنا
  // أضيفي delete أو update إذا كنتِ تحتاجينها مستقبلاً
} = helpRequestsSlice.actions;
export const {
  setSelectedItem: setDonor,
  clearSelected: clearDonor,
  clearSelectedDetails: clearDonorDetails,
} = donorsSlice.slice.actions;
export const {
  setSelectedItem: setRole,
  clearSelected: clearRole,
  clearSelectedDetails: clearRoleDetails,
} = rolesSlice.slice.actions;

export const {
  fetchItems: fetchRoles,
  fetchItemById: fetchRoleById,
  addItem: addRole,
  updateItem: updateRole,
  deleteItem: deleteRole,
} = rolesSlice.actions;

export const {
  fetchItems: fetchPermissions, // <--- تصدير جلب الصلاحيات
} = permissionsSlice.actions;

export const { fetchItems: fetchDonors, fetchItemById: fetchDonorHistory } =
  donorsSlice.actions;
export const {
  fetchItems: getProfile, // إعادة تسمية fetchItems إلى getProfile لتناسب طلبك
} = profileSlice.actions;
// --- تصدير actions الكفالات ---
export const {
  setSelectedItem: setSponsorship,
  clearSelected: clearSponsorship,
  clearSelectedDetails: clearSponsorshipDetails,
} = sponsorshipsSlice.slice.actions;

export const {
  fetchItems: fetchSponsorships,
  fetchItemById: fetchSponsorshipById,

  updateItemStatus: updateSponsorshipStatus, // إذا أردتِ قبول أو رفض طلب الكفالة مستقبلاً
} = sponsorshipsSlice.actions;
// ... (تصدير الأدوار وبقية الـ Store) // تأكدي من أنكِ أخذتِ الـ actions من orphansSlice
// export const { setSelectedItem, clearSelected } = employeesSlice.slice.actions;
// 3. إعداد الـ Store
export const store = configureStore({
  reducer: {
    auth: authReducer,
    layout: layoutReducer,
    language: languageReducer,
    dashboard: dashboardReducer,
    employees: employeesSlice.slice.reducer,
    orphans: orphansSlice.slice.reducer,
    beneficiaries: beneficiariesData.slice.reducer,
    roles: rolesSlice.slice.reducer, // هذا هو الاسم الذي يجب أن تستخدميه في الـ useSelector
    helpRequests: helpRequestsSlice.slice.reducer,
    profile: profileSlice.slice.reducer,
    donors: donorsSlice.slice.reducer,
    permissions: permissionsSlice.slice.reducer,
    sponsorships: sponsorshipsSlice.slice.reducer, // <--- أضيفي هذه هنا لعرض الكفالات
    // <--- أضيفي هذه هنا
  },
});
