import { RoleEnum } from "../enums/role.enum";

export interface IToken {
  _id: string;
  _userId: string;
  accessToken: string;
  refreshToken: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITokenPayload {
  userId: string;
  role: RoleEnum;
}
export type ITokenPair = Pick<IToken, "accessToken" | "refreshToken">;

export interface ITokenPairWithUserId extends ITokenPair {
  _userId: string;
}
