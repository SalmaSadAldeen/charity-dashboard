import { API } from "./api";

export const sponsorshipsService = {

  fetchSponsorships: (status) =>
    API.get(`/api/admin/sponsorships${status ? `?status=${status}` : ""}`),


  fetchSponsorshipById: (id) => API.get(`/api/admin/sponsorships/${id}`),

  fetchDonorSponsorshipHistory: (donorId) =>
    API.get(`/api/admin/donors/${donorId}/sponsorships`),

  updateSponsorshipStatus: async (id, formData) => {
    API.patch(`/api/admin/sponsorships/${id}/status`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        accept: "application/json",

      },
    });
  },
};
