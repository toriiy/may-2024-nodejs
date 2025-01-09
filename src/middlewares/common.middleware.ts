import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";
import { isObjectIdOrHexString } from "mongoose";

import { ApiError } from "../errors/api.error";
import { IUserIncomplete } from "../interfaces/user.interface";
import { userValidator } from "../joi-validators/joi.validator";
import { userRepository } from "../repositories/user.repository";

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

  public isBodyValid(validator: ObjectSchema) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        req.body = await validator.validateAsync(req.body);
        next();
      } catch (e) {
        next(new ApiError(e.details[0].message, 400));
      }
    };
  }

  public isLoginBodyValid(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body as Partial<IUserIncomplete>;
      const { error } = userValidator.schemaLogin.validate(body);
      if (error) {
        throw new ApiError(error.message, 400);
      }
      next();
    } catch (e) {
      next(e);
    }
  }

  public async isEmailUnique(req: Request, res: Response, next: NextFunction) {
    try {
      const email = req.body.email as string;
      const user = await userRepository.getByEmail(email);
      if (user) {
        throw new ApiError("Email is already in use", 409);
      }
      next();
    } catch (e) {
      next(e);
    }
  }

  public isQueryValid(validator: ObjectSchema) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        req.query = await validator.validateAsync(req.query);
        next();
      } catch (e) {
        next(new ApiError(e.details[0].message, 400));
      }
    };
  }
}
export const commonMiddleware = new CommonMiddleware();
