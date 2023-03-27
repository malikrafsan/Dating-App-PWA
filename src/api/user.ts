import api from ".";
import { ProfileData, Response } from "../types/response";

const getProfile = async (userId: number): Promise<Response<ProfileData>> => {
  const { data } = await api.get("/user/profile", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    params: {
      userId,
    }
  });
  return data;
};

const getSelfProfile = async (): Promise<Response<ProfileData>> => {
  const { data } = await api.get("/user/profile/self", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return data;
};

const updateProfile = async (name?: string, description?: string, dateOfBirth?: Date, latitude?: number, longitude?: number, sex?: "MALE" | "FEMALE", tags?: string[]) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data: { [key: string]: any } = {
    name,
    description,
    dateOfBirth,
    latitude,
    longitude,
    sex,
    tags
  };
  const updatedData = Object.keys(data).reduce((acc, key) => {
    if (data[key] !== undefined) {
      acc[key] = data[key];
    }
    return acc;
  }, {} as typeof data);
  const newData = await api.put("/user/profile", updatedData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return newData;
};

const updateProfilePhoto = async (photos: (File | null | undefined)[]) => {
  const formData = new FormData();
  photos.forEach((photo, idx) => {
    if (photo) {
      formData.append(`photo_${idx}`, photo);
    }
  });

  const newData = await api.put("/user/profile/photo", formData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return newData;
};

const deleteProfilePhoto = async (index: number[]) => {
  const { data } = await api.delete("/user/profile/photo", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: {
      index
    }
  });
  return data;
};


const getTags = async () => {
  const { data } = await api.get("/tag");
  return data;
};


export default {
  getProfile,
  getSelfProfile,
  updateProfile,
  updateProfilePhoto,
  deleteProfilePhoto,
  getTags,
};