import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_API_URL + "/public";

const axiosInstance = axios.create({ baseURL });

let hasRedirected = false;

if (!localStorage.getItem("hasRedirected")) {
  hasRedirected = true;
  localStorage.setItem("hasRedirected", true);
  window.location.href = "/Login";
}

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      if (!localStorage.getItem("hasRedirected")) {
        hasRedirected = true;
        localStorage.setItem("hasRedirected", true);
        window.location.href = "/Login";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
