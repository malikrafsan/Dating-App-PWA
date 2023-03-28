import { Response, SelfData } from "../types/response";
import { api } from "./api";


const login = async (username: string, password: string) => {
  const { data } = await api.post("/auth/login", {
    username,
    password,
  });
  return data;

};

const register = async (email: string, username: string, password: string, univ_slug: string) => {
  const { data } = await api.post("/auth/register", {
    email,
    username,
    password,
    univ_slug
  });
  return data;
};

const self = async () => {
  const { data } = await api.get("/auth/self");
  return data as Response<SelfData>;
};

export default {
  login,
  register,
  self
};