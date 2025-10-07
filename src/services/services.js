import axios from "axios";

var baseurl = "";
if (import.meta.env.VITE_API_BASE_URL) {
  baseurl = "http://localhost:3019/course-t9";
} else {
  baseurl = "http://project2.eaglesoftwareteam.com/course-t9"
}

const apiClient = axios.create({
  baseURL: baseurl,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
    "Access-Control-Allow-Origin": "*",
    crossDomain: true,
  },
  transformRequest: (data, headers) => {

    return JSON.stringify(data);
  },
  transformResponse: function (data) {
    data = JSON.parse(data);
   
    return data;
  },
});

export default apiClient;