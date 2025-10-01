import axios from "axios";

// configure axios instance
const api = axios.create({
  baseURL: "http://localhost:3002", // backend port
});

// example API call
export const getCourses = () => {
    return api.get('/courses');
  };

export default api;