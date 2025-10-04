import axios from "axios";

// Use Vite env variable if present, otherwise fallback to localhost backend
const base = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/course-t9";

// configure axios instance
const api = axios.create({
  baseURL: base,
});

// example API call
export const getCourses = () => {
  return api.get('/courses');
};

export default api;
