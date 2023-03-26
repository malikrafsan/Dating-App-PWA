export type MsgType = {
    id: string;
    msg: string;
    sender: string;
    timestamp: number;
}

export const ROLE = {
  UNAUTHORIZED: "UNAUTHORIZED",
  USER: "USER",
  ADMIN: "ADMIN",
} as const;

export type Permission = typeof ROLE[keyof typeof ROLE];

export type PermissionData = {
    [key: string]: Permission[];
}

