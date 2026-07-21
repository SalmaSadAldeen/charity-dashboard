// services/beneficiaryService.js
import { API } from "./api";

export const beneficiaryService = {
  // الفلترة هنا هي الجزء الأهم
  getBeneficiaries: (page = 1, limit = 10, status = "ACCEPTED") =>
    API.get(
      `/api/admin/beneficiaries?status=${status}&page=${page}&limit=${limit}`,
    ),

  fetchBeneficiaryById: (id) => API.get(`/api/admin/beneficiaries/${id}`),

  getHelpRequestStats: () => API.get(`/api/admin/help-requests/stats`),
};
