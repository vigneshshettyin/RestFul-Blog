const Joi = require("joi");

// Register Validation

const registerValidation = (data) => {
  const schema = Joi.object({
    userName: Joi.string().min(3).max(20).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(20).required(),
    phone: Joi.string().min(10).max(20).required(),
  });

  return schema.validate(data);
};

// Login Validation

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(20).required(),
  });

  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
