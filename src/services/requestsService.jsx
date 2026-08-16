import { API } from "./api";

export const requestsService = {
  fetchHelpRequests: (page = 1, limit = 10, status = "ACCEPTED") =>
    API.get(
      `/api/admin/help-requests?page=${page}&limit=${limit}${status ? `&status=${status}` : ""}`,
    ),

  fetchHelpRequestById: (id) => API.get(`/api/admin/help-requests/${id}`),

  updateRequestStatus: (id, data) =>
    API.patch(`/api/admin/help-requests/${id}/status`, data),

  createHealthAidRequest: (beneficiaryId, formData) =>
    API.post(
      `/api/admin/beneficiaries/${beneficiaryId}/requests/health`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      },
    ),

  // 2. طلب المساعدة الغذائية
  createFoodAidRequest: (beneficiaryId, formData) =>
    API.post(
      `/api/admin/beneficiaries/${beneficiaryId}/requests/food`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      },
    ),

  // 3. طلب المساعدة التعليمية
  createEducationAidRequest: (beneficiaryId, formData) =>
    API.post(
      `/api/admin/beneficiaries/${beneficiaryId}/requests/education`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      },
    ),

  // 4. طلب مساعدة السكن
  createHousingAidRequest: (beneficiaryId, formData) =>
    API.post(
      `/api/admin/beneficiaries/${beneficiaryId}/requests/housing`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      },
    ),

  // 5. طلب مشاريع صغيرة
  createSmallProjectAidRequest: (beneficiaryId, formData) =>
    API.post(
      `/api/admin/beneficiaries/${beneficiaryId}/requests/small-projects`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      },
    ),
};
