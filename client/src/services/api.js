import axios from "axios";
import {VITE_API_URL} from "../services/constant"
const API = axios.create({
  baseURL: VITE_API_URL
});
console.log(VITE_API_URL)
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;