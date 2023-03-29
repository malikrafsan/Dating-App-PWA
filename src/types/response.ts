import type { Permission } from "./struct";

export type Response<T> = {
  data: T;
  isError: boolean;
  message: string;
}

export type LoginData = {
  token: string
}

export type UniversityType = {
  slug: string;
  name: string;
  logoFileId: string;
  channelId: number;
}

export type UniversitiesData = {
  universities: UniversityType[];
}

export type UniversityData = {
  university: UniversityType;
}

export type SelfData = {
  account: {
    email: string;
    username: string;
    role: Permission;
  }
}

export type ProfileData = {
  user: {
    id: number;
    name: string;
    description: string;
    dateOfBirth: string;
    latitude: number;
    longitude: number;
    sex: string;
    profileUrl: string; //FIXME: Apus ini klo di backend udah diapus
    account: {
      email: string;
      username: string;
    }
    userPhoto: {
      id: string;
      fileId: string;
      userId: number;
      index: number
    }[]
    userTag: {
      id: number;
      userId: number;
      tagId: number;
      tag: {
        id: number;
        tag: string;
      }
    }[];
    universitySlug: string;
    university: {
      name: string;
    }
  }
}
