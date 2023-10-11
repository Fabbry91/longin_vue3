import axios, { AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.URL || "http://localhost:3000/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});
export default axiosInstance;