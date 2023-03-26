import { IBaseResponse, IUser } from "../interfaces";
import axios from "axios";


const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string,
});

export interface IUserWithKey extends IUser {
    key: string;
}

export type IGetUsersChatResp = IBaseResponse<{
    users: IUserWithKey[];
}>

export const getUsersChat = async () => {
  const { data } = await api.get("/chat/users", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return data as IGetUsersChatResp;
};


