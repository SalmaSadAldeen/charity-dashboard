import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import layoutReducer from "./layoutSlice";
import languageReducer from "./languageSlice";
import dashboardReducer from "./dashboardSlice";
import { createGenericSlice } from "./genericSlice";
import notificationsReducer from "./notificationsSlice"; 
import quickAidReducer from "./quickAidSlice"; 
const employeesSlice = createGenericSlice("employees");
const orphansSlice = createGenericSlice("orphans");
const rolesSlice = createGenericSlice("roles");
const beneficiariesData = createGenericSlice("beneficiaries");
const helpRequestsSlice = createGenericSlice("helpRequests");
const profileSlice = createGenericSlice("profile");
const donorsSlice = createGenericSlice("donors");
const permissionsSlice = createGenericSlice("permissions");
const sponsorshipsSlice = createGenericSlice("sponsorships");
const sponsorshipFundCoveragesSlice = createGenericSlice(
  "sponsorshipFundCoverages",
);
const sponsorshipFundSupportsSlice = createGenericSlice(
  "sponsorshipFundSupports",
);
export const {
  setSelectedItem: setEmployee,
  clearSelected: clearEmployee,
  clearSelectedDetails: clearEmployeeDetails,
} = employeesSlice.slice.actions;

export const {
  addItem: addEmployee,
  fetchItems: fetchEmployees,
  deleteItem: deleteEmployee,
  updateItem: updateEmployee,
  fetchItemById: fetchEmployeeById,
} = employeesSlice.actions;

export const {
  setSelectedItem: setOrphan,
  clearSelected: clearOrphan,
  clearSelectedDetails: clearOrphanDetails,
} = orphansSlice.slice.actions;

export const {
  addItem: addOrphan,
  fetchItems: fetchOrphans,
  deleteItem: deleteOrphan,
  updateItem: updateOrphan,
  fetchItemById: fetchOrphanById,
} = orphansSlice.actions;

export const {
  setSelectedItem: setBeneficiary,
  clearSelected: clearBeneficiary,
  clearSelectedDetails: clearBeneficiaryDetails,
} = beneficiariesData.slice.actions;

export const {
  addItem: addBeneficiary,
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
  addItem: addHelpRequest,
  fetchItems: fetchHelpRequests,
  fetchItemById: fetchHelpRequestById,
  updateItemStatus: updateHelpRequestStatus,
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

export const { fetchItems: fetchSponsorshipFundSupports } =
  sponsorshipFundSupportsSlice.actions;
export const { fetchItems: fetchSponsorshipFundCoverages } =
  sponsorshipFundCoveragesSlice.actions;

export const { fetchItems: fetchPermissions } = permissionsSlice.actions;

export const { fetchItems: fetchDonors, fetchItemById: fetchDonorHistory } =
  donorsSlice.actions;
export const { fetchItems: getProfile } = profileSlice.actions;
export const { updateItem: updateProfile } = profileSlice.actions;

export const {
  setSelectedItem: setSponsorship,
  clearSelected: clearSponsorship,
  clearSelectedDetails: clearSponsorshipDetails,
} = sponsorshipsSlice.slice.actions;

export const {
  fetchItems: fetchSponsorships,
  fetchItemById: fetchSponsorshipById,
  updateItemStatus: updateSponsorshipStatus,
  sendAnnualReport: sendAnnualReportAction,
} = sponsorshipsSlice.actions;

export const store = configureStore({
  reducer: {
    auth: authReducer,
    layout: layoutReducer,
    language: languageReducer,
    dashboard: dashboardReducer,
    employees: employeesSlice.slice.reducer,
    orphans: orphansSlice.slice.reducer,
    beneficiaries: beneficiariesData.slice.reducer,
    roles: rolesSlice.slice.reducer,
    helpRequests: helpRequestsSlice.slice.reducer,
    profile: profileSlice.slice.reducer,
    donors: donorsSlice.slice.reducer,
    permissions: permissionsSlice.slice.reducer,
    sponsorships: sponsorshipsSlice.slice.reducer,
    sponsorshipFundCoverages: sponsorshipFundCoveragesSlice.slice.reducer,
    sponsorshipFundSupports: sponsorshipFundSupportsSlice.slice.reducer,
    notifications: notificationsReducer,
    quickAid: quickAidReducer, // إضافة الصندوق العاجل هنا
  },
});
