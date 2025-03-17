import Joi from "joi";

export function validateLogin(req, res, next) {
  const schema = Joi.object({
    email: Joi.string().email().required().trim().lowercase(),
    password: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    console.log(error);
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
}

export function validateSignup(req, res, next) {
  const schema = Joi.object({
    username: Joi.string()
      .min(3)
      .max(30)
      .required()
      .trim()
      .alphanum()
      .message("Can only contain letters (A-Z, a-z) and numbers (0-9)."),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
}

export function validateVerifyEmail(req, res, next) {
  const schema = Joi.object({
    code: Joi.string().min(6).max(6).alphanum().required(),
    email: Joi.string().email().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
}
