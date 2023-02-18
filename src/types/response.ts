export type Response<T> = {
  data: T;
  isError: boolean;
  message: string;
}

export type LoginData = {
  token: string
}