import {api} from "./api";

const getUniversities = async () => {
  const { data } = await api.get("/university");
  return data;
};

const getUniversityBySlug = async (slug: string) => {
  const { data } = await api.get(`/university/slug/${slug}`);
  return data;
};

export default {
  getUniversities,
  getUniversityBySlug
};