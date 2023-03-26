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
