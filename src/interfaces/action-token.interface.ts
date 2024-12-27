import { ActionTokenTypeEnum } from "../enums/action-token-type.enum";

export interface IActionToken {
  _id: string;
  _userId: string;
  type: ActionTokenTypeEnum;
  token: string;
  createdAt: Date;
  updatedAt: Date;
}
