import { api } from "./api";

const getPair = async (n = 10) => {
  const { data } = await api.get("/pair", {
    params: { n }
  });

  return data;
};

const acceptPair = async (id: number) => {
  const { data } = await api.post("/pair/accept", {
    pairedId: id,
  });
  return data;
};

const rejectPair = async (id: number) => {
  const { data } = await api.post("/pair/reject", {
    pairedId: id,
  });
  return data;
};

export default {
  getPair,
  acceptPair,
  rejectPair,
};
