import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string,
});

api.interceptors.request.use((config) => {
  const key = localStorage.getItem("token");
  if (key) config.headers.Authorization = `Bearer ${key}`;
  return config;
});
