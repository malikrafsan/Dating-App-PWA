import {api} from "./api";

const upsertToken = (token: string) => {
  return api.put("/chat/token", { token });
};

const getMatchList = () => {
  return api.get("/chat");
};

const getMessages = (userId: string) => {
  return api.get(`/chat/${userId}/message`);
};

const sendMessage = (to: number, message: string) => {
  return api.post("/chat/message", { to, message });
};


export default {
  upsertToken,
  getMatchList,
  getMessages,
  sendMessage,
};
