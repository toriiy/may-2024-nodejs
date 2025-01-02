import { RoleEnum } from "../enums/role.enum";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  age: number;
  password: string;
  role: RoleEnum;
  phone?: string;
  isDeleted: boolean;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type IUserIncomplete = Pick<
  IUser,
  "name" | "email" | "password" | "age"
>;

export type IForgotPassword = Pick<IUser, "email">;

export type ISetForgotPassword = Pick<IUser, "password">;

export interface IChangePassword {
  oldPassword: string;
  newPassword: string;
}
