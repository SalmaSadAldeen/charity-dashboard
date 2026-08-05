
import { API } from "./api";

export const beneficiaryService = {

  getBeneficiaries: (page = 1, limit, status = "ACCEPTED") =>
    API.get(
      `/api/admin/beneficiaries?status=${status}&page=${page}&limit=${limit}`,
    ),

  fetchBeneficiaryById: (id) => API.get(`/api/admin/beneficiaries/${id}`),

  updateBeneficiaryStatus: (id, { status, rejectionReason }) => {
    const formData = new FormData();
    formData.append("status", status);
    if (status === "REJECTED" && rejectionReason) {
      formData.append("rejectionReason", JSON.stringify(rejectionReason));
    }
    return API.patch(`/api/admin/beneficiaries/${id}/status`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  getHelpRequestStats: () => API.get(`/api/admin/help-requests/stats`),
};
