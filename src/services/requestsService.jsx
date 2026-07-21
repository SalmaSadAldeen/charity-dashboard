import { API } from "./api";

export const requestsService = {
  fetchHelpRequests: (page = 1, limit = 10, status = "ACCEPTED") =>
    API.get(
      `/api/admin/help-requests?page=${page}&limit=${limit}${status ? `&status=${status}` : ""}`,
    ),

  fetchHelpRequestById: (id) => API.get(`/api/admin/help-requests/${id}`),


  updateRequestStatus: (id, data) => 
    API.patch(`/api/admin/help-requests/${id}/status`, data),

};
