import { API } from "./api";
export const orphanService = {
  getOrphans: (page = 1, limit = 10, supported = null, priority = null) =>
    API.get(
      `/orphan?page=${page}&limit=${limit}${supported !== null ? `&supported=${supported}` : ""}${priority !== null && priority !== "" ? `&priority=${priority}` : ""}`,
    ),

  fetchOrphanById: (id) => API.get(`/orphan/${id}`),

  addOrphan: (data) =>
    API.post("/orphan", data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  deleteOrphan: (id) => API.delete(`/orphan/${id}`),

  updateOrphan: (id, data) =>
    API.patch(`/orphan/${id}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
};
