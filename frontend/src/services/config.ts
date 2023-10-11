import axios, { AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "https://back-user-pzgk.onrender.com/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});
export default axiosInstance;