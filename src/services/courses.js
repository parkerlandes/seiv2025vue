import apiClient from "./api.js"; // ✅ Correct import

export default {
  getAll(search = "") {
    // If a search term exists, include it as a query parameter
    if (search && search.trim() !== "") {
      return apiClient.get(`/courses?search=${encodeURIComponent(search)}`);
    }
    // Otherwise, return all courses
    return apiClient.get("/courses");
  },

  get(id) {
    return apiClient.get(`/courses/${id}`);
  },

  create(data) {
    return apiClient.post("/courses", data);
  },

  update(id, data) {
    return apiClient.put(`/courses/${id}`, data);
  },

  delete(id) {
    return apiClient.delete(`/courses/${id}`);
  },

  deleteMany(ids) {
    // DELETE request with array of IDs in request body
    return apiClient.delete("/courses/multi", { data: { ids } });
  },

  deleteAll() {
    return apiClient.delete(`/courses`);
  },
};

