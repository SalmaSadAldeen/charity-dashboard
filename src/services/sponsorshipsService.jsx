import { API } from "./api";

export const sponsorshipsService = {
  // جلب قائمة طلبات الكفالات مع إمكانية تمرير الـ status اختيارياً
  fetchSponsorships: (status) =>
    API.get(`/api/admin/sponsorships${status ? `?status=${status}` : ""}`),

  // 👈 تأكدي أن الدالة تستقبل الـ id وترسله للرابط
  fetchSponsorshipById: (id) => API.get(`/api/admin/sponsorships/${id}`),

  fetchDonorSponsorshipHistory: (donorId) =>
    API.get(`/api/admin/donors/${donorId}/sponsorships`),

  updateSponsorshipStatus: async (id, formData) => {
    API.patch(`/api/admin/sponsorships/${id}/status`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        accept: "application/json",
        // يتم التقاط التوكن واللغة تلقائياً عبر الـ Interceptors الموجودة في مشروعك
      },
    });
  },
};
