import axios from "axios";
import { Response, SelfData } from "../types/response";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string,
});

const login = async (username: string, password: string) => {
  const { data } = await api.post("/auth/login", {
    username,
    password,
  }, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    }
  });
  return data;

};

const register = async (email: string, username: string, password: string) => {
  const { data } = await api.post("/auth/register", {
    email,
    username,
    password,
  });
  return data;
};

const self = async () => {
  const { data } = await api.get("/auth/self", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    }
  });
  return data as Response<SelfData>;
};

export default {
  login,
  register,
  self
};