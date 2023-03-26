export type Response<T> = {
  data: T;
  isError: boolean;
  message: string;
}

export type LoginData = {
  token: string
}

export type SelfData = {
  account: {
    email: string;
    username: string;
    role: string;
  }
}