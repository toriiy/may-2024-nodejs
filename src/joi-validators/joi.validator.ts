import Joi from "joi";

import { regexConstant } from "../constants/regex.constant";

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
}
