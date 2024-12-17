import Joi from "joi";

export const schemaCreate = Joi.object().keys({
  name: Joi.string().alphanum().min(3).max(30).required().messages({
    "string.min": "name has to be at least 3 characters",
    "string.max": "name has to be less than 30 characters",
  }),
  email: Joi.string()
    .pattern(new RegExp("@gmail.com$"))
    .messages({
      "string.pattern.base": "you don't match the pattern email@gmail.com",
    })
    .required(),
  password: Joi.string()
    .alphanum()
    .min(8)
    .max(15)
    .messages({
      "string.min": "password has to be at least 8 characters",
      "string.max": "password has to be less than 15 characters",
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

export const schemaUpdate = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required().messages({
    "string.min": "name has to be at least 3 characters",
    "string.max": "name has to be less than 30 characters",
  }),
  age: Joi.number()
    .min(1)
    .max(120)
    .messages({
      "number.min": "age has to be at least 1",
      "number.max": "age has to be less than 120",
    })
    .required(),
});
