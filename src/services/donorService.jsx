
import { API } from "./api";

export const donorService = {
  getDonors: (page = 1, limit, isSponsor = "") =>
    API.get(
      `/api/admin/donors?isSponsor=${isSponsor}&page=${page}&limit=${limit}`,
    ),

  fetchDonorHistory: (id) => API.get(`/api/admin/donors/${id}/history`),
};
