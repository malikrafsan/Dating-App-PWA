import axios, { AxiosError } from "axios";
import { toastManager } from "../context-providers/ToastProvider";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string,
});

api.interceptors.request.use((config) => {
  const key = localStorage.getItem("token");
  if (key) config.headers.Authorization = `Bearer ${key}`;
  return config;
});

api.interceptors.response.use((success) => {
  return success;
}, (error: AxiosError) => {
  console.error(error);
  // const msg = (error.response?.data as { message?: string; })?.message || error.message;

  // toastManager.showToast({
  //   title: error.name,
  //   status: "error",
  //   description: `Got error: "${msg}" 
  //     with code: ${error.code || "unknown"} 
  //     when requesting ${((error.config?.baseURL || "")
  //       + error.config?.url)}`,
  // });
  return Promise.reject(error);
});