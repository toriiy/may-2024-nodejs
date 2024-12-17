import { NextFunction, Request, Response } from "express";
import { isObjectIdOrHexString } from "mongoose";

import { ApiError } from "../errors/api.error";
import { IUserIncomplete } from "../interfaces/user.interface";
import { schemaCreate, schemaUpdate } from "../joi-validators/joi.validator";

class CommonMiddleware {
  public isIdValid(key: string) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        const id = req.params[key];
        if (!isObjectIdOrHexString(id)) {
          throw new ApiError("Id is invalid", 400);
        }
        next();
      } catch (e) {
        next(e);
      }
    };
  }

  public isBodyValid(key: string) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        if (key === "create") {
          const body = req.body as IUserIncomplete;
          schemaCreate.validate(body);
        }

        if (key === "update") {
          const body = req.body as Partial<IUserIncomplete>;
          if (body.email || body.password) {
            throw new ApiError("You can update only name and age", 400);
          }
          schemaUpdate.validate(body);
        }
        next();
      } catch (e) {
        next(e);
      }
    };
  }
}
export const commonMiddleware = new CommonMiddleware();
