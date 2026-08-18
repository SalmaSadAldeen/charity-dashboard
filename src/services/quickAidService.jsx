import { API } from "./api";

export const quickAidService = {
  // جلب ملخص الصندوق
  getSummary: () => API.get("/api/admin/quick-aid-fund/summary"),

  // جلب قائمة عمليات الصرف (مع دعم الـ Pagination)
  getDisbursements: (page , limit ) =>
    API.get(`/api/admin/quick-aid-fund/list?page=${page}&limit=${limit}`),

  // إنشاء عملية صرف جديدة
  createDisbursement: (data) =>
    API.post("/api/admin/quick-aid-fund/disbursements", data),
};
