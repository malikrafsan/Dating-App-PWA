import axios from "axios";
import Auth from "./auth";
import User from "./user";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string,
});

export default api;

export {
  Auth,
  User
};

