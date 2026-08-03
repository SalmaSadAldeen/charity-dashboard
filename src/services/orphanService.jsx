import { API } from "./api";

export const orphanService = {
  // في orphanService.js
  getOrphans: (page = 1, limit = 10, supported = null) =>
    API.get(
      `/orphan?page=${page}&limit=${limit}${supported !== null ? `&supported=${supported}` : ""}`,
    ),
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
