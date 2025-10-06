import axios from "axios";

// Use Vite env variable if present, otherwise fallback to localhost backends
const base = "http://localhost:3019/course-t9";

// configure axios instance
const api = axios.create({
  baseURL: base,
});

// example API call
export const getCourses = () => {
  return api.get('/courses');
};

export default api;
