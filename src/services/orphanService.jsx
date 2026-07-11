import { API } from "./api";

export const orphanService = {
  // جلب الأيتام مع الـ Pagination
  getOrphans: (page = 1, limit = 10) =>
    API.get(`/orphan?page=${page}&limit=${limit}`),

  // جلب يتيم واحد بالتفصيل
  fetchOrphanById: (id) => API.get(`/orphan/${id}`),

  // إضافة يتيم جديد
  addOrphan: (data) =>
    API.post("/orphan", data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  // حذف يتيم
  deleteOrphan: (id) => API.delete(`/orphan/${id}`),

  // تحديث بيانات يتيم
  updateOrphan: (id, data) =>
    API.patch(`/orphan/${id}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
};
