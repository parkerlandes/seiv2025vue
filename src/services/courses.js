import apiClient from "./services.js";

// Course service methods
export default {
  getAll() {
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
  deleteAll() {
    return apiClient.delete(`/courses`);
  },
};