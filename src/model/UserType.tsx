import { RoleAccountType } from "./RoleAccount";

export type UserType = {
  id: string;
  username: string;
  email: string;
  avatarUrl: string;
  role: RoleAccountType;
  status: string;
  refresh_token: string;
  access_token: string;
};
