import axios from "axios";

// Define the base URL for the backend API
// Use Vite env variable if present, otherwise fallback to localhost backend
const base = "";
if (import.meta.env.API) {
  base = "http://localhost:3019/course-t9"
} else{
  base= "/course-t9"
}


// configure axios instance
const api = axios.create({
  baseURL: base,
});

// example API call
export const getCourses = () => {
  return api.get('/courses');
};

export default api;
