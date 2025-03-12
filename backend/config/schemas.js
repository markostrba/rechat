import Joi from "joi";

export const signupSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(15).required().trim(),
  email: Joi.string().email().required().trim(),
  password: Joi.string().min(8).max(30).required(),
}).unknown(true);

export const signinSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
}).unknown(true);
