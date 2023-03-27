import api from ".";

const getProfile = async () => {
  const { data } = await api.get("/user/profile", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return data;
};

const updateProfile = async (data: any) => {
  const newData = await api.put("/user/profile", data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return newData;
};

const updateProfilePhoto = async (data: any) => {
  console.log(data);
  const newData = await api.put("/user/profile/photo", data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return newData;
};

const getTags = async () => {
  const { data } = await api.get("/tag");
  return data;
};


export default {
  getProfile,
  updateProfile,
  updateProfilePhoto,
  getTags,
};