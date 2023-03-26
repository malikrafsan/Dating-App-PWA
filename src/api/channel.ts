import axios from "axios";
import { UniversitiesData, UniversityData, Response } from "../types/response";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string,
});

const getUniversities = async () => {
  const { data } = await api.get("/university", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return data as Response<UniversitiesData>;
};

const getUniversity = async (slug: string) => {
  const { data } = await api.get("/university/" + slug, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return data as Response<UniversityData>;
};

const createUniveristy = async (name: string) => {
  const { data } = await api.post("/university", {
    name: name,
  }, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return data as Response<UniversityData>;
};

interface IUpdateUniversityParams {
    name: string;
}
const updateUniversity = async (slug: string, param: IUpdateUniversityParams) => {
  const { data } = await api.put("/university/" + slug, param, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return data as Response<UniversityData>;
};

const updateUniversityLogo = async (slug: string, logo: FormData) => {
  const { data } = await api.put("/university/" + slug + "/logo", logo, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return data as Response<UniversityData>;
};

const deleteUniversity = async (slug: string) => {
  const { data } = await api.delete("/university/" + slug, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return data as Response<UniversityData>;
};

const deleteUniversityLogo = async (slug: string) => {
  const { data } = await api.delete("/university/" + slug + "/logo", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return data as Response<UniversityData>;
};

export {
  getUniversity,
  getUniversities,
  createUniveristy,
  updateUniversity,
  updateUniversityLogo,
  deleteUniversity,
  deleteUniversityLogo,
};