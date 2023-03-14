import axios from "axios";

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

export default {
  login,
  register,
};