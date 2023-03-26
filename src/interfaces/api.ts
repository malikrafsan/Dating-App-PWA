export interface IBaseResponse<T> {
    isError: boolean;
    message: string;
    data: T;
}

export interface IUser {
    id: number;
    email: string;
    username: string;
    password: string;
    salt: string;
    role: string;
}
