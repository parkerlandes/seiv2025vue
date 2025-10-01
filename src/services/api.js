import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3002", // backend port
});

export default api;