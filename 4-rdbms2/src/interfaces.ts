export type User = {
  id: string;
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;
};

type Permission = "READ" | "WRITE" | "DELETE" | "SHARE" | "UPLOAD_FILES";

export type Group = {
  id: string;
  name: string;
  permissions: Permission[];
};

export type UserGroup = {
  groupId: string;
  userIds: string[];
};
