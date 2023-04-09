import { api } from "./api";
import { UniversitiesData, UniversityData, Response } from "../types/response";

const getUniversities = async () => {
  const { data } = await api.get("/university");
  return data as Response<UniversitiesData>;
};

const getUniversity = async (slug: string) => {
  const { data } = await api.get("/university/" + slug);
  return data as Response<UniversityData>;
};

const createUniversity = async (name: string) => {
  const { data } = await api.post("/university", {
    name: name,
  });

  return data as Response<UniversityData>;
};

interface IUpdateUniversityParams {
    name: string;
}
const updateUniversity = async (slug: string, param: IUpdateUniversityParams) => {
  const { data } = await api.put("/university/" + slug, param);
  return data as Response<UniversityData>;
};

const updateUniversityLogo = async (slug: string, logo: FormData) => {
  const { data } = await api.put("/university/" + slug + "/logo", logo);

  return data as Response<UniversityData>;
};

const deleteUniversity = async (slug: string) => {
  const { data } = await api.delete("/university/" + slug);

  return data as Response<UniversityData>;
};

const deleteUniversityLogo = async (slug: string) => {
  const { data } = await api.delete("/university/" + slug + "/logo");

  return data as Response<UniversityData>;
};

export default {
  getUniversity,
  getUniversities,
  createUniversity,
  updateUniversity,
  updateUniversityLogo,
  deleteUniversity,
  deleteUniversityLogo,
};