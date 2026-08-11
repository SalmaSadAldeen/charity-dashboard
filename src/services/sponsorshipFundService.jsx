import { API } from "./api";

export const sponsorshipFundService = {
  // 1. إحصائيات وملخص الصندوق
  fetchSummary: () => API.get("/api/admin/sponsorship-fund/summary"),

  // 2. الأيتام المغطين من الصندوق مع الفلترة والصفحات
  fetchCoverages: (page = 1, limit = 10, status = "") =>
    API.get(
      `/api/admin/sponsorship-fund/coverages?page=${page}&limit=${limit}${status ? `&status=${status}` : ""}`,
    ),

  // 3. سجل العمليات المالية الخارجة من الصندوق
  fetchSupports: (page = 1, limit = 10) =>
    API.get(`/api/admin/sponsorship-fund/supports?page=${page}&limit=${limit}`),
};
