import Joi from "joi";

import { regexConstant } from "../constants/regex.constant";
import { OrderEnum } from "../enums/order.enum";
import { UserListOrderEnum } from "../enums/user-list-order.enum";

export class userValidator {
  public static schemaCreate = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required().messages({
      "string.min": "name has to be at least 3 characters",
      "string.max": "name has to be less than 30 characters",
    }),
    email: Joi.string()
      .regex(regexConstant.email)
      .messages({
        "string.pattern.base": "you don't match the pattern test@gmail.com",
      })
      .required(),
    password: Joi.string()
      .regex(regexConstant.password)
      .messages({
        "string.pattern.base":
          " password must contain eight characters including one uppercase letter, " +
          "one lowercase letter, and one number or special character",
      })
      .required(),
    age: Joi.number()
      .min(1)
      .max(120)
      .messages({
        "number.min": "age has to be at least 1",
        "number.max": "age has to be less than 120",
      })
      .required(),
  });

  public static schemaUpdate = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).messages({
      "string.min": "name has to be at least 3 characters",
      "string.max": "name has to be less than 30 characters",
    }),
    age: Joi.number().min(1).max(120).messages({
      "number.min": "age has to be at least 1",
      "number.max": "age has to be less than 120",
    }),
  });

  public static schemaLogin = Joi.object({
    email: Joi.string()
      .regex(regexConstant.email)
      .messages({
        "string.pattern.base": "you don't match the pattern test@gmail.com",
      })
      .required(),
    password: Joi.string()
      .regex(regexConstant.password)
      .messages({
        "string.pattern.base":
          " password must contain eight characters including one uppercase letter, " +
          "one lowercase letter, and one number or special character",
      })
      .required(),
  });

  public static schemaForgotPassword = Joi.object({
    email: Joi.string()
      .regex(regexConstant.email)
      .messages({
        "string.pattern.base": "you don't match the pattern test@gmail.com",
      })
      .required(),
  });

  public static schemaSetForgotPassword = Joi.object({
    password: Joi.string()
      .regex(regexConstant.password)
      .messages({
        "string.pattern.base":
          " password must contain eight characters including one uppercase letter, " +
          "one lowercase letter, and one number or special character",
      })
      .required(),
  });

  public static schemaChangePassword = Joi.object({
    oldPassword: Joi.string()
      .regex(regexConstant.password)
      .messages({
        "string.pattern.base":
          " password must contain eight characters including one uppercase letter, " +
          "one lowercase letter, and one number or special character",
      })
      .required(),
    newPassword: Joi.string()
      .regex(regexConstant.password)
      .messages({
        "string.pattern.base":
          " password must contain eight characters including one uppercase letter, " +
          "one lowercase letter, and one number or special character",
      })
      .required(),
  });

  public static getListQuery = Joi.object({
    limit: Joi.number().min(1).max(100).default(10),
    page: Joi.number().min(1).default(1),
    search: Joi.string().trim(),
    order: Joi.string()
      .valid(...Object.values(OrderEnum))
      .default(OrderEnum.ASC),
    orderBy: Joi.string()
      .valid(...Object.values(UserListOrderEnum))
      .default(UserListOrderEnum.CREATED_AT),
  });
}
