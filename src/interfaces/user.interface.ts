import { OrderEnum } from "../enums/order.enum";
import { RoleEnum } from "../enums/role.enum";
import { UserListOrderEnum } from "../enums/user-list-order.enum";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  age: number;
  password: string;
  avatar?: string;
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

export type IUserListQuery = {
  page: number;
  limit: number;
  search?: string;
  order: OrderEnum;
  orderBy: UserListOrderEnum;
};

export type IUserResponse = Pick<
  IUser,
  | "_id"
  | "name"
  | "email"
  | "age"
  | "role"
  | "avatar"
  | "phone"
  | "isDeleted"
  | "isVerified"
  | "createdAt"
  | "updatedAt"
>;

export type IUserShortResponse = Pick<
  IUser,
  "_id" | "age" | "name" | "avatar" | "createdAt"
>;

export interface IUserListResponse extends IUserListQuery {
  data: IUserShortResponse[];
  total: number;
}
